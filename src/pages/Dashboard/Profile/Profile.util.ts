import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const homeNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/home",
    },
    {
      key: "profile",
      label: "Profile",
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
      key: "profile",
      label: "Profile",
      url: "/home",
    },
    {
      key: "edit",
      label: "Edit",
      url: "/home/edit",
    },
  ],
};

export const mockData = {
  researchInterests: [
    "Kidney Transplant",
    "Immunosuppression",
    "Post-transplantation immunosuppression",
  ],
  patientPopulations: ["Kidney failure", "Dialysis", "Diabetes"],
};
