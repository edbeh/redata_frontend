import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const connectionsNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "connections",
      label: "Connections",
      url: "/connections",
    },
  ],
};
