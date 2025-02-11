import React, { useState } from "react";
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

const Build = () => {
  const [currentPhase, setCurrentPhase] = useState('build');
  const navigate = useNavigate();

  const handlePhaseClick = (phase) => {
    switch (phase) {
      case "Scope & Stack":
        navigate("/app/project-creation/scope-stack");
        break;
      case "Blueprint":
        navigate("/app/project-creation/blueprint");
        break;
      case "Build":
        // Already here
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

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: false },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: true },
    { icon: "✅", text: "Validate", count: 3, isActive: false },
    { icon: "🚀", text: "Launch", count: 3, isActive: false },
  ];

  const handleNext = () => {
    navigate("/app/project-creation/validate");
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
                <span className="text-white text-2xl font-bold">18</span>
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
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Continue to Validate</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-auto">
        <Message isAi>
          <p className="text-white mb-4">
            I've broken down your fintech dashboard into key tasks. Looking at
            the build phase, here are the core development tasks with T3 Stack +
            Plaid:
          </p>
        </Message>

        {/* Generated Tasks */}
        <div className="mb-8">
          <TaskCard
            title="Implement Bank Account Connection"
            description="OAuth flow integration + Account linking"
            estimate="16h"
            priority="high"
          />
          <TaskCard
            title="Build Transaction Sync Engine"
            description="Real-time transaction fetching + data normalization"
            estimate="8h"
            priority="high"
          />
          <TaskCard
            title="Create Dashboard UI"
            description="Transaction list + balance overview components"
            estimate="8h"
            priority="medium"
          />
          <TaskCard
            title="Implement Basic Analytics"
            description="Monthly trends + spending categories"
            estimate="6h"
            priority="medium"
          />
          <TaskCard
            title="Add CSV Export"
            description="Basic transaction export functionality"
            estimate="4h"
            priority="medium"
          />
        </div>

        <Message isAi>
          <p className="text-white mb-2">
            Do these build tasks look right to you? I can adjust the scope or
            add more detail to any task.
          </p>
          <p className="text-slate-400">
            We can also break down any task into more granular subtasks if
            needed.
          </p>
        </Message>

        {/* Task Action Buttons */}
        <div className="mt-6">
          <div className="flex gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Add subtasks
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Adjust estimates
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Reorder tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Build;
