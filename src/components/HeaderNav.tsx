import ThemeToggle from "@/components/ThemeToggle";
import { HeartPulse, Phone, Home, Brain, User, Stethoscope, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeaderNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // redirect to login page
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* Left Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/app")}
        >
          <HeartPulse className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="text-2xl font-bold">NEURO-AID</span>
        </div>

        {/* Nav Bar */}
        <nav className="flex items-center gap-4">
          {/* Home */}
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-400 hover:bg-gray-500 font-bold transition"
          >
            <Home className="h-5 w-5" />
            Home
          </button>

          {/* Engagement */}
          <button
            onClick={() => navigate("/engagement")}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-400 hover:bg-gray-500 font-bold transition"
          >
            <Brain className="h-5 w-5" />
            Engagement
          </button>

          {/* Doctor */}
          <button
            onClick={() => navigate("/doctor")}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-400 hover:bg-gray-500 font-bold transition"
          >
            <Stethoscope className="h-5 w-5" />
            Doctor
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-400 hover:bg-gray-500 font-bold transition"
          >
            <User className="h-5 w-5" />
            Profile
          </button>
        </nav>

        {/* Right Side: Doctor Call, Logout, ThemeToggle */}
        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm" aria-label="Call personal doctor">
            <a href="tel:+1234567890">
              <Phone /> Doctor
            </a>
          </Button>
          <button
            onClick={handleLogout}
            className="ml-4 p-2 rounded-lg hover:bg-muted dark:hover:bg-muted-dark"
            title="Logout"
          >
            <LogOut className="h-6 w-6 text-red-500" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
