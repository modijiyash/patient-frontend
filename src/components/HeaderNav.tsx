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
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/90 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* Left Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/app")}
        >
          <HeartPulse className="h-8 w-8 text-blue-500" aria-hidden="true" />
          <span className="text-2xl font-bold text-white">NEURO-AID</span>
        </div>

        {/* Nav Bar */}
        <nav className="flex items-center gap-4">
          {/* Home */}
          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 text-white font-bold transition transform hover:bg-blue-600 hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Home
          </button>

          {/* Engagement */}
          <button
            onClick={() => navigate("/engagement")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 text-white font-bold transition transform hover:bg-blue-600 hover:scale-105"
          >
            <Brain className="h-5 w-5" />
            Engagement
          </button>

          {/* Doctor */}
          <button
            onClick={() => navigate("/doctor")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 text-white font-bold transition transform hover:bg-blue-600 hover:scale-105"
          >
            <Stethoscope className="h-5 w-5" />
            Doctor
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 text-white font-bold transition transform hover:bg-blue-600 hover:scale-105"
          >
            <User className="h-5 w-5" />
            Profile
          </button>
        </nav>

        {/* Right Side: Doctor Call, Logout, ThemeToggle */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="hero"
            size="sm"
            aria-label="Call personal doctor"
            className="bg-blue-700 text-white hover:bg-blue-600 transition transform hover:scale-105"
          >
            <a href="tel:+1234567890" className="flex items-center gap-2">
              <Phone /> Doctor
            </a>
          </Button>
          <button
            onClick={handleLogout}
            className="ml-4 p-2 rounded-lg hover:bg-red-700 transition transform hover:scale-110"
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
