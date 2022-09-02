export declare module PostSession {
  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    pubMedNames: any[];
  }

  export interface ApiResponse {
    jwt: string;
    data: Data;
  }
}
