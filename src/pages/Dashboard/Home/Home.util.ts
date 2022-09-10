import { IBreadCrumbs } from "components/BreadCrumbs/BreadCrumbs.model";

export const homeNav: IBreadCrumbs = {
  breadcrumbs: [
    {
      key: "dashboard",
      label: "Dashboard",
      url: "/",
    },
    {
      key: "profile",
      label: "Profile",
      url: "/home",
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
  pubmedNames: ["Koh MS", "Mariko Koh", "Koh Mariko"],
};
