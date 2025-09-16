import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import SosButton from "@/components/SosButton";
import BrainQuiz from "@/components/BrainQuiz";
import BreathingMeditation from "@/components/BreathingMeditation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EngagementSection() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 relative min-h-screen">
      <HeaderNav />

      <h1 className="text-2xl font-bold mb-4">🧠 Engagement</h1>

      <div className="space-y-4">
        {/* Brain Quiz Card */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Brain Quiz</CardTitle>
            <CardDescription>
              Test your brain skills with fun quizzes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowQuiz(true)}>
              Start Brain Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Meditation Card */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Meditation</CardTitle>
            <CardDescription>
              Relax and improve focus with guided meditation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowMeditation(true)}>
              Start Meditation
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Render BrainQuiz component when showQuiz is true */}
      {showQuiz && <BrainQuiz />}

      {/* Render BreathingMeditation component when showMeditation is true */}
      {showMeditation && <BreathingMeditation />}

      {/* ✅ Floating SOS Button */}
      <div className="fixed bottom-6 right-6">
        <SosButton />
      </div>
    </div>
  );
}
