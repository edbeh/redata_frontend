type Crumbs = {
  key: string;
  label: string;
  url: string;
};

export interface IBreadCrumbs {
  breadcrumbs: Crumbs[];
}
