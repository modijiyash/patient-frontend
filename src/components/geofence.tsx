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

interface Coordinates {
  lat: number;
  lng: number;
}

export default function GeofenceCheck() {
  const [geofence, setGeofence] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<Status>("not-set");
  const [lastNotified, setLastNotified] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10001";

  // ✅ Fetch existing geofence on mount
  useEffect(() => {
    if (!token) return;

    fetch(`https://patient-backend-olyv.onrender.com/api/geofence/get`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.geofence) {
          setGeofence(data.geofence);
          setStatus("set");
          setDistance(0);
        }
      })
      .catch(() => {});
  }, []);

  const setupGeofence = () => {
    if (!navigator.geolocation) {
      toast({ title: "❌ Location not available" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newGeofence = { lat: latitude, lng: longitude };

        setGeofence(newGeofence);
        setStatus("set");
        setDistance(0);
        toast({ title: "✅ Geofencing has been set up!" });

        try {
          await fetch(`https://patient-backend-olyv.onrender.com/api/geofence/set`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newGeofence),
          });
        } catch {
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
      const dist = getDistanceFromLatLonInM(
        latitude,
        longitude,
        geofence.lat,
        geofence.lng
      );
      setDistance(dist);

      if (dist > 200) {
        setStatus("outside");

        const now = Date.now();
        if (!lastNotified || now - lastNotified > 10 * 60 * 1000) {
          sendAlertToBackend();
          setLastNotified(now);
        }
      } else {
        setStatus("set");
      }

      // Always update current location in backend
      fetch(`https://patient-backend-olyv.onrender.com/api/geofence/update-location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
      }).catch(() => {});
    });

    return () => navigator.geolocation.clearWatch(watcher);
  }, [geofence, lastNotified]);

  const sendAlertToBackend = async () => {
    try {
      await fetch(`https://patient-backend-olyv.onrender.com/api/alerts/send-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast({ title: "📨 Alert sent to relatives" });
    } catch {
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
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={setupGeofence}
          size="lg"
          variant={status === "set" ? "default" : "destructive"}
        >
          {status === "set" ? "✅ Geofencing Set" : "🚨 Setup Geofencing"}
        </Button>
        {distance !== null && (
          <div className="text-sm font-medium text-gray-700">
            Distance from safe zone center:{" "}
            <span
              className={`font-bold ${
                status === "outside" ? "text-red-600" : "text-green-600"
              }`}
            >
              {distance.toFixed(1)} meters
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getDistanceFromLatLonInM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000; // meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
