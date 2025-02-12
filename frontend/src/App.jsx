import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/app/Home";
import LandingPage from "./pages/LandingPage";

// Project Creation Imports
import NewProject from "./pages/app/Projects/project-creation/NewProject";
import ScopeStack from "./pages/app/Projects/project-creation/ScopeStack";
import Blueprint from "./pages/app/Projects/project-creation/Blueprint";
import Build from "./pages/app/Projects/project-creation/Build";
import Validate from "./pages/app/Projects/project-creation/Validate";
import Launch from "./pages/app/Projects/project-creation/Launch";
import ProjectConfirmation from "./pages/app/Projects/project-creation/ProjectConfirmation";

// Projects
import ProjectsHome from "./pages/app/Projects/Home";

// Tasks
import Tasks from "./pages/app/Tasks/Home";

// Settings
import Settings from "./pages/app/Settings/Home";

// Auth imports
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing page without MainLayout */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes - without MainLayout */}
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* All other pages wrapped with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Home */}
          <Route path="/app/home" element={<Home />} />

          {/* Project Routes */}
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

          {/* Task Routes */}
          <Route path="/app/tasks" element={<Tasks />} />

          {/* Settings */}
          <Route path="/app/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
