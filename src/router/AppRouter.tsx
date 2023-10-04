import { Routes, Route, Navigate } from "react-router-dom";

import {
  AdminLogin,
  AdminHome,
  AdminUserDetails,
  Login,
  FirstLoginChangePass,
  Register,
  Onboarding,
  Home,
  EditHome,
  Studies,
  EditResearch,
  Publications,
  EditPublications,
  Search,
  Connections,
  Settings,
  Profile,
  About,
  Sample,
  PageNotFound,
  AssumeAccount,
  AdminList,
  AdminDetails,
  AdminFirstLogin,
} from "pages";
import { PrivateRoute } from "wrapper-components";

const AppRouter = () => {
  const isApp = window.location.host.split(".")[0] === "app";
  const isAdmin = window.location.host.split(".")[0] === "admin";

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/login/first/:token" element={<AdminFirstLogin />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<AdminHome />} />
          <Route path="/users/:id" element={<AdminUserDetails />} />
          <Route path="/admins" element={<AdminList />} />
          <Route path="/admins/:id" element={<AdminDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  if (isApp) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/first/:token" element={<FirstLoginChangePass />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/sample" element={<Sample />} />
        <Route path="/assume" element={<AssumeAccount />} />

        <Route element={<PrivateRoute />}>
          <Route path="/onboarding/:step" element={<Onboarding />} />
          <Route path="/onboarding" element={<Navigate to="/onboarding/1" />} />

          <Route path="/home" element={<Home />} />
          <Route path="/home/edit" element={<EditHome />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/studies/edit" element={<EditResearch />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/edit" element={<EditPublications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<About />} />
    </Routes>
  );
};

export default AppRouter;
