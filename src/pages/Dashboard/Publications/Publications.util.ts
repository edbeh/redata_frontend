import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const publicationsNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "publications",
      label: "Publications",
      url: "/publications",
    },
  ],
};

export const editPublicationsNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "publications",
      label: "Publications",
      url: "/publications",
    },
    {
      key: "edit",
      label: "Edit",
      url: "/publications/edit",
    },
  ],
};
