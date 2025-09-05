import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const getOfflineBotReply = (message) => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return "Hello! How can I help you with your health today?";
  }
  if (lowerMsg.includes("good morning")) {
    return "Good morning! I hope you’re feeling well today.";
  }
  if (lowerMsg.includes("fever")) {
    return "If you have a fever, drink plenty of fluids and rest. If it lasts more than 2 days, consult a doctor.";
  }
  if (lowerMsg.includes("headache")) {
    return "For mild headaches, rest in a quiet place and drink water. If persistent, see a doctor.";
  }
  if (lowerMsg.includes("cough")) {
    return "A mild cough can be eased with warm fluids and honey. See a doctor if it worsens.";
  }
  if (lowerMsg.includes("covid")) {
    return "If you suspect COVID-19, isolate and get tested as soon as possible.";
  }
  if (lowerMsg.includes("emergency")) {
    return "Please call your nearest hospital or emergency number immediately!";
  }

  return "I’m here to help with basic health information. Please tell me your symptoms.";
};

const speakText = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; 
    utterance.pitch = 1; 
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech synthesis not supported in this browser.");
  }
};

export default function VoiceChat() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const spokenText = event.results[last][0].transcript;
        setTranscript(spokenText);
        recognition.stop();
        const botReply = getOfflineBotReply(spokenText);

        toast({ title: "Bot says", description: botReply });
        speakText(botReply);
      };

      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggle = async () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support speech recognition.",
      });
      return;
    }
    if (!listening) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognition.start();
        setListening(true);
      } catch (e) {
        toast({
          title: "Microphone blocked",
          description: "Please allow microphone access.",
        });
      }
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <Card aria-labelledby="voice-chat-title">
      <CardHeader>
        <CardTitle id="voice-chat-title">Voice Chat</CardTitle>
        <CardDescription>Press the microphone to talk.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant={listening ? "destructive" : "hero"}
          size="lg"
          onClick={toggle}
          aria-label="Toggle voice chat"
        >
          {listening ? <Square /> : <Mic />}
          {listening ? "Stop" : "Speak"}
        </Button>
        {transcript && (
          <p className="mt-3 text-lg">
            You said: <span className="font-semibold">{transcript}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}