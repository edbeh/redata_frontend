export declare module ApiSubmitSessionModel {
  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    pubmedNames: any[];
  }

  export interface ApiResponse {
    jwt: string;
    data: Data;
  }
}
