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

export const mockData = {
  publications: [
    {
      title:
        "Managing asthma in the COVID-19 pandemic and current recommendations from professional bodies: a review.",
      sortpubdate: "2021/11/01 00:00",
      source: "J Asthma",
      authors: [
        {
          name: "Ong KY",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Tan TL",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Chan AKW",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Tan KLL",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Koh MS",
          authtype: "Author",
          clusterid: "",
        },
      ],
      sortfirstauthor: "Ong KY",
      uid: "34007830",
      volume: "58",
      issue: "11",
      pages: "1536-1543",
      pubtype: ["Journal Article", "Review"],
      elocationid: "doi: 10.1080/02770903.2020.1804578",
    },
    {
      title:
        "Patient characterization and predictors of aspirin desensitization response.",
      sortpubdate: "2021/04/27 00:00",
      source: "Asia Pac Allergy",
      authors: [
        {
          name: "Cheong Z",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Tan CYL",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Lim CP",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Soong JL",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Chong CJM",
          authtype: "Author",
          clusterid: "",
        },
        {
          name: "Chan AKW",
          authtype: "Author",
          clusterid: "",
        },
      ],
      sortfirstauthor: "Cheong Z",
      uid: "32779943",
      volume: "11",
      issue: "2",
      pages: "e20",
      pubtype: ["Journal Article"],
      elocationid: "doi: 10.5415/apallergy.2021.11.e20",
    },
  ],
};
