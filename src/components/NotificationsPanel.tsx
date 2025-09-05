import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Trash2, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  time: string;
  type: "reminder" | "appointment";
  dateTime?: string; 
}

export default function NotificationsPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDateTime, setNewDateTime] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("https://patient-frontend-txxi.vercel.app/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        if (data.status !== "ok") throw new Error("Invalid response");

        const formatted = data.appointments.map((a: any) => ({
          id: a._id,
          title: "Doctor Appointment",
          time: formatDateTime(`${a.date}T${a.time}`),
          type: "appointment" as const,
          dateTime: `${a.date}T${a.time}`,
        }));

        setTasks(formatted);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
        toast({ title: "Error fetching appointments" });
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.filter((task) => {
          if (task.type === "appointment" && task.dateTime) {
            return new Date(task.dateTime).getTime() > Date.now();
          }
          return true; 
        })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const enableNotifications = () => {
    if (!("Notification" in window)) {
      toast({ title: "Notifications not supported" });
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        toast({
          title: "Reminders enabled",
          description: "You will get notifications for appointments.",
        });
        new Notification("Notifications Enabled!", {
          body: "You will now receive reminders for your appointments.",
        });
      } else if (permission === "denied") {
        toast({
          title: "Permission denied",
          description: "Enable notifications in your browser settings.",
        });
      }
    });
  };

  function formatDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${day}, ${time}`;
  }

  const addTask = () => {
    if (!newTitle.trim() || !newDateTime) {
      toast({ title: "Please enter both title and date/time" });
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle,
      time: formatDateTime(newDateTime),
      type: "reminder",
      dateTime: newDateTime,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTitle("");
    setNewDateTime("");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const visibleTasks = showAll ? tasks : tasks.slice(0, 2);

  return (
    <Card aria-labelledby="notifications-title">
      <CardHeader>
        <CardTitle id="notifications-title">Notifications</CardTitle>
        <CardDescription>
          Upcoming appointments and medicine reminders for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Button
            onClick={enableNotifications}
            size="lg"
            variant="soft"
            aria-label="Enable reminders"
          >
            <Bell /> Enable Reminders
          </Button>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={newDateTime}
            onChange={(e) => setNewDateTime(e.target.value)}
          />
          <Button onClick={addTask} aria-label="Add task">
            <Plus />
          </Button>
        </div>
        <ul className="space-y-3">
          {tasks.length === 0 && (
            <li className="text-center text-muted-foreground">
              No upcoming reminders or appointments.
            </li>
          )}
          {visibleTasks.map((n) => (
            <li
              key={n.id}
              className={`flex justify-between items-center rounded-md px-4 py-3 ${
                n.type === "appointment" ? "bg-blue-100" : "bg-muted"
              }`}
            >
              <div>
                <span className="block text-lg font-medium">{n.title}</span>
                <span className="text-muted-foreground">{n.time}</span>
              </div>
              {n.type === "reminder" && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteTask(n.id)}
                  aria-label="Delete task"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              )}
            </li>
          ))}
        </ul>
        {tasks.length > 2 && (
          <div className="flex justify-center mt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAll((prev) => !prev)}
              className="flex items-center gap-1"
            >
              {showAll ? "Show Less" : "Show More"}{" "}
              <ChevronDown className={`w-4 h-4 ${showAll ? "rotate-180" : ""}`} />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
