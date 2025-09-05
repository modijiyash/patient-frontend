import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import HeaderNav from "@/components/HeaderNav";
import SosButton from "@/components/SosButton";
import EmergencyShare from "@/components/EmergencyShare";
import NotificationsPanel from "@/components/NotificationsPanel";
import VoiceChat from "@/components/VoiceChat";
import MoodCheck from "@/components/MoodCheck";
import BreathingMeditation from "@/components/BreathingMeditation";
import BrainQuiz from "@/components/BrainQuiz";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://patient-backend-olyv.onrender.com/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") setUser({ username: data.user.name });
        else {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  const handleAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appointment = {
      username: user?.username || formData.get("username"),
      date: formData.get("date"),
      time: formData.get("time"),
      reason: formData.get("reason"),
    };

    try {
      const res = await fetch("https://patient-backend-olyv.onrender.com/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (!res.ok) throw new Error("Failed to book appointment");

      alert("✅ Appointment scheduled successfully!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Could not book appointment.");
    }
  };

  const generateTimeOptions = () => {
    const times: string[] = [];
    const startHour = 7;
    const endHour = 20;
    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour !== endHour) times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
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
          <EmergencyShare />
          <NotificationsPanel />

          <Card>
            <CardHeader>
              <CardTitle>Personal Doctor Contact</CardTitle>
              <CardDescription>Call, message, or book an appointment.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="soft" size="lg">
                <a href="tel:+1234567890">Call Doctor</a>
              </Button>
              <Button asChild variant="soft" size="lg">
                <a href="sms:+1234567890">Message Doctor</a>
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={() => setShowModal(true)}
              >
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>

          <VoiceChat />
          <MoodCheck />
          <BreathingMeditation />
          <BrainQuiz />
        </section>
      </main>

      <SosButton />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-xl p-6 w-96 relative animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              📅 Schedule Appointment
            </h2>
            <form onSubmit={handleAppointmentSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="username" value={user?.username || ""} />

              <label className="flex flex-col gap-1">
                <span className="font-medium text-black dark:text-white">
                  Select Date
                </span>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none
                             bg-white text-black dark:bg-zinc-800 dark:text-white"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium text-black dark:text-white">
                  Select Time
                </span>
                <select
                  name="time"
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none
                             bg-white text-black dark:bg-zinc-800 dark:text-white max-h-60 overflow-y-auto"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium text-black dark:text-white">
                  Reason
                </span>
                <textarea
                  name="reason"
                  placeholder="Reason for appointment"
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none
                             bg-white text-black dark:bg-zinc-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  rows={3}
                />
              </label>

              <div className="flex justify-end gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Book
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div> 
  );
}

