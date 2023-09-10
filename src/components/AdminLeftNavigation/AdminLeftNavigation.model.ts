export interface IAdminLeftNavigationItem {
  name: string;
  text: string;
  path: string | undefined;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
