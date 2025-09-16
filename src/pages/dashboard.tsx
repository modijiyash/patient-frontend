import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import HeaderNav from "@/components/HeaderNav";
import SosButton from "@/components/SosButton";
import NotificationsPanel from "@/components/NotificationsPanel";
import VoiceChat from "@/components/VoiceChat";
import MoodCheck from "@/components/MoodCheck";
import BreathingMeditation from "@/components/BreathingMeditation";
import GeofenceCheck from "@/components/geofence"; 

type User = {
  username: string;
  id: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://patient-backend-olyv.onrender.com/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or profile not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Profile response:", data);

        if (data.user) {
          setUser({
            username: data.user.name,
            id: data.user._id || data.user.id,
          });
        } else {
          console.warn("No user found in response → logging out");
          handleLogout();
        }
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        handleLogout();
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeaderNav />

      <main role="main" className="container mx-auto px-4 py-6">
        <h1 className="sr-only">CareConnect Accessible Medical Companion</h1>

        <section className="mb-6 rounded-lg bg-gradient-to-br from-brand to-primary p-6 text-primary-foreground flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              Welcome back{user?.username ? `, ${user.username} 👋` : ""}
            </p>
            <p className="text-lg opacity-90">Your care tools, made simple.</p>
          </div>
        </section>

        <section
          aria-label="Key actions"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <NotificationsPanel />
          {/* 🟢 Pass real patientId to GeofenceCheck */}
          {user && <GeofenceCheck userId={user.id} />}
          <VoiceChat />
          <MoodCheck />
          <BreathingMeditation />
        </section>
      </main>

      <SosButton />
    </div>
  );
}
