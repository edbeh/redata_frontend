export declare module GetSearchPublications {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    image: string;
    institution: Institution;
    designation: Institution;
    departments: Institution[];
    publicationTitle: string;
    publicationAuthors: string[];
    publicationSource: string;
    publicationVolume: string;
    publicationIssue: string;
    publicationPages: string;
    publicationPublishedAt: string;
    publicationCount: number;
  }

  export interface UserDepartment {
    id: string;
    type: string;
    designation?: Institution | Institution;
    department: Institution;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}
