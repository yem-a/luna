import React from "react";
import { Filter, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProjectCard = ({
  id,
  title,
  type,
  tasksRemaining,
  timeUntilLaunch,
  priority,
  progress,
}) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };

  const handleClick = () => {
    navigate(`/app/projects/${id}`);
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleClick}>
      <div className="bg-slate-900 p-4 rounded-lg hover:bg-slate-800 transition-colors">
        <div className="bg-slate-800 p-4 rounded-md h-full hover:bg-slate-700 transition-colors">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{type}</p>

          {/* Progress Bar */}
          <div className="mt-4 bg-slate-900 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Stats */}
          <div className="mt-4 space-y-2">
            <p className="text-slate-400 text-sm">
              {tasksRemaining} tasks remaining
            </p>
            <p className="text-slate-400 text-sm">{timeUntilLaunch}</p>
          </div>

          {/* Priority Badge */}
          <div className="mt-2">
            <span
              className={`${getPriorityColor(
                priority
              )} px-3 py-1 rounded-full text-white text-xs`}
            >
              {priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentProjectRow = ({
  project,
  status,
  completion,
  tasks,
  completedDate,
}) => {
  return (
    <div className="bg-slate-800 p-4 rounded-md flex items-center gap-4">
      <div className="w-1/4">
        <p className="text-white">{project}</p>
      </div>
      <div className="w-1/6">
        <span className="bg-green-500 px-3 py-1 rounded-full text-white text-xs">
          {status}
        </span>
      </div>
      <div className="w-1/6">
        <p className="text-white">{completion}</p>
      </div>
      <div className="w-1/6">
        <p className="text-white">{tasks}</p>
      </div>
      <div className="w-1/6">
        <p className="text-white">{completedDate}</p>
      </div>
    </div>
  );
};

const Projects = () => {
  const activeProjects = [
    {
      id: "finance-dashboard",
      title: "Finance Dashboard",
      type: "2 WEEK MVP",
      tasksRemaining: 12,
      timeUntilLaunch: "5 days until launch",
      priority: "High",
      progress: 50,
    },
    {
      id: "marketing-website",
      title: "Marketing Website",
      type: "REDESIGN",
      tasksRemaining: 8,
      timeUntilLaunch: "2 weeks until launch",
      priority: "Medium",
      progress: 25,
    },
    {
      id: "api-integration",
      title: "API Integration",
      type: "BACKEND",
      tasksRemaining: 4,
      timeUntilLaunch: "3 days until launch",
      priority: "Medium",
      progress: 75,
    },
  ];

  const recentProjects = [
    {
      project: "User Authentication",
      status: "Done",
      completion: "100%",
      tasks: "15",
      completedDate: "Jan 15, 2025",
    },
    {
      project: "Payment Gateway",
      status: "Done",
      completion: "100%",
      tasks: "12",
      completedDate: "Jan 2, 2025",
    },
    {
      project: "Admin Dashboard",
      status: "Done",
      completion: "100%",
      tasks: "20",
      completedDate: "Dec 20, 2024",
    },
  ];

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center mb-8">
        <h1 className="text-white text-xl">Projects</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-800 text-slate-400 px-6 py-2 rounded-full">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <Link
            to="/app/project-creation/new"
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span>New</span>
          </Link>
        </div>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <h2 className="text-white text-lg mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-white text-lg mb-4">Recent Projects</h2>
        <div className="bg-slate-900 rounded-lg p-4">
          {/* Headers */}
          <div className="flex gap-4 text-slate-400 text-sm mb-4 px-4">
            <div className="w-1/4">PROJECT</div>
            <div className="w-1/6">STATUS</div>
            <div className="w-1/6">COMPLETION</div>
            <div className="w-1/6">TASKS</div>
            <div className="w-1/6">COMPLETED</div>
          </div>

          {/* Project Rows */}
          <div className="space-y-2">
            {recentProjects.map((project, index) => (
              <RecentProjectRow key={index} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
