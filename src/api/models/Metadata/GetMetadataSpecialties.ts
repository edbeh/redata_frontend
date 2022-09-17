export declare module GetMetadataSpecialties {
  export interface Datum {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface ApiResponse {
    data: Datum[];
  }
}
