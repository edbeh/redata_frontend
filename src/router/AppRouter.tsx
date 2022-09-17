import { Routes, Route, Navigate } from "react-router-dom";

import {
  Login,
  Register,
  Onboarding,
  Home,
  EditHome,
  Publications,
  EditPublications,
  Search,
  Connections,
  Settings,
  Profile,
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
        <Route path="/home/edit" element={<EditHome />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/publications/edit" element={<EditPublications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/profile/:id" element={<Profile />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
