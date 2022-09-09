import { Publication } from "./Publication";

export declare module PostPublicationsFromPubMed {
  export interface PayLoad {
    ids: string[];
    source: string;
  }

  export interface ApiResponse {
    data: Publication[];
  }
}
