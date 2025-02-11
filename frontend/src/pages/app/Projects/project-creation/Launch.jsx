import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PhaseButton = ({ icon, text, count, isActive }) => (
  <button
    className={`w-full p-3 rounded-lg mb-4 text-left flex items-center
      ${isActive ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"}`}
  >
    <span className="mr-2">{icon}</span>
    <span>{text}</span>
    <span className="ml-auto">({count})</span>
  </button>
);

const TaskCard = ({ title, description, estimate, priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="mb-6 relative">
      <div className="bg-slate-800 p-6 rounded-lg flex">
        <div
          className={`w-1 ${getPriorityColor()} absolute left-0 top-0 bottom-0 rounded-l-lg`}
        />
        <div className="flex-1 ml-4">
          <h3 className="text-white text-lg mb-2">{title}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
        <div className="text-slate-400 text-sm">{estimate}</div>
      </div>
    </div>
  );
};

const Message = ({ isAi, children }) => (
  <div className="mb-6">
    {isAi && (
      <div className="flex items-center mb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2" />
        <span className="text-slate-400 text-sm">Luna AI</span>
      </div>
    )}
    <div className={`p-6 rounded-lg ${isAi ? "bg-slate-800" : "bg-slate-900"}`}>
      {children}
    </div>
  </div>
);

const Launch = () => {
  const navigate = useNavigate();

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: false },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: false },
    { icon: "✅", text: "Validate", count: 3, isActive: false },
    { icon: "🚀", text: "Launch", count: 3, isActive: true },
  ];

  const handleNext = () => {
    navigate("/app/project-creation/confirmation");
  };

  return (
    <div className="flex h-screen bg-slate-950 p-6 gap-6">
      {/* Left Panel - Progress */}
      <div className="w-64 bg-slate-900 rounded-xl p-6 relative">
        <div className="h-full pb-20">
          {/* Task Count */}
          <div className="mb-8">
            <h2 className="text-white text-lg mb-4">Task Generation</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="flex items-baseline">
                <span className="text-white text-2xl font-bold">24</span>
                <span className="text-slate-400 text-sm ml-2">
                  tasks created
                </span>
              </div>
            </div>
          </div>

          {/* Phases */}
          <div>
            <h3 className="text-slate-400 text-sm mb-4">PHASES</h3>
            {phases.map((phase, index) => (
              <PhaseButton key={index} {...phase} />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Complete Setup</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-auto">
        <Message isAi>
          <p className="text-white mb-4">
            We're ready for launch! Here's your final checklist to ensure a
            smooth deployment of your fintech dashboard:
          </p>
        </Message>

        {/* Generated Tasks */}
        <div className="mb-8">
          <TaskCard
            title="Production Environment Setup"
            description="Configure Vercel deployment, environment variables, and monitoring"
            estimate="4h"
            priority="high"
          />
          <TaskCard
            title="Database Migration"
            description="Run final schema migrations and verify data integrity"
            estimate="2h"
            priority="high"
          />
          <TaskCard
            title="SSL & Domain Setup"
            description="Configure SSL certificates and DNS settings"
            estimate="1h"
            priority="high"
          />
          <TaskCard
            title="Analytics Integration"
            description="Set up error tracking and user analytics"
            estimate="2h"
            priority="medium"
          />
          <TaskCard
            title="Documentation Finalization"
            description="Complete API documentation and deployment guides"
            estimate="3h"
            priority="medium"
          />
        </div>

        <Message isAi>
          <p className="text-white mb-2">
            Would you like me to generate deployment scripts or documentation
            for any of these tasks? I can also provide a detailed launch day
            checklist.
          </p>
          <p className="text-slate-400">
            Remember to back up all data before proceeding with the production
            deployment.
          </p>
        </Message>

        {/* Launch Options */}
        <div className="mt-6">
          <div className="flex gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Generate deployment scripts
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              View launch checklist
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Backup guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
