import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex bg-[#0B1120]">
      <Navbar />
      <div className="flex-1 ml-64 transition-all duration-300 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
