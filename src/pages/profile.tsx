import HeaderNav from "@/components/HeaderNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Profile() {
  // Dummy data for now (later you’ll fetch from backend)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
  };

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
            <p><span className="font-semibold">Blood Group:</span> {user.bloodGroup}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
