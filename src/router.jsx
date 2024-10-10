import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import WelcomeView from "./views/Auth/WelcomeView";
import RegisterView from "./views/Auth/RegisterView";
import ConfirmAccountView from "./views/Auth/ConfirmAccountView";
import RecoverAccountView from "./views/Auth/RecoverAccountView";

import DashboardView from "./views/Project/DashboardView";
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
          <Route path="/projects/:projectId" element={<ProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
