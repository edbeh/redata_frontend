import {
  ImgDocumentOutline,
  ImgHomeOutline,
  ImgSearchOutline,
  ImgSettingsOutline,
  ImgUserCircleOutline,
  ImgArrowUturnLeftOutline,
} from "assets";

import { INavigationItem } from "./LeftNavigation.model";

export const getNavigationItemsLimited = (): INavigationItem[] => {
  return [
    {
      key: "return",
      label: "Go Back",
      route: undefined,
      Icon: ImgArrowUturnLeftOutline,
    },
    {
      key: "settings",
      label: "Settings",
      route: "/settings",
      Icon: ImgSettingsOutline,
    },
  ];
};

export const getNavigationItems = (): INavigationItem[] => {
  return [
    {
      key: "home",
      label: "Home",
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
