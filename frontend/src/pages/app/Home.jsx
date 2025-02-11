import { Circle } from "lucide-react";
import PropTypes from "prop-types";
import Navbar from "../../components/layouts/Navbar";

const StatsCard = ({ title, value }) => (
  <div className="bg-[#171E2E] rounded-lg p-6">
    <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
    <p className="text-4xl text-white font-semibold">{value}</p>
  </div>
);

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Home = () => {
  return (
    <div className="p-8 bg-[#0B1120] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl text-white font-semibold mb-8">
        Welcome back, Alex
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <StatsCard title="Active Projects" value="3" />
        <StatsCard title="Tasks Due Today" value="12" />
        <StatsCard title="Risks" value="5" />
      </div>

      {/* Project Timeline */}
      <div className="mb-12">
        <h2 className="text-xl text-white font-semibold mb-4">
          Project Timeline
        </h2>
        <div className="bg-[#171E2E] rounded-lg p-6">
          <div className="space-y-4">
            <div className="bg-blue-500/20 h-6 rounded-full w-3/4" />
            <div className="bg-blue-500/20 h-6 rounded-full w-full" />
            <div className="bg-blue-500/20 h-6 rounded-full w-1/2" />
          </div>
        </div>
      </div>

      {/* Luna AI Assistant */}
      <div>
        <h2 className="text-xl text-white font-semibold mb-4">
          Luna AI Assistant
        </h2>
        <div className="bg-[#171E2E] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Luna AI</span>
          </div>

          <div className="bg-[#1F2937] rounded-lg p-4 text-gray-300 mb-4">
            How can I help with your projects today?
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ask Luna anything about your projects..."
              className="w-full bg-[#1F2937] text-gray-300 rounded-lg px-4 py-3 border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
