import React from "react";
import { Brain, Sparkles, Rocket, Send } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-lg bg-slate-900/50 flex flex-col items-center text-center">
    <Icon className="w-8 h-8 text-blue-400 mb-4" />
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </div>
);

const LandingPage = () => {
  console.log("LandingPage rendering");
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Instant project clarity",
    },
    {
      icon: Sparkles,
      title: "Ideas to Tasks",
      description: "Structured in minutes",
    },
    {
      icon: Rocket,
      title: "Ship Faster",
      description: "Automated workflow updates",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="text-white text-xl font-semibold">Luna</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-white hover:text-blue-400 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-white text-slate-900 rounded-md hover:bg-blue-50 transition-colors">
              Get Early Access
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            Ship your projects faster - idea to execution
            <br />
            in minutes
          </h1>
          <p className="text-slate-400 text-xl mb-12">
            For developers and product teams who want to focus on building, not
            managing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          {/* Chat Box */}
          <div className="max-w-2xl mx-auto bg-slate-900/80 rounded-xl overflow-hidden border border-slate-800/50">
            {/* Chat Header */}
            <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-800/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-slate-400 text-sm">Luna AI</span>
            </div>

            {/* Chat Message */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg text-white font-medium">
                  What are you building today?
                </h3>
              </div>
            </div>

            {/* Input Section */}
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
      </div>
    </div>
  );
};

export default LandingPage;
