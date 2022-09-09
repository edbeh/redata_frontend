export interface Publication {
  id: string;
  type: string;
  title: string;
  source: string;
  pubType: string[];
  authors: string[];
  sortFirstAuthor: string;
  elocationId: string;
  publishedAt: Date;
  volume: string;
  issue: string;
  pages: string;
  apiSource: string;
  externalId: string;
}
