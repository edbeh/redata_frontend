import { Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Register,
  Onboarding,
  Home,
  Publications,
  Search,
  Settings,
} from "pages";
import { PrivateRoute } from "wrapper-components";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/onboarding/:step" element={<Onboarding />} />
        <Route path="/onboarding" element={<Navigate to="/onboarding/1" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
