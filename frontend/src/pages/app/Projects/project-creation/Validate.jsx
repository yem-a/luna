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

const Validate = () => {
  const navigate = useNavigate();

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: false },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: false },
    { icon: "✅", text: "Validate", count: 3, isActive: true },
    { icon: "🚀", text: "Launch", count: 3, isActive: false },
  ];

  const handlePhaseClick = (phase) => {
    switch (phase) {
      case "Scope & Stack":
        navigate("/app/project-creation/scope-stack");
        break;
      case "Blueprint":
        navigate("/app/project-creation/blueprint");
        break;
      case "Build":
        navigate("/app/project-creation/build");
        break;
      case "Validate":
        // Already here
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
          {/* Task Count */}
          <div className="mb-8">
            <h2 className="text-white text-lg mb-4">Task Generation</h2>
            <div className="bg-slate-800 p-4 rounded-lg">
              <div className="flex items-baseline">
                <span className="text-white text-2xl font-bold">21</span>
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
            onClick={() => handlePhaseClick("Launch")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Continue to Launch</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-auto">
        <Message isAi>
          <p className="text-white mb-4">
            Let's validate your fintech dashboard before launch. Here are the
            key testing and validation tasks to ensure everything works
            perfectly:
          </p>
        </Message>

        {/* Generated Tasks */}
        <div className="mb-8">
          <TaskCard
            title="Security Testing"
            description="OAuth flow validation, data encryption verification, and penetration testing"
            estimate="8h"
            priority="high"
          />
          <TaskCard
            title="Integration Testing"
            description="End-to-end testing of Plaid integration and transaction syncing"
            estimate="6h"
            priority="high"
          />
          <TaskCard
            title="User Acceptance Testing"
            description="Test all user flows and gather feedback on UI/UX"
            estimate="4h"
            priority="medium"
          />
          <TaskCard
            title="Performance Testing"
            description="Load testing and optimization of dashboard components"
            estimate="4h"
            priority="medium"
          />
          <TaskCard
            title="Cross-browser Testing"
            description="Verify compatibility across Chrome, Firefox, Safari, and Edge"
            estimate="2h"
            priority="medium"
          />
        </div>

        <Message isAi>
          <p className="text-white mb-2">
            Would you like me to generate test cases for any of these areas? I
            can also suggest automated testing tools for your stack.
          </p>
          <p className="text-slate-400">
            We should prioritize security and integration testing given the
            financial nature of the application.
          </p>
        </Message>

        {/* Testing Options */}
        <div className="mt-6">
          <div className="flex gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Generate test cases
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              View testing tools
            </button>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Security checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validate;
