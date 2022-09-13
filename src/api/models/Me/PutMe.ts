import { FormSelectModel } from "models";

export declare module PutMe {
  export interface PayLoad {
    name?: string;
    email?: string;
    institution?: string;
    designation?: string;
    department?: string;
    pubmedNames?: string[];
    correctedPubmedNames?: string[];
  }

  export interface Data {
    id: string;
    type: string;
    name?: string;
    email: string;
    institution: FormSelectModel;
    designation?: FormSelectModel;
    department?: string;
    pubmedNames: string[];
    correctedPubmedNames: string[];
  }

  export interface ApiResponse {
    data: Data;
  }
}
