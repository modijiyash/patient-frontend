import HeaderNav from "@/components/HeaderNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Profile() {
  // Hardcoded dummy user data
  const user = {
    name: "Mihir Kumar",
    email: "mihir@example.com",
    phone: "+91 98765 43210",
    age: 67,
    gender: "Male",
    bloodGroup: "O+",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderNav />

      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">👤 Profile</h1>

        <Card className="max-w-lg mx-auto shadow-2xl rounded-2xl border border-gray-200">
          <CardHeader className="bg-muted rounded-t-2xl">
            <CardTitle className="text-xl font-semibold text-center">
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 py-6">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {user.age}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
            <p>
              <span className="font-semibold">Blood Group:</span>{" "}
              {user.bloodGroup}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}