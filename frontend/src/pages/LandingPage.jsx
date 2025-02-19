import React, { useState } from "react";
import { Brain, Sparkles, Rocket, Send, PlayCircle, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

// NEW: Import video
import lunaDemo from "../assets/Lunademo.mp4";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="p-6 rounded-lg bg-slate-900/50 flex flex-col items-center text-center"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="w-8 h-8 text-blue-400 mb-4" />
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </motion.div>
);

const EmailModal = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  email,
  setEmail,
  isSubmitted,
}) => (
  <Dialog
    open={isOpen}
    onClose={() => setIsOpen(false)}
    className="relative z-50"
  >
    {/* Backdrop */}
    <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

    {/* Modal position */}
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel className="w-full max-w-md rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <Dialog.Title className="text-xl font-semibold text-white">
            {isSubmitted ? "Thank You! 🎉" : "Get Early Access"}
          </Dialog.Title>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-slate-400">
            <p>We'll notify you when Luna launches!</p>
          </div>
        ) : (
          <>
            <Dialog.Description className="text-slate-400 mb-4">
              Join our waitlist to be notified when we launch. Be among the
              first to experience AI-powered project management.
            </Dialog.Description>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Join Waitlist
              </button>
            </form>
          </>
        )}
      </Dialog.Panel>
    </div>
  </Dialog>
);

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  return (
    <div className="bg-slate-900/50 rounded-lg aspect-video relative group cursor-pointer overflow-hidden">
      {!isPlaying ? (
        <>
          <video className="w-full h-full object-cover absolute inset-0" muted>
            <source src={lunaDemo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-lg" />
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PlayCircle className="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform" />
          </button>
        </>
      ) : (
        <video
          className="w-full h-full object-cover rounded-lg"
          autoPlay
          controls
          playsInline
        >
          <source src={lunaDemo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/xvgokalj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const steps = [
    {
      icon: Sparkles,
      title: "1️⃣ Describe Your Idea",
      description: "Tell Luna what you're building.",
    },
    {
      icon: Brain,
      title: "2️⃣ Watch AI Generate Tasks",
      description: "Instant, structured project breakdown.",
    },
    {
      icon: Rocket,
      title: "3️⃣ Ship Faster",
      description: "Luna auto-updates workflows as you progress.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <EmailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        isSubmitted={isSubmitted}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <img
              src="/src/assets/logo.png"
              alt="Luna logo"
              className="w-10 h-10"
            />
            <span className="text-white text-xl font-semibold">Luna</span>
          </div>
          <button
            className="px-4 py-2 bg-white text-slate-900 rounded-md hover:bg-blue-50"
            onClick={() => setIsOpen(true)}
          >
            Get Early Access
          </button>
        </header>

        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold mb-4">
            From Idea to Shipped Code - Your AI PM
          </h1>
          <p className="text-slate-400 text-xl mb-8">
            Smart project planning. Zero busywork. Let AI handle managing
            projects while you focus on building.
          </p>
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsOpen(true)}
          >
            Join 100+ early testers
          </button>
          {/* AI Chat Section */}
          <div className="max-w-2xl mx-auto bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800/50 mt-6">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-800/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-slate-400 text-sm">Luna AI</span>
            </div>
            <div className="p-4 flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg text-white font-medium">
                What are you building today?
              </h3>
            </div>
            <div className="p-4 border-t border-slate-800/50">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Share your project idea..."
                  className="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/50 transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-800/50 rounded-lg transition-colors">
                  <Send className="w-4 h-4 text-blue-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Consolidated Section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-semibold mb-12">🔮 How Luna Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side: Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <FeatureCard key={step.title} {...step} />
              ))}
            </div>

            {/* Right Side: Video Demo */}
            <div className="mt-24">
              <VideoPlayer />
            </div>
          </div>
        </div>

        {/* Why Luna */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-semibold mb-6">💡 Why Luna?</h2>
          <p className="text-slate-400 text-lg">
            Built by founders who hate manual PM tools.
          </p>
          <p className="text-slate-400 text-lg">
            Eliminates wasted time planning and tracking.
          </p>
          <p className="text-slate-400 text-lg">
            Perfect for indie hackers, dev teams, and product builders.
          </p>
        </div>

        {/* Privacy & Terms */}
        <div className="py-16 text-center text-slate-400 text-sm">
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
