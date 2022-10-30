import {
  ImgDocumentOutline,
  ImgHomeOutline,
  ImgSearchOutline,
  ImgUserCircleOutline,
  ImgArrowUturnLeftOutline,
  ImgSignOutOutline,
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
      key: "logout",
      label: "Logout",
      route: undefined,
      Icon: ImgSignOutOutline,
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
      label: "Colleagues",
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
      key: "logout",
      label: "Logout",
      route: undefined,
      Icon: ImgSignOutOutline,
    },
  ];
};
