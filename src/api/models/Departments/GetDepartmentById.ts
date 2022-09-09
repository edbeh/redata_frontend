export declare module GetDepartmentById {
  export interface Datum {
    id: string;
    type: string;
    name: string;
  }

  export interface ApiResponse {
    data: Datum[];
  }
}
