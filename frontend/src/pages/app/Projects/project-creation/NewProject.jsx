import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Kanban,
  Palette,
  Github,
  Smartphone,
  Upload,
  ArrowRight,
} from "lucide-react";

const DocumentOption = ({ icon: Icon, title, onUpload }) => (
  <button 
    className="w-full p-4 bg-slate-800 rounded-lg mb-4 text-left hover:bg-slate-700 transition-colors"
    onClick={onUpload}
  >
    <div className="flex items-center space-x-3">
      <Icon className="text-slate-400" size={20} />
      <span className="text-white">{title}</span>
    </div>
  </button>
);

const RecentFile = ({ filename, uploadTime }) => (
  <div className="bg-slate-800 p-4 rounded-lg">
    <p className="text-white text-sm">{filename}</p>
    <p className="text-slate-400 text-xs mt-1">{uploadTime}</p>
  </div>
);

const QuickOption = ({ text }) => (
  <button className="px-4 py-1.5 bg-slate-900 text-slate-400 rounded-full text-sm hover:bg-slate-800 transition-colors">
    {text}
  </button>
);

const Message = ({ isAi, children }) => (
  <div className="mb-6">
    {isAi && (
      <div className="flex items-center mb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2" />
        <span className="text-slate-400 text-sm">Luna AI</span>
      </div>
    )}
    <div className={`p-4 rounded-lg ${isAi ? "bg-slate-800" : "bg-slate-900"}`}>
      {children}
    </div>
  </div>
);

const ContextItem = ({ title, items }) => (
  <div className="mb-6">
    <h3 className="text-slate-400 text-sm mb-2">{title}</h3>
    <div className="bg-slate-800 p-4 rounded-lg">
      {items.map((item, index) => (
        <p key={index} className="text-white text-sm mb-2 last:mb-0">
          {item}
        </p>
      ))}
    </div>
  </div>
);

const NewProject = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [recentFile, setRecentFile] = useState(null);

  const handleContinue = () => {
    navigate("/app/project-creation/scope-stack");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus('uploading');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('success');
        setRecentFile({
          filename: file.name,
          uploadTime: 'Uploaded just now'
        });
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    }
  };

  const handleProductRequirementsClick = () => {
    fileInputRef.current?.click();
  };

  const documentTypes = [
    { icon: FileText, title: "📄 Notion / Google Docs" },
    { 
      icon: Kanban, 
      title: "📋 Product Requirements",
      onUpload: handleProductRequirementsClick 
    },
    { icon: Palette, title: "🎨 Figma / Designs" },
    { icon: Github, title: "💻 GitHub / CodeBase" },
    { icon: Smartphone, title: "📱 Client Brief / Scope" },
  ];

  const techStacks = ["T3 Stack", "Next.js + Supabase", "Next + Prisma"];

  return (
    <div className="flex h-screen bg-slate-950 p-6 gap-6">
      {/* Left Panel - Document Upload */}
      <div className="w-64 bg-slate-900 rounded-lg p-4 relative">
        <h2 className="text-white text-lg mb-6">Add Context</h2>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".doc,.docx,.pdf,.txt,.md"
        />

        {/* Document Type Options */}
        <div className="mb-8">
          {documentTypes.map((doc, index) => (
            <DocumentOption key={index} {...doc} />
          ))}
        </div>

        {/* Upload Status */}
        {uploadStatus && (
          <div className={`mt-2 text-sm ${
            uploadStatus === 'uploading' ? 'text-blue-400' :
            uploadStatus === 'success' ? 'text-green-400' :
            'text-red-400'
          }`}>
            {uploadStatus === 'uploading' ? 'Uploading...' :
             uploadStatus === 'success' ? 'Upload successful!' :
             'Upload failed'}
          </div>
        )}

        {/* Divider */}
        <p className="text-slate-400 text-sm mb-6">or paste URL/text</p>

        {/* Recent Files */}
        <div className="mb-20">
          <h3 className="text-slate-400 text-sm mb-3">Recent</h3>
          {recentFile ? (
            <RecentFile
              filename={recentFile.filename}
              uploadTime={recentFile.uploadTime}
            />
          ) : (
            <div className="text-slate-400 text-sm">No recent uploads</div>
          )}
        </div>

        {/* Continue Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-between transition-colors"
          >
            <span className="font-medium">Continue to Scope</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-slate-900 rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-white text-xl mb-2">New Project</h1>
          <p className="text-slate-400">
            Let's ship your idea at hyperspeed 🚀
          </p>
        </div>

        {/* Chat Messages */}
        <div className="space-y-6 mb-6">
          <Message isAi>
            <p className="text-white mb-2">
              I noticed you uploaded a Notion spec. Want me to analyze that
              first,
            </p>
            <p className="text-slate-400">
              or would you prefer to describe the core idea in your own words?
            </p>
          </Message>

          <Message>
            <p className="text-white">
              Let me describe it first - I'm building a financial dashboard for
              indie hackers. The spec has more details but that's the core idea.
            </p>
          </Message>

          <Message isAi>
            <p className="text-white mb-4">
              Got it! Let's move fast. Quick questions to scope this:
            </p>

            <div className="space-y-2 mb-4">
              <button className="w-full p-2 bg-slate-900 text-white rounded text-left hover:bg-slate-800 transition-colors">
                Launch target: 2 weeks or 4 weeks?
              </button>
              <button className="w-full p-2 bg-slate-900 text-white rounded text-left hover:bg-slate-800 transition-colors">
                Tech stack preference? I can suggest some fast options.
              </button>
              <button className="w-full p-2 bg-slate-900 text-white rounded text-left hover:bg-slate-800 transition-colors">
                Must-have feature for launch?
              </button>
            </div>

            <div>
              <p className="text-slate-400 text-sm mb-2">
                Popular fast-ship stacks:
              </p>
              <div className="flex gap-2">
                {techStacks.map((stack, index) => (
                  <QuickOption key={index} text={stack} />
                ))}
              </div>
            </div>
          </Message>
        </div>

        {/* Input Area */}
        <div className="bg-slate-800 rounded-lg p-4">
          <input
            type="text"
            placeholder="Type your response..."
            className="w-full bg-transparent text-slate-400 placeholder-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Right Context Panel */}
      <div className="w-60 bg-slate-900 rounded-lg p-4">
        <h2 className="text-white text-lg mb-6">Project Context</h2>

        <ContextItem
          title="From Your Spec:"
          items={[
            "• Financial Dashboard",
            "• Target: Indie Hackers",
            "• Revenue Tracking",
            "• 2 Figma Screens",
          ]}
        />

        <ContextItem
          title="Recent Fast Ships"
          items={[
            "SaaS Analytics MVP",
            "2 week build • T3 Stack",
            "3 core features shipped",
          ]}
        />

        <ContextItem
          title="Build Tools"
          items={[
            "Recommended:",
            "• Vercel Deploy",
            "• Stripe Integration",
            "• Auth.js",
            "• SQL or Prisma",
          ]}
        />
      </div>
    </div>
  );
};

export default NewProject;
