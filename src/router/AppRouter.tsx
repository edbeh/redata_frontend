import { Routes, Route, Navigate } from "react-router-dom";

import { Login, Register, Onboarding } from "pages";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding/:step" element={<Onboarding />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
