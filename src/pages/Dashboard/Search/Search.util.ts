import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const searchNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/",
    },
    {
      key: "search",
      label: "Search",
      url: "/search",
    },
  ],
};
