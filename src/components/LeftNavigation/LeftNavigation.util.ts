import {
  ImgDocumentOutline,
  ImgHomeOutline,
  ImgSearchOutline,
  ImgSettingsOutline,
  ImgUserCircleOutline,
} from "assets";

import { INavigationItem } from "./LeftNavigation.model";

export const getNavigationItems = (): INavigationItem[] => {
  return [
    {
      key: "profile",
      label: "Profile",
      route: "/home",
      Icon: ImgHomeOutline,
    },
    {
      key: "publications",
      label: "Publications",
      route: "/publications",
      Icon: ImgDocumentOutline,
    },
    {
      key: "connections",
      label: "Connections",
      route: "/connections",
      Icon: ImgUserCircleOutline,
    },
    {
      key: "search",
      label: "Search",
      route: "/search",
      Icon: ImgSearchOutline,
    },

    {
      key: "settings",
      label: "Settings",
      route: "/settings",
      Icon: ImgSettingsOutline,
    },
  ];
};
