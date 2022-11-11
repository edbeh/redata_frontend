export declare module GetSearchPublications {
  export interface Designation {
    id: string;
    type: string;
    name: string;
  }

  export interface Department {
    id: string;
    type: string;
    name: string;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }

  export interface Datum {
    id: string;
    type: string;
    name: string;
    // designation: Designation;
    department: Department;
    institution: Institution;
    publicationTitle: string;
    publicationAuthors: string[];
    publicationSource: string;
    publicationVolume: string;
    publicationIssue: string;
    publicationPages: string;
    publicationPublishedAt: Date | string;
    publicationCount: number;
    image: string | null;
  }

  export interface ApiResponse {
    data: Datum[];
  }
}
