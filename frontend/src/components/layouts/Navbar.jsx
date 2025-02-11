import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FolderKanban,
  CheckSquare,
  Settings,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`bg-[#171E2E] h-screen fixed left-0 top-0 transition-all duration-300 border-r border-gray-800
       ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-[#171E2E] rounded-full p-1 border border-gray-800"
      >
        {isCollapsed ? (
          <ChevronRight size={16} className="text-gray-400" />
        ) : (
          <ChevronLeft size={16} className="text-gray-400" />
        )}
      </button>

      {/* Content */}
      <div className="p-4 space-y-8">
        {/* Logo */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link to="/app/home" className="text-xl font-bold text-white">
            {isCollapsed ? "L" : "Luna"}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            to="/app/home"
            className={`flex items-center text-gray-400 hover:text-white hover:bg-[#262F40] p-2 rounded-md transition-colors
              ${isCollapsed ? "justify-center" : "justify-start space-x-2"}`}
          >
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>
          <Link
            to="/app/projects"
            className={`flex items-center text-gray-400 hover:text-white hover:bg-[#262F40] p-2 rounded-md transition-colors
              ${isCollapsed ? "justify-center" : "justify-start space-x-2"}`}
          >
            <FolderKanban size={20} />
            {!isCollapsed && <span>Projects</span>}
          </Link>
          <Link
            to="/app/tasks"
            className={`flex items-center text-gray-400 hover:text-white hover:bg-[#262F40] p-2 rounded-md transition-colors
              ${isCollapsed ? "justify-center" : "justify-start space-x-2"}`}
          >
            <CheckSquare size={20} />
            {!isCollapsed && <span>Tasks</span>}
          </Link>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Link
            to="/app/project-creation/new"
            className={`flex items-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors p-2
              ${
                isCollapsed
                  ? "justify-center w-12 mx-auto"
                  : "justify-start space-x-2 w-full"
              }`}
          >
            <PlusCircle size={20} />
            {!isCollapsed && <span>New Project</span>}
          </Link>

          <Link
            to="/app/settings"
            className={`flex items-center text-gray-400 hover:text-white hover:bg-[#262F40] p-2 rounded-md mt-2 transition-colors
              ${isCollapsed ? "justify-center" : "justify-start space-x-2"}`}
          >
            <Settings size={20} />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
