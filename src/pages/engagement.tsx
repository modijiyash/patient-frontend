import { useNavigate } from "react-router-dom";
import HeaderNav from "@/components/HeaderNav";
import SosButton from "@/components/SosButton";
import BrainQuizCard from "@/components/BrainQuiz"; // Card export
import MeditationCard from "@/components/BreathingMeditation"; // Card export
import TicTacToe from "@/components/tictactoe";
import MemoryMatch from "@/components/MemoryMatch";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EngagementSection() {
  const navigate = useNavigate();

  return (
    <div className="p-6 relative min-h-screen">
      <HeaderNav />

      <h1 className="text-2xl font-bold mb-4">🧠 Engagement</h1>

      {/* === Row 1: Brain Quiz + Meditation + Sudoku === */}
      <div className="flex space-x-4 overflow-x-auto mb-6">
        <BrainQuizCard />
        <MeditationCard />
      </div>

      {/* === Row 2: Tic Tac Toe + Memory Match === */}
      <div className="flex space-x-4 overflow-x-auto">
        <TicTacToe />
        <Card className="p-4 min-w-[300px]">
          <CardHeader>
            <CardTitle>Memory Match</CardTitle>
            <CardDescription>
              Flip cards to find matching pairs and test your memory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MemoryMatch />
          </CardContent>
        </Card>
      </div>

      {/* ✅ Floating SOS Button */}
      <div className="fixed bottom-6 right-6">
        <SosButton />
      </div>
    </div>
  );
}
