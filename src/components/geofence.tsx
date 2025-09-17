import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type Status = "not-set" | "set" | "outside";

interface GeofenceCheckProps {
  userId: string;
}

export default function GeofenceCheck({ userId }: GeofenceCheckProps) {
  const [geofence, setGeofence] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [status, setStatus] = useState<Status>("not-set");
  const [lastNotified, setLastNotified] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const patientId = userId; 
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  
  const setupGeofence = () => {
    if (!navigator.geolocation) {
      toast({ title: "❌ Location not available" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setGeofence({ lat: latitude, lng: longitude });
        setStatus("set");
        toast({ title: "✅ Geofencing has been set up!" });

        try {
          await fetch(`${API_URL}/api/geofence/set`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              patientId,
              lat: latitude,
              lng: longitude,
              radius: 200,
            }),
          });
        } catch (err) {
          toast({ title: "⚠ Failed to save geofence in backend" });
        }
      },
      () => toast({ title: "⚠ Please allow location access" })
    );
  };

  useEffect(() => {
    if (!geofence) return;

    const watcher = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      const distance = getDistanceFromLatLonInM(
        latitude,
        longitude,
        geofence.lat,
        geofence.lng
      );

      if (distance > 200) {
        setStatus("outside");

        const now = Date.now();
        if (!lastNotified || now - lastNotified > 10 * 60 * 1000) {
          sendAlertToBackend();
          setLastNotified(now);
        }
      } else {
        setStatus("set");
      }
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, [geofence, lastNotified]);

  const sendAlertToBackend = async () => {
    try {
      await fetch(`${API_URL}/api/alerts/send-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId,
          message: "⚠ Patient is OUTSIDE safe zone! Please check immediately.",
        }),
      });
      toast({ title: "📨 Alert sent to relatives" });
    } catch (err) {
      toast({ title: "❌ Failed to send alert" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Geofence Monitoring</CardTitle>
        <CardDescription>
          {status === "not-set"
            ? "No geofence set yet"
            : status === "set"
            ? "✅ Safe zone set"
            : "⚠ Patient is outside safe zone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={setupGeofence}
          size="lg"
          variant={status === "set" ? "default" : "destructive"}
        >
          {status === "set" ? "✅ Geofencing Set" : "🚨 Setup Geofencing"}
        </Button>
      </CardContent>
    </Card>
  );
}

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
