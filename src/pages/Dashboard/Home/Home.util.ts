import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const homeNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "home",
      label: "Home",
      url: "/home",
    },
  ],
};

export const editHomeNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "home",
      label: "Home",
      url: "/home",
    },
    {
      key: "edit",
      label: "Edit",
      url: "/home/edit",
    },
  ],
};
