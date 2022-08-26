export declare module ApiSubmitUserModel {
  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    pubmedNames: any[];
  }

  export interface ApiResponse {
    data: Data;
  }
}
