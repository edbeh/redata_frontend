import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const settingsNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "settings",
      label: "Settings",
      url: "/settings",
    },
  ],
};
