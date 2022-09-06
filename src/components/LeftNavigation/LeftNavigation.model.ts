import { FunctionComponent, SVGProps } from "react";

export interface INavigationItem {
  key: string;
  label: string;
  route: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}
