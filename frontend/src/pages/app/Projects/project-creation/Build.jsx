import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import UpdateTaskModal from "@/components/tasks/UpdateTaskModal";

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

const TaskCard = ({ title, description, estimate, priority, onClick }) => {
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
      <div
        className="bg-slate-800 p-6 rounded-lg flex cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={onClick}
      >
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
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: false },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: true },
    { icon: "✅", text: "Validate", count: 3, isActive: false },
    { icon: "🚀", text: "Launch", count: 3, isActive: false },
  ];

  const handleTaskClick = (title, description, estimate) => {
    // Create a full task object based on the clicked task
    const task = {
      id: `task-${Date.now()}`,
      title,
      description,
      estimate,
      status: "TODO",
      priority: "MUST_HAVE",
      riskLevel: "MEDIUM",
      riskDescription:
        title === "Implement Bank Account Connection"
          ? "OAuth flow complexity and potential security vulnerabilities"
          : "",
      mitigationStrategy:
        title === "Implement Bank Account Connection"
          ? "Use Plaid's official SDK and follow security best practices"
          : "",
      dependencies:
        title === "Implement Bank Account Connection"
          ? ["Setup T3 Stack (scope-001)"]
          : [],
      tags:
        title === "Implement Bank Account Connection" ? ["auth", "plaid"] : [],
    };

    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    console.log("Updated task:", updatedTask);
    // Here you would typically update your task state or make an API call
    setIsUpdateModalOpen(false);
    setSelectedTask(null);
  };

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
            onClick={() =>
              handleTaskClick(
                "Implement Bank Account Connection",
                "OAuth flow integration + Account linking",
                "16h"
              )
            }
          />
          <TaskCard
            title="Build Transaction Sync Engine"
            description="Real-time transaction fetching + data normalization"
            estimate="8h"
            priority="high"
            onClick={() =>
              handleTaskClick(
                "Build Transaction Sync Engine",
                "Real-time transaction fetching + data normalization",
                "8h"
              )
            }
          />
          <TaskCard
            title="Create Dashboard UI"
            description="Transaction list + balance overview components"
            estimate="8h"
            priority="medium"
            onClick={() =>
              handleTaskClick(
                "Create Dashboard UI",
                "Transaction list + balance overview components",
                "8h"
              )
            }
          />
          <TaskCard
            title="Implement Basic Analytics"
            description="Monthly trends + spending categories"
            estimate="6h"
            priority="medium"
            onClick={() =>
              handleTaskClick(
                "Implement Basic Analytics",
                "Monthly trends + spending categories",
                "6h"
              )
            }
          />
          <TaskCard
            title="Add CSV Export"
            description="Basic transaction export functionality"
            estimate="4h"
            priority="medium"
            onClick={() =>
              handleTaskClick(
                "Add CSV Export",
                "Basic transaction export functionality",
                "4h"
              )
            }
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

      {/* Update Task Modal */}
      {selectedTask && (
        <UpdateTaskModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedTask(null);
          }}
          onSave={handleTaskUpdate}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Build;
