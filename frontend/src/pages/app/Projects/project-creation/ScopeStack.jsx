import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PhaseButton = ({ icon, text, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 rounded-lg mb-4 text-left flex items-center
      ${isActive ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"}
      hover:bg-blue-600 transition-colors`}
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

const ScopeStack = () => {
  const navigate = useNavigate();

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: true },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: false },
    { icon: "✅", text: "Validate", count: 3, isActive: false },
    { icon: "🚀", text: "Launch", count: 3, isActive: false },
  ];

  const handlePhaseClick = (phase) => {
    switch (phase) {
      case "Scope & Stack":
        // Already here
        break;
      case "Blueprint":
        navigate("/app/project-creation/blueprint");
        break;
      case "Build":
        navigate("/app/project-creation/build");
        break;
      case "Validate":
        navigate("/app/project-creation/validate");
        break;
      case "Launch":
        navigate("/app/project-creation/launch");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 p-6 gap-6">
      {/* Left Panel - Progress */}
      <div className="w-64 bg-slate-900 rounded-xl p-6 relative">
        <div className="h-full pb-20">
          {" "}
          {/* Added padding bottom for button space */}
          {/* Task Count */}
          <div className="mb-8">
            <h2 className="text-white text-lg mb-4">Task Generation</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="flex items-baseline">
                <span className="text-white text-2xl font-bold">4</span>
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
              <PhaseButton 
                key={index} 
                {...phase} 
                onClick={() => handlePhaseClick(phase.text)}
              />
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => handlePhaseClick("Blueprint")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Continue to Blueprint</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-auto">
        <Message isAi>
          <p className="text-white mb-4">
            Based on your financial dashboard idea, I've identified these key
            scope items and suggested tech stack:
          </p>
        </Message>

        {/* Generated Tasks */}
        <div className="mb-8">
          <TaskCard
            title="Core Features Definition"
            description="Define essential features for MVP: account linking, transaction view, basic analytics"
            estimate="2h"
            priority="high"
          />
          <TaskCard
            title="Tech Stack Selection"
            description="T3 Stack (Next.js, tRPC, Prisma) + Plaid for banking integration"
            estimate="1h"
            priority="high"
          />
          <TaskCard
            title="Data Model Planning"
            description="Plan database schema for users, accounts, transactions, and categories"
            estimate="2h"
            priority="medium"
          />
          <TaskCard
            title="Integration Requirements"
            description="Document Plaid API integration points and requirements"
            estimate="1h"
            priority="medium"
          />
        </div>

        <Message isAi>
          <p className="text-white mb-2">
            Would you like to adjust any of these scope items or explore
            different tech stack options?
          </p>
          <p className="text-slate-400">
            I can provide more details about trade-offs between different stacks
            or adjust the feature scope.
          </p>
        </Message>
      </div>
    </div>
  );
};

export default ScopeStack;
