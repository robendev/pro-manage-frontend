import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import WelcomeView from "./views/Auth/WelcomeView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<WelcomeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
