export declare module GetMe {
  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    institution?: any;
    designation?: any;
    department?: any;
    pubmedNames: any[];
  }

  export interface ApiResponse {
    data: Data;
  }
}
