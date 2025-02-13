import React from "react";
import { TrendingUp, Plus, ListTodo } from "lucide-react";

const StatCard = ({ title, value, subtext, trend }) => (
  <div className="w-60 h-32 rounded-lg bg-slate-800 p-5">
    <p className="text-slate-500 text-sm uppercase">{title}</p>
    <p className="text-white text-2xl mt-2">{value}</p>
    <p className="text-slate-500 text-sm">{subtext}</p>
    <p
      className={`text-sm ${
        trend?.includes("↑") ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend}
    </p>
  </div>
);

const TaskRow = ({ priority, title, status, dueDate, estimate }) => (
  <div className="w-full h-16 bg-slate-800 rounded flex items-center px-5 mb-4">
    <div
      className={`w-2 h-2 rounded-full ${
        priority === "high" ? "bg-red-500" : "bg-amber-500"
      }`}
    />
    <p className="text-white ml-5 flex-1">{title}</p>
    <div className="bg-slate-900 rounded-full px-6 py-1.5">
      <p className="text-slate-500 text-sm">{status}</p>
    </div>
    <p className="text-slate-500 text-sm ml-16 w-24">{dueDate}</p>
    <p className="text-slate-500 text-sm ml-16">{estimate}</p>
  </div>
);

const ProjectDetails = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      {/* Header Section */}
      <div className="flex items-start">
        <div>
          <h1 className="text-white text-2xl">Finance Dashboard</h1>
          <p className="text-slate-500 mt-1">2 Week MVP</p>
          <div className="bg-red-500 rounded-full px-4 py-1 mt-3 inline-block">
            <p className="text-white text-sm">5 days</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-5 ml-64">
          <StatCard
            title="SPRINT VELOCITY"
            value="8.5"
            subtext="tasks/week"
            trend="↑ 2.1 from last week"
          />
          <StatCard
            title="BURNDOWN"
            value="42h"
            subtext="remaining"
            trend="+3h over estimate"
          />
          <StatCard
            title="PROJECT HEALTH"
            value="At Risk"
            subtext="2 blockers identified"
            trend="Action required"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex mt-16 gap-10">
        {/* Left Panel */}
        <div className="flex-1">
          {/* Priority Tasks */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-white text-lg">Priority Tasks</h2>
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-full flex items-center gap-2">
                  <Plus size={16} /> Task
                </button>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-full flex items-center gap-2">
                  <ListTodo size={16} /> All Tasks
                </button>
              </div>
            </div>

            {/* Tasks Header */}
            <div className="bg-slate-800 rounded p-3 mb-4">
              <div className="grid grid-cols-4 text-slate-500 text-sm">
                <span>TASK</span>
                <span className="text-center">STATUS</span>
                <span className="text-center">DUE</span>
                <span className="text-center">EST.</span>
              </div>
            </div>

            {/* Task List */}
            <TaskRow
              priority="high"
              title="Bank Account Connection"
              status="In Progress"
              dueDate="Feb 12"
              estimate="16h"
            />
            <TaskRow
              priority="high"
              title="Transaction Sync Engine"
              status="Blocked"
              dueDate="Feb 14"
              estimate="8h"
            />
            <TaskRow
              priority="medium"
              title="Dashboard UI Components"
              status="Todo"
              dueDate="Feb 15"
              estimate="8h"
            />

            {/* Recent Activity */}
            <div className="mt-16">
              <h2 className="text-white text-lg mb-5">Recent Activity</h2>
              <div>
                <p className="text-slate-500 text-sm mb-3">TODAY</p>
                <p className="text-white mb-2">
                  • Started Bank Account Connection implementation
                </p>
                <p className="text-white mb-6">
                  • Updated security requirements
                </p>

                <p className="text-slate-500 text-sm mb-3">YESTERDAY</p>
                <p className="text-white">• Completed initial API setup</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80">
          {/* Luna AI Section */}
          <div>
            <h2 className="text-white text-lg mb-4">Luna AI</h2>
            <div className="bg-slate-800 rounded-lg p-5">
              <p className="text-white text-sm leading-relaxed">
                "I notice the Transaction Sync Engine is blocked. Need help
                resolving dependencies?"
              </p>
              <button className="mt-4 px-6 py-2 rounded-full border border-slate-500 text-slate-500 text-sm">
                Show Analysis →
              </button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="mt-12">
            <h2 className="text-white text-lg mb-4">Project Stats</h2>
            <div className="space-y-6">
              <div>
                <p className="text-slate-500 text-sm mb-2">COMPLETION</p>
                <p className="text-white">35% Complete</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-2">TIME TRACKED</p>
                <p className="text-white">28h of 70h</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-2">BLOCKED TASKS</p>
                <p className="text-white">1 task blocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
