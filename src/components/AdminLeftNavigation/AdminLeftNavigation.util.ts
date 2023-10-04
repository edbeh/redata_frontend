import {
  ImgHomeOutline,
  ImgSignOutOutline,
  ImgUserCircleOutline,
} from "assets";

import { IAdminLeftNavigationItem } from "./AdminLeftNavigation.model";

export const adminLeftNavigationItems: IAdminLeftNavigationItem[] = [
  {
    name: "home",
    text: "Home",
    path: "/home",
    Icon: ImgHomeOutline,
  },
  {
    name: "admins",
    text: "Admins",
    path: "/admins",
    Icon: ImgUserCircleOutline,
  },
  {
    name: "logout",
    text: "Logout",
    path: undefined,
    Icon: ImgSignOutOutline,
  },
];
