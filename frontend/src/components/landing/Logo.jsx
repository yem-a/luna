import React from "react";
import { Brain } from "lucide-react";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="p-1.5 bg-blue-400/10 rounded-lg">
      <Brain className="w-6 h-6 text-blue-400" />
    </div>
    <span className="text-white text-xl font-semibold">Luna</span>
  </div>
);

export default Logo;
