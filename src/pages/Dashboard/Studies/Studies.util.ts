import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const studiesNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "studies",
      label: "Studies",
      url: "/studies",
    },
  ],
};

export const editStudyNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "studies",
      label: "Studies",
      url: "/studies",
    },
    {
      key: "edit",
      label: "Edit",
      url: "/studies/edit",
    },
  ],
};
