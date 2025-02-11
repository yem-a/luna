import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/app/Home";
import LandingPage from "./pages/LandingPage";
import NewProject from "./pages/app/Projects/project-creation/NewProject";
import ScopeStack from "./pages/app/Projects/project-creation/ScopeStack";
import Blueprint from "./pages/app/Projects/project-creation/Blueprint";
import Build from "./pages/app/Projects/project-creation/Build";
import Validate from "./pages/app/Projects/project-creation/Validate";
import Launch from "./pages/app/Projects/project-creation/Launch";
import ProjectConfirmation from "./pages/app/Projects/project-creation/ProjectConfirmation";
import ProjectsHome from "./pages/app/projects/Home"; // Import existing Home component
import Tasks from "./pages/app/Tasks/Home";
import Settings from "./pages/app/Settings/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page without MainLayout */}
        <Route path="/" element={<LandingPage />} />

        {/* All other pages wrapped with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/app/home" element={<Home />} />

          {/* Project Routes - both pointing to the same component */}
          <Route path="/app/projects" element={<ProjectsHome />} />
          <Route path="/app/projects/home" element={<ProjectsHome />} />

          {/* Project Creation Flow */}
          <Route path="/app/project-creation/new" element={<NewProject />} />
          <Route
            path="/app/project-creation/scope-stack"
            element={<ScopeStack />}
          />
          <Route
            path="/app/project-creation/blueprint"
            element={<Blueprint />}
          />
          <Route path="/app/project-creation/build" element={<Build />} />
          <Route path="/app/project-creation/validate" element={<Validate />} />
          <Route path="/app/project-creation/launch" element={<Launch />} />
          <Route
            path="/app/project-creation/confirmation"
            element={<ProjectConfirmation />}
          />

          {/* Other App Routes */}
          <Route path="/app/tasks" element={<Tasks />} />
          <Route path="/app/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
