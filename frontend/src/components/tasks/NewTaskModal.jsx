import React, { useEffect, useState } from "react";

const NewTaskModal = ({
  isOpen,
  onClose,
  onSave,
  projects = [], // Array of projects: [{ id: string, name: string }]
}) => {
  const [task, setTask] = useState({
    projectId: "",
    title: "",
    description: "",
    priority: "MUST_HAVE",
    timeEstimate: "",
    confidenceLevel: "HIGH",
    riskLevel: "MEDIUM",
    riskDescription: "",
    mitigationStrategy: "",
    dependencies: [],
    tags: [],
  });

  // Handle form changes
  const handleChange = (field, value) => {
    setTask((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!task.projectId) {
      alert("Please select a project first");
      return;
    }
    onSave(task);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-[1000px] bg-slate-900 rounded-xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl text-white font-sans mb-1">Create New Task</h1>
          <p className="text-slate-400 text-sm">Add a task to your project</p>
        </div>

        {/* Project Selection */}
        <div className="mb-6 bg-slate-800 p-4 rounded-lg">
          <label className="block text-slate-400 text-xs mb-2">
            SELECT PROJECT
          </label>
          <select
            className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
            value={task.projectId}
            onChange={(e) => handleChange("projectId", e.target.value)}
            required
          >
            <option value="">Choose a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {task.projectId ? (
          <>
            {/* Core Details */}
            <div className="space-y-4 mb-6">
              {/* Title */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  TITLE
                </label>
                <div className="bg-slate-800 rounded-lg p-2">
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full bg-transparent text-white text-sm focus:outline-none"
                    placeholder="Enter task title"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  DESCRIPTION
                </label>
                <div className="bg-slate-800 rounded-lg p-2">
                  <textarea
                    value={task.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={2}
                    className="w-full bg-transparent text-white text-sm focus:outline-none resize-none"
                    placeholder="Enter task description"
                  />
                </div>
              </div>
            </div>

            {/* Priority & Estimates + Risk Assessment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Priority & Estimates */}
              <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                {/* Priority */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    PRIORITY
                  </label>
                  <select
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                    value={task.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                  >
                    <option value="MUST_HAVE">MUST_HAVE</option>
                    <option value="SHOULD_HAVE">SHOULD_HAVE</option>
                    <option value="COULD_HAVE">COULD_HAVE</option>
                    <option value="WONT_HAVE">WON'T_HAVE</option>
                  </select>
                </div>

                {/* Time Estimate */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    TIME ESTIMATE
                  </label>
                  <input
                    type="text"
                    value={task.timeEstimate}
                    onChange={(e) =>
                      handleChange("timeEstimate", e.target.value)
                    }
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                    placeholder="Enter time estimate"
                  />
                </div>

                {/* Confidence */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    CONFIDENCE LEVEL
                  </label>
                  <select
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                    value={task.confidenceLevel}
                    onChange={(e) =>
                      handleChange("confidenceLevel", e.target.value)
                    }
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-slate-800 rounded-lg p-4 space-y-4">
                {/* Risk Level */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    RISK LEVEL
                  </label>
                  <select
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                    value={task.riskLevel}
                    onChange={(e) => handleChange("riskLevel", e.target.value)}
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                {/* Risk Description */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    RISK DESCRIPTION
                  </label>
                  <textarea
                    value={task.riskDescription}
                    onChange={(e) =>
                      handleChange("riskDescription", e.target.value)
                    }
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 resize-none focus:outline-none"
                    rows={2}
                    placeholder="Describe potential risks"
                  />
                </div>

                {/* Mitigation */}
                <div>
                  <label className="block text-slate-400 text-xs mb-1">
                    MITIGATION STRATEGY
                  </label>
                  <textarea
                    value={task.mitigationStrategy}
                    onChange={(e) =>
                      handleChange("mitigationStrategy", e.target.value)
                    }
                    className="w-full bg-slate-900 text-white text-sm rounded-md p-2 resize-none focus:outline-none"
                    rows={2}
                    placeholder="Describe risk mitigation strategy"
                  />
                </div>
              </div>
            </div>

            {/* Dependencies & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Dependencies */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  DEPENDENCIES
                </label>
                <input
                  type="text"
                  value={task.dependencies.join(", ")}
                  onChange={(e) =>
                    handleChange(
                      "dependencies",
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  className="w-full bg-slate-800 text-white text-sm rounded-lg p-2 focus:outline-none"
                  placeholder="Enter dependencies (comma-separated)"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  TAGS
                </label>
                <input
                  type="text"
                  value={task.tags.join(", ")}
                  onChange={(e) =>
                    handleChange(
                      "tags",
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  className="w-full bg-slate-800 text-white text-sm rounded-lg p-2 focus:outline-none"
                  placeholder="Enter tags (comma-separated)"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-slate-400">
            Please select a project to start creating a task
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-slate-800 text-slate-400 px-4 py-2 text-sm rounded-full hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!task.projectId}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              task.projectId
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskModal;
