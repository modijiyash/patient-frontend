import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Index from "./pages/dashboard"; 
import { ThemeProvider } from "./components/theme-provider"; 
import Intro from "./pages/intro";

// Newly added imports (moved components)
import Doctor from "./pages/doctor";
import Engagement from "./pages/engagement";
import Profile from "./pages/profile";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 🔒 Protected routes */}
            <Route
              path="/app"
              element={
                <PrivateRoute>
                  <Index />
                </PrivateRoute>
              }
            />

            <Route
              path="/doctor"
              element={
                <PrivateRoute>
                  <Doctor />
                </PrivateRoute>
              }
            />
            <Route
              path="/engagement"
              element={
                <PrivateRoute>
                  <Engagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
