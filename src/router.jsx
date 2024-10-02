import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import WelcomeView from "./views/Auth/WelcomeView";
import RegisterView from "./views/Auth/RegisterView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index path="/" element={<WelcomeView />} />
          <Route path="/auth/create-account" element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
