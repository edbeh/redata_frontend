import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const researchNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "research",
      label: "Research",
      url: "/research",
    },
  ],
};

export const editResearchNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "research",
      label: "Research",
      url: "/research",
    },
    {
      key: "edit",
      label: "Edit",
      url: "/research/edit",
    },
  ],
};
