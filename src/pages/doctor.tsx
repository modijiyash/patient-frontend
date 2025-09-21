import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DoctorProps = {
  username?: string;
  userId?: string;
};

type Appointment = {
  id?: string; // ✅ assuming backend sends id
  username: string;
  date: string;
  time: string;
  reason: string;
};

export default function Doctor({ username }: DoctorProps) {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastVisit, setLastVisit] = useState<Appointment | null>(null);

  // ✅ Get username from localStorage (priority)
  const storedUsername =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const finalUsername = storedUsername || username || "Guest";

  // Fetch appointments
  useEffect(() => {
    fetch("https://patient-backend-olyv.onrender.com/appointments")
      .then((res) => res.json())
      .then((data: Appointment[]) => {
        setAppointments(data);
        if (data.length > 0) {
          // Assume last visit is the most recent past appointment
          const pastVisits = data.filter(
            (appt) => new Date(`${appt.date}T${appt.time}`) < new Date()
          );
          if (pastVisits.length > 0) {
            setLastVisit(pastVisits[pastVisits.length - 1]);
          }
        }
      })
      .catch((err) => console.error("❌ Failed to fetch appointments:", err));
  }, []);

  const handleAppointmentSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appointment: Appointment = {
      username: finalUsername,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      reason: formData.get("reason") as string,
    };

    try {
      const res = await fetch(
        "https://patient-backend-olyv.onrender.com/appointments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        }
      );

      if (!res.ok) throw new Error("Failed to book appointment");

      alert(
        `✅ Appointment scheduled for ${appointment.date} at ${appointment.time}`
      );
      setAppointments((prev) => [...prev, appointment]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("❌ Could not book appointment.");
    }
  };

  // ✅ Delete appointment
  const handleDelete = async (id?: string, idx?: number) => {
    if (!id && idx === undefined) return;

    try {
      if (id) {
        const res = await fetch(
          `https://patient-backend-olyv.onrender.com/appointments/${id}`,
          { method: "DELETE" }
        );
        if (!res.ok) throw new Error("Failed to delete appointment");
      }
      setAppointments((prev) =>
        prev.filter((_, i) => (idx !== undefined ? i !== idx : true))
      );
    } catch (err) {
      console.error(err);
      alert("❌ Could not delete appointment.");
    }
  };

  const generateTimeOptions = () => {
    const times: string[] = [];
    const startHour = 7;
    const endHour = 20;
    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour !== endHour)
        times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return times;
  };

  return (
    <div className="min-h-screen p-6">
      <HeaderNav />

      {/* ✅ 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Doctor Contact */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>👨‍⚕️ Personal Doctor Contact</CardTitle>
            <CardDescription>Call or message directly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="soft" size="lg">
              <a href="tel:+1234567890">📞 Call Doctor</a>
            </Button>
            <Button asChild variant="soft" size="lg">
              <a href="sms:+1234567890">💬 Message Doctor</a>
            </Button>
          </CardContent>
        </Card>

        {/* Schedule Appointment */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>📅 Schedule Appointment</CardTitle>
            <CardDescription>Book your next consultation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowModal(true)}
            >
              ➕ New Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>📌 Upcoming Appointments</CardTitle>
            <CardDescription>Track your scheduled visits.</CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <ul className="space-y-3">
                {appointments.map((appt, idx) => (
                  <li
                    key={appt.id || idx}
                    className="p-3 border rounded-xl shadow-sm bg-gray-50 dark:bg-zinc-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-primary">
                          {appt.date} at {appt.time}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {appt.reason}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                          Upcoming
                        </span>
                        <button
                          onClick={() => handleDelete(appt.id, idx)}
                          className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No appointments yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Last Visit */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>🕑 Last Visit</CardTitle>
            <CardDescription>Your most recent consultation.</CardDescription>
          </CardHeader>
          <CardContent>
            {lastVisit ? (
              <p className="text-gray-700">
                <strong>{lastVisit.date}</strong> at{" "}
                <strong>{lastVisit.time}</strong> — {lastVisit.reason}
              </p>
            ) : (
              <p className="text-gray-500">No past visits recorded.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl shadow-xl p-6 w-96 relative animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              📅 New Appointment
            </h2>
            <form
              onSubmit={handleAppointmentSubmit}
              className="flex flex-col gap-4"
            >
              <input type="hidden" name="username" value={finalUsername} />

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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
