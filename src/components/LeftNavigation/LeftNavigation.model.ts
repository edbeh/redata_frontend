import { FunctionComponent, SVGProps } from "react";

export interface INavigationItem {
  key: string;
  label: string;
  route: string | undefined;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}
