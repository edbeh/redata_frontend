export declare module GetMe {
  export interface Institution {
    id: string;
    type: string;
    name: string;
  }

  export interface Data {
    id: string;
    type: string;
    name?: any;
    email: string;
    institution: Institution;
    designation?: any;
    department?: any;
    pubMedNames: any[];
  }

  export interface ApiResponse {
    data: Data;
  }
}
