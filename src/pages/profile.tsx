import { useEffect, useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://doctor-backend-b64v.onrender.com/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 attach JWT
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">No user data found.</p>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

        <Card className="max-w-lg mx-auto shadow-lg">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Age:</span> {user.age}</p>
            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
