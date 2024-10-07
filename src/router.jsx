import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import WelcomeView from "./views/Auth/WelcomeView";
import RegisterView from "./views/Auth/RegisterView";
import ConfirmAccountView from "./views/Auth/ConfirmAccountView";
import RecoverAccountView from "./views/Auth/RecoverAccountView";

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
