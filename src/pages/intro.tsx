import { Brain, HeartPulse, Stethoscope, Smile } from "lucide-react";
import React, { useState } from "react";

export default function Intro(): JSX.Element {
  const [popupContent, setPopupContent] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-start items-center px-4 py-3 bg-blue-600 sticky top-0 z-50">
        <div className="flex items-center h-12 space-x-2">
          <img
            src="src\pages\WhatsApp Image 2025-09-04 at 22.15.55_e0a95f97.jpg"
            alt="Neuro-Aid Logo"
            className="h-full object-contain"
          />
          <h1 className="text-xl font-bold text-white whitespace-nowrap">
            Neuro-Aid
          </h1>
        </div>

        <nav className="flex items-center gap-4 ml-auto text-sm">
          <a href="#home" className="font-semibold text-white hover:text-indigo-200 transition-colors duration-300">Home</a>
          <a href="#dementia" className="font-semibold text-white hover:text-indigo-200 transition-colors duration-300">Dementia</a>
          <a href="#about" className="font-semibold text-white hover:text-indigo-200 transition-colors duration-300">About</a>
          <a href="#features" className="font-semibold text-white hover:text-indigo-200 transition-colors duration-300">Features</a>
          <a href="#contact" className="font-semibold text-white hover:text-indigo-200 transition-colors duration-300">Contact</a>
          <a href="/app" className="ml-2 px-4 py-1 bg-white text-blue-600 font-semibold rounded hover:bg-indigo-100 transition">Get Started</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
              Empower Your Mind, Relax Your Soul <br /> & Connect with Care
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              Neuro-Aid combines mental fitness, meditation, and instant medical support — a single place to stay sharp, peaceful, and safe.
            </p>
            <a href="/app" className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition">
              Get Started
            </a>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.usZ4ol_tmI1IZaSjWYANowHaE8?cb=thfc1&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Mind & Wellness"
              className="rounded-xl shadow-xl max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Dementia Awareness Section */}
      <section id="dementia" className="px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src="src\pages\WhatsApp Image 2025-09-04 at 20.30.54_87d57e4d.jpg"
              alt="Dementia Awareness"
              className="rounded-xl shadow-xl max-w-full h-auto object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-4xl font-bold text-indigo-700 mb-6">
              Dementia on the Rise: A Growing Concern
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Dementia is no longer confined to older generations. Research indicates a significant increase in cognitive disorders among both the elderly and younger adults due to lifestyle changes, stress, and genetic factors. Early detection and proactive mental care are essential for slowing its progression and maintaining quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10 text-center">
          <h3 className="text-4xl font-bold text-indigo-700 mb-10">About Neuro-Aid</h3>
          <div className="max-w-5xl mx-auto text-gray-700 text-lg leading-relaxed">
            <p className="mb-6">
              At Neuro-Aid, we believe mental health is as vital as physical health. Our platform blends science-backed exercises, guided meditation, and instant medical access to create a holistic digital companion.
            </p>
            <p className="mb-6">
              Whether you want to sharpen your memory through fun brain quizzes, find calm through guided meditation, or reach a doctor during emergencies, Neuro-Aid is here to support you at every step.
            </p>
            <p className="font-bold">
              Our goal is to provide a clear, modern, and user-friendly interface that feels intuitive while being powerful.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10">
          <h3 className="text-4xl font-bold text-center text-indigo-700 mb-16">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Wellness Insights */}
            <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transition cursor-pointer" onClick={() => setPopupContent("Wellness Insights")}>
              <HeartPulse className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-4">Wellness Insights</h4>
              <p className="text-gray-600">Personalized suggestions and health insights tailored to your needs.</p>
            </div>

            {/* Meditation */}
            <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transition cursor-pointer" onClick={() => setPopupContent("Meditation")}>
              <Smile className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-4">Meditation</h4>
              <p className="text-gray-600">Guided sessions for stress relief, mindfulness, and mental clarity. Your peace, one session away.</p>
            </div>

            {/* Brain Quiz */}
            <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transition cursor-pointer" onClick={() => setPopupContent("Brain Quiz")}>
              <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
              <h4 className="text-2xl font-semibold mb-4">Brain Quiz</h4>
              <p className="text-gray-600">Fun and interactive challenges designed to boost focus, memory, and problem-solving skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Connect */}
      <section id="doctor" className="px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10">
          <h3 className="text-4xl font-bold text-center text-indigo-700 mb-16">Doctor Connect</h3>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white shadow-md rounded-xl text-center cursor-pointer hover:shadow-xl transition" onClick={() => setPopupContent("24/7 Access")}>
              <Stethoscope className="w-14 h-14 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">24/7 Access</h4>
              <p className="text-gray-600">Reach certified doctors anytime, anywhere with one click.</p>
            </div>
            <div className="p-8 bg-white shadow-md rounded-xl text-center cursor-pointer hover:shadow-xl transition" onClick={() => setPopupContent("Emergency Help")}>
              <HeartPulse className="w-14 h-14 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Emergency Help</h4>
              <p className="text-gray-600">Connect instantly during night-time or critical emergencies.</p>
            </div>
            <div className="p-8 bg-white shadow-md rounded-xl text-center cursor-pointer hover:shadow-xl transition" onClick={() => setPopupContent("Expert Specialists")}>
              <Brain className="w-14 h-14 text-indigo-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Expert Specialists</h4>
              <p className="text-gray-600">Access a wide network of doctors and specialists on demand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section id="app-preview" className="px-10 py-20 max-w-6xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl shadow-md p-10">
          <h3 className="text-4xl font-bold text-center text-indigo-700 mb-16">App Preview</h3>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            <img src="src\pages\WhatsApp Image 2025-09-04 at 21.38.40_be40118e.jpg" alt="App Screenshot 1" className="w-[300px] h-[300px] object-cover rounded-xl shadow-lg" />
            <img src="src\pages\WhatsApp Image 2025-09-04 at 22.39.01_d8494bc3.jpg" alt="App Screenshot 2" className="w-[300px] h-[300px] object-cover rounded-xl shadow-lg" />
            <img src="src\pages\WhatsApp Image 2025-09-04 at 22.40.53_ac3a7605.jpg" alt="App Screenshot 3" className="w-[300px] h-[300px] object-cover rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Popup Panel */}
      {popupContent && (
        <div className="fixed top-[69px] bottom-[60px] right-6 bg-white p-5 w-80 rounded-lg shadow-xl border z-50 overflow-y-auto">
          <button className="absolute top-2 right-3 text-gray-500 hover:text-red-500" onClick={() => setPopupContent(null)}>
            ✖
          </button>
          <h3 className="text-lg font-bold text-indigo-700 mb-2">{popupContent}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{/* Popup content */}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="p-6 bg-indigo-700 text-white text-center space-y-2">
        <p>© {new Date().getFullYear()} Developer Team <span className="font-bold">CultLoop</span>. All rights reserved.</p>
        <p>Contact Us: <span className="font-semibold">+91 93150 93867</span></p>
        <p>
          Mail:{" "}
          <a href="mailto:NeuroAidSupport@gmail.com" className="underline hover:text-indigo-200">
            NeuroAidSupport@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}