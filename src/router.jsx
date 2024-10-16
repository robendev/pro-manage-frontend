import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import WelcomeView from "./views/Auth/WelcomeView";
import RegisterView from "./views/Auth/RegisterView";
import ConfirmAccountView from "./views/Auth/ConfirmAccountView";
import RecoverAccountView from "./views/Auth/RecoverAccountView";

import DashboardView from "./views/Project/DashboardView";
import NewProjectView from "./views/Project/NewProjectView";
import ProjectView from "./views/Project/ProjectView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index path="/" element={<WelcomeView />} />
          <Route path="/auth/create-account" element={<RegisterView />} />
          <Route path="/auth/confirm-account" element={<ConfirmAccountView />} />
          <Route path="/auth/recover-account" element={<RecoverAccountView />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/projects" element={<DashboardView />} />
          <Route path="/new-project" element={<NewProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectView />} />
          <Route path="/tasks" element={<h1>Tasks</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
