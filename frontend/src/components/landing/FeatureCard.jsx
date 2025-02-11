import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 rounded-lg bg-slate-900/50 flex flex-col items-center text-center">
    <Icon className="w-8 h-8 text-blue-400 mb-4" />
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </div>
);

export default FeatureCard;
