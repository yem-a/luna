import React from "react";
import { Plus, MoreHorizontal, Command } from "lucide-react";

const TaskRow = ({
  task,
  status,
  priority,
  dueDate,
  estimate,
  priorityColor,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "P0":
        return "text-red-500";
      case "P1":
        return "text-amber-500";
      case "P2":
        return "text-green-500";
      default:
        return "text-slate-400";
    }
  };

  const getDotColor = (priority) => {
    switch (priority) {
      case "P0":
        return "bg-red-500";
      case "P1":
        return "bg-amber-500";
      case "P2":
        return "bg-green-500";
      default:
        return "bg-slate-400";
    }
  };

  return (
    <div className="flex items-center p-2 bg-slate-800 bg-opacity-70 rounded hover:bg-slate-800 transition-colors">
      <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(priority)}`} />
      <div className="flex-1 ml-4">
        <span className="text-white text-sm">{task}</span>
      </div>
      <div className="w-32">
        <span className="px-3 py-1 bg-slate-900 text-slate-400 rounded-full text-xs">
          {status}
        </span>
      </div>
      <div className="w-24">
        <span className={`text-xs ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      </div>
      <div className="w-24">
        <span className="text-slate-400 text-sm">{dueDate}</span>
      </div>
      <div className="w-24">
        <span className="text-slate-400 text-sm">{estimate}</span>
      </div>
    </div>
  );
};

const ProjectTaskGroup = ({ title, tasks }) => {
  return (
    <div className="mb-8">
      <h3 className="text-white text-sm font-medium mb-4">{title}</h3>
      <div className="bg-slate-800 rounded px-4 py-2 mb-2">
        <div className="flex text-xs text-slate-400">
          <div className="flex-1 ml-6">TASK</div>
          <div className="w-32">STATUS</div>
          <div className="w-24">PRIORITY</div>
          <div className="w-24">DUE</div>
          <div className="w-24">ESTIMATE</div>
        </div>
      </div>
      <div className="space-y-1">
        {tasks.map((task, index) => (
          <TaskRow key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

const Tasks = () => {
  const tasks = {
    "Finance Dashboard": [
      {
        task: "Implement Bank Account Connection",
        status: "In Progress",
        priority: "P0",
        dueDate: "Feb 12",
        estimate: "16h",
      },
      {
        task: "Build Transaction Sync Engine",
        status: "Blocked",
        priority: "P0",
        dueDate: "Feb 14",
        estimate: "8h",
      },
      {
        task: "Create Dashboard UI Components",
        status: "Todo",
        priority: "P1",
        dueDate: "Feb 15",
        estimate: "8h",
      },
      {
        task: "Implement Data Export Feature",
        status: "Todo",
        priority: "P1",
        dueDate: "Feb 16",
        estimate: "6h",
      },
      {
        task: "Add Transaction Categories",
        status: "Todo",
        priority: "P2",
        dueDate: "Feb 18",
        estimate: "4h",
      },
      {
        task: "Security Testing and Review",
        status: "Todo",
        priority: "P0",
        dueDate: "Feb 19",
        estimate: "8h",
      },
    ],
    "Mobile App v2": [
      {
        task: "Implement Push Notifications",
        status: "In Review",
        priority: "P0",
        dueDate: "Feb 13",
        estimate: "12h",
      },
      {
        task: "Offline Mode Support",
        status: "In Progress",
        priority: "P1",
        dueDate: "Feb 15",
        estimate: "16h",
      },
      {
        task: "Performance Optimization",
        status: "Todo",
        priority: "P1",
        dueDate: "Feb 17",
        estimate: "8h",
      },
      {
        task: "Update App Icons",
        status: "Todo",
        priority: "P2",
        dueDate: "Feb 20",
        estimate: "4h",
      },
      {
        task: "Fix Authentication Issues",
        status: "In Progress",
        priority: "P0",
        dueDate: "Feb 12",
        estimate: "6h",
      },
    ],
    "Marketing Website": [
      {
        task: "Redesign Homepage",
        status: "In Progress",
        priority: "P1",
        dueDate: "Feb 15",
        estimate: "24h",
      },
      {
        task: "SEO Optimization",
        status: "Todo",
        priority: "P1",
        dueDate: "Feb 16",
        estimate: "8h",
      },
      {
        task: "Content Migration",
        status: "Todo",
        priority: "P2",
        dueDate: "Feb 18",
        estimate: "12h",
      },
      {
        task: "Mobile Responsiveness",
        status: "In Progress",
        priority: "P0",
        dueDate: "Feb 14",
        estimate: "16h",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        <div className="bg-slate-900 rounded-lg p-4 mb-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center bg-slate-800 rounded px-3 py-2 w-72">
              <Command className="w-4 h-4 text-slate-400 mr-2" />
              <span className="text-slate-400 text-sm">
                ⌘K Search or jump to...
              </span>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-full text-sm">
                My Tasks
              </button>
              <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-full text-sm">
                Active
              </button>
              <button className="px-4 py-2 bg-slate-800 text-slate-400 rounded-full text-sm">
                Priority
              </button>
            </div>

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                Task
              </button>
              <button className="w-10 h-10 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-slate-900 rounded-lg p-6">
          {Object.entries(tasks).map(([project, projectTasks]) => (
            <ProjectTaskGroup
              key={project}
              title={project}
              tasks={projectTasks}
            />
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-72 p-6">
        <div className="bg-slate-900 rounded-lg p-6 space-y-6">
          {/* Luna AI Section */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Luna AI</h3>
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-white text-sm mb-4">
                "I notice you have several P0 tasks blocked. Need help with
                dependencies or prioritization?"
              </p>
              <button className="px-4 py-1 bg-slate-900 text-slate-400 rounded-full text-xs">
                Help me plan →
              </button>
            </div>
          </div>

          {/* Views */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">Views</h3>
            <div className="bg-slate-800 rounded-lg p-4">
              <ul className="space-y-4">
                <li className="text-slate-400 text-sm cursor-pointer hover:text-white">
                  Board
                </li>
                <li className="text-slate-400 text-sm cursor-pointer hover:text-white">
                  Timeline
                </li>
                <li className="text-slate-400 text-sm cursor-pointer hover:text-white">
                  Calendar
                </li>
                <li className="text-slate-400 text-sm cursor-pointer hover:text-white">
                  + Create View
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">This Week</h3>
            <div className="bg-slate-800 rounded-lg p-4">
              <ul className="space-y-3">
                <li className="text-slate-400 text-sm">Completed: 15 tasks</li>
                <li className="text-slate-400 text-sm">In Progress: 8 tasks</li>
                <li className="text-slate-400 text-sm">Blocked: 3 tasks</li>
                <li className="text-slate-400 text-sm">Due Soon: 5 tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
