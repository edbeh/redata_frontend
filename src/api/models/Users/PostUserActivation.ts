export declare module PostUserActivation {
  export interface PayLoad {
    token: string;
    name: string;
    password: string;
    passwordConfirmation: string;
  }

  export interface ApiResponse {
    data: Data;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    acknowledgedAt?: any;
    image: string;
    institution: Institution;
    designation?: any;
    department: Institution;
    primarySpecialty?: any;
    otherSpecialties: any[];
    researchInterests: any[];
    patientPools: any[];
    email: string;
    bio?: any;
    correctedPubmedNames: any[];
    googleScholar?: any;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}
