type Author = {
  name: string;
  authtype: string;
  clusterid: string;
};

export type Publication = {
  title: string;
  sortpubdate: string;
  source: string;
  authors: Author[];
  sortfirstauthor: string;
  uid: string;
  volume: string;
  issue: string;
  pages: string;
  pubtype: string[];
  elocationid: string;
};
