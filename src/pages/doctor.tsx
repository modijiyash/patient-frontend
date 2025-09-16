import { useState } from "react";
import HeaderNav from "@/components/HeaderNav"; // ✅ Import HeaderNav
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DoctorProps = {
  username?: string;
  userId?: string;
};

export default function Doctor({ username }: DoctorProps) {
  const [showModal, setShowModal] = useState(false);

  const handleAppointmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appointment = {
      username: username || (formData.get("username") as string),
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
    <div className="min-h-screen p-6">
      {/* ✅ HeaderNav on top */}
      <HeaderNav />

      {/* Doctor Card */}
      <Card className="mt-6">
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
          <Button variant="default" size="lg" onClick={() => setShowModal(true)}>
            Schedule Appointment
          </Button>
        </CardContent>
      </Card>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-xl p-6 w-96 relative animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              📅 Schedule Appointment
            </h2>
            <form onSubmit={handleAppointmentSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="username" value={username || ""} />

              <label className="flex flex-col gap-1">
                <span className="font-medium">Select Date</span>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary bg-white dark:bg-zinc-800"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium">Select Time</span>
                <select
                  name="time"
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary bg-white dark:bg-zinc-800 max-h-60 overflow-y-auto"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-medium">Reason</span>
                <textarea
                  name="reason"
                  placeholder="Reason for appointment"
                  required
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-primary bg-white dark:bg-zinc-800 placeholder:text-gray-500"
                  rows={3}
                />
              </label>

              <div className="flex justify-end gap-3 mt-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
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
