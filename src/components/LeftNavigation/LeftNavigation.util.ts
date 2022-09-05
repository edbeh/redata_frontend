import {
  ImgDocumentOutline,
  ImgHomeOutline,
  ImgSearchOutline,
  ImgSettingsOutline,
} from "assets";

import { INavigationItem } from "./LeftNavigation.model";

export const getNavigationItems = (): INavigationItem[] => {
  return [
    {
      key: "profile",
      label: "Profile",
      Icon: ImgHomeOutline,
    },
    {
      key: "publications",
      label: "Publications",
      Icon: ImgDocumentOutline,
    },
    {
      key: "search",
      label: "Search",
      Icon: ImgSearchOutline,
    },
    {
      key: "settings",
      label: "Settings",
      Icon: ImgSettingsOutline,
    },
  ];
};
