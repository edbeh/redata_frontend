import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const publicationsNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/",
    },
    {
      key: "publications",
      label: "Publications",
      url: "/publications",
    },
  ],
};
