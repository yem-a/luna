import React from "react";
import { useNavigate } from "react-router-dom";
import { List, KanbanSquare, ArrowRight } from "lucide-react";

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

const TaskRow = ({ task, phase, priority, estimate, status }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case "Must Have":
        return "bg-red-500";
      case "Should Have":
        return "bg-amber-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="bg-slate-800 p-3 rounded-lg mb-2 flex items-center">
      <div className={`w-1.5 h-1.5 rounded-full ${getPriorityColor()}`} />
      <div className="ml-6 flex-1">
        <span className="text-white">{task}</span>
      </div>
      <div className="w-32">
        <span className="text-slate-400">{phase}</span>
      </div>
      <div className="w-32">
        <span
          className={`px-3 py-1 rounded-full text-xs text-white ${getPriorityColor()}`}
        >
          {priority}
        </span>
      </div>
      <div className="w-24 text-center">
        <span className="text-slate-400">{estimate}</span>
      </div>
      <div className="w-32 text-right">
        <span className="px-3 py-1 bg-slate-900 rounded-full text-xs text-slate-400">
          {status}
        </span>
      </div>
    </div>
  );
};

// ... [Previous imports and component definitions remain the same] ...

const ProjectConfirmation = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const tasksPerPage = 10;

  const phases = [
    { icon: "🎯", text: "Scope & Stack", count: 4, isActive: false },
    { icon: "📝", text: "Blueprint", count: 3, isActive: false },
    { icon: "⚒️", text: "Build", count: 5, isActive: false },
    { icon: "✅", text: "Validate", count: 3, isActive: false },
    { icon: "🚀", text: "Launch", count: 3, isActive: false },
  ];

  const allTasks = [
    // Scope & Stack Tasks
    {
      task: "Setup T3 Stack Project",
      phase: "🎯 Scope",
      priority: "Must Have",
      estimate: "2h",
      status: "Todo",
    },
    {
      task: "Initialize Plaid SDK",
      phase: "🎯 Scope",
      priority: "Must Have",
      estimate: "2h",
      status: "Todo",
    },
    {
      task: "Define Core Features",
      phase: "🎯 Scope",
      priority: "Must Have",
      estimate: "2h",
      status: "Todo",
    },
    {
      task: "Integration Planning",
      phase: "🎯 Scope",
      priority: "Should Have",
      estimate: "2h",
      status: "Todo",
    },
    // Blueprint Tasks
    {
      task: "Design Database Schema",
      phase: "📝 Blueprint",
      priority: "Must Have",
      estimate: "4h",
      status: "Todo",
    },
    {
      task: "API Architecture Design",
      phase: "📝 Blueprint",
      priority: "Must Have",
      estimate: "3h",
      status: "Todo",
    },
    {
      task: "Component Architecture",
      phase: "📝 Blueprint",
      priority: "Should Have",
      estimate: "3h",
      status: "Todo",
    },
    // Build Tasks
    {
      task: "Implement Bank Account Connection",
      phase: "⚒️ Build",
      priority: "Must Have",
      estimate: "16h",
      status: "Todo",
    },
    {
      task: "Build Transaction Sync Engine",
      phase: "⚒️ Build",
      priority: "Must Have",
      estimate: "8h",
      status: "Todo",
    },
    {
      task: "Create Dashboard UI",
      phase: "⚒️ Build",
      priority: "Should Have",
      estimate: "8h",
      status: "Todo",
    },
    {
      task: "Implement Basic Analytics",
      phase: "⚒️ Build",
      priority: "Should Have",
      estimate: "6h",
      status: "Todo",
    },
    {
      task: "Add CSV Export",
      phase: "⚒️ Build",
      priority: "Should Have",
      estimate: "4h",
      status: "Todo",
    },
    // ... more tasks to reach 24 total ...
  ];

  const totalPages = Math.ceil(24 / tasksPerPage);
  const currentTasks = allTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const totalHours = allTasks.reduce(
    (acc, task) => acc + parseInt(task.estimate),
    0
  );

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
              <div className="text-slate-400 text-sm mt-2">
                Total: {totalHours}h
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

        {/* Start Project Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => navigate("/app/projects/home")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Start Project</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-900 rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-slate-400 text-sm">FINANCE DASHBOARD</p>
            <h1 className="text-white text-lg">2 Week MVP Plan</h1>
          </div>

          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center gap-2">
              <List size={16} />
              <span>List View</span>
            </button>
            <button className="bg-slate-800 text-slate-400 px-6 py-2 rounded-full flex items-center gap-2">
              <KanbanSquare size={16} />
              <span>Kanban View</span>
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="flex items-center px-8 mb-4">
          <div className="flex-1">
            <span className="text-slate-400 text-sm">TASK</span>
          </div>
          <div className="w-32">
            <span className="text-slate-400 text-sm">PHASE</span>
          </div>
          <div className="w-32">
            <span className="text-slate-400 text-sm">PRIORITY</span>
          </div>
          <div className="w-24 text-center">
            <span className="text-slate-400 text-sm">ESTIMATE</span>
          </div>
          <div className="w-32 text-right">
            <span className="text-slate-400 text-sm">STATUS</span>
          </div>
        </div>

        {/* Task List */}
        <div
          className="space-y-1 overflow-auto mb-4"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {currentTasks.map((task, index) => (
            <TaskRow key={index} {...task} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="text-slate-400 text-sm">
            Showing {(currentPage - 1) * tasksPerPage + 1}-
            {Math.min(currentPage * tasksPerPage, 24)} of 24 tasks
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-slate-800 text-slate-600"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Previous
            </button>
            <div className="flex items-center gap-2 px-4">
              <span className="text-white">Page {currentPage}</span>
              <span className="text-slate-400">of {totalPages}</span>
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-slate-800 text-slate-600"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfirmation;
