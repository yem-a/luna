import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";

const UpdateTaskModal = ({
  isOpen,
  onClose,
  onSave,
  task = {
    id: "",
    title: "",
    status: "IN_PROGRESS",
    priority: "MUST_HAVE",
    timeEstimate: "",
    description: "",
    riskLevel: "MEDIUM",
    riskDescription: "",
    mitigationStrategy: "",
    dependencies: [],
    tags: [],
    lastUpdated: new Date().toISOString(),
  },
}) => {
  const [taskData, setTaskData] = useState(task);
  const [aiMessage, setAiMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "How would you like to update this task? I can help you modify any details or update the progress.",
    },
  ]);

  useEffect(() => {
    setTaskData(task);
  }, [task]);

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

  const handleChange = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleSave = () => {
    onSave(taskData);
    onClose();
  };

  const handleAiChat = (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    setChatMessages((prev) => [...prev, { role: "user", content: aiMessage }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've noted your request: "${aiMessage}". Would you like me to make any other changes?`,
        },
      ]);
    }, 500);
    setAiMessage("");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        className="flex w-full max-w-4xl bg-slate-900 rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Form Section */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl text-white font-semibold mb-1">
              Update Task
            </h1>
            <p className="text-slate-400 text-xs">ID: {taskData.id}</p>
          </div>

          {/* Core Details */}
          <div className="space-y-4 mb-6">
            {/* Title */}
            <div>
              <label className="block text-slate-400 text-xs mb-1">TITLE</label>
              <input
                type="text"
                value={taskData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-slate-800 rounded-lg p-2 text-white text-sm focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-400 text-xs mb-1">
                DESCRIPTION
              </label>
              <textarea
                value={taskData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={2}
                className="w-full bg-slate-800 rounded-lg p-2 text-white text-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Left Column */}
            <div className="bg-slate-800 rounded-lg p-4 space-y-4">
              {/* Priority */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  PRIORITY
                </label>
                <select
                  value={taskData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
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
                  value={taskData.timeEstimate}
                  onChange={(e) => handleChange("timeEstimate", e.target.value)}
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  STATUS
                </label>
                <select
                  value={taskData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
                >
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-slate-800 rounded-lg p-4 space-y-4">
              {/* Risk Level */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  RISK LEVEL
                </label>
                <select
                  value={taskData.riskLevel}
                  onChange={(e) => handleChange("riskLevel", e.target.value)}
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 focus:outline-none"
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
                  value={taskData.riskDescription}
                  onChange={(e) =>
                    handleChange("riskDescription", e.target.value)
                  }
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 resize-none focus:outline-none"
                  rows={2}
                />
              </div>

              {/* Mitigation */}
              <div>
                <label className="block text-slate-400 text-xs mb-1">
                  MITIGATION STRATEGY
                </label>
                <textarea
                  value={taskData.mitigationStrategy}
                  onChange={(e) =>
                    handleChange("mitigationStrategy", e.target.value)
                  }
                  className="w-full bg-slate-900 text-white text-sm rounded-md p-2 resize-none focus:outline-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Dependencies & Tags */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Dependencies */}
            <div>
              <label className="block text-slate-400 text-xs mb-1">
                DEPENDENCIES
              </label>
              <input
                type="text"
                value={taskData.dependencies.join(", ")}
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
              <label className="block text-slate-400 text-xs mb-1">TAGS</label>
              <input
                type="text"
                value={taskData.tags.join(", ")}
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

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-400 text-sm rounded-full hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* AI Chat Interface */}
        <div className="w-64 bg-slate-800 rounded-r-xl flex flex-col">
          {/* Chat Header */}
          <div className="p-3 bg-slate-900 rounded-tr-xl border-b border-slate-700">
            <h2 className="text-white text-sm font-medium">
              Luna AI Assistant
            </h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[180px] ${
                  message.role === "assistant"
                    ? "bg-slate-900 text-white"
                    : "bg-blue-500 text-white ml-auto"
                } rounded-lg p-2`}
              >
                <p className="text-xs">{message.content}</p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleAiChat}
            className="p-3 border-t border-slate-700"
          >
            <div className="relative">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="w-full bg-slate-900 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none"
                placeholder="Type your update here..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
