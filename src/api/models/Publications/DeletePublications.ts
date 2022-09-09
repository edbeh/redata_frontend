import { Publication } from "./Publication";

export declare module DeletePublications {
  export interface PayLoad {
    ids: string[];
  }

  export interface ApiResponse {
    data: Publication[];
  }
}
