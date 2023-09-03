export declare module GetUserByAdminById {
  export interface ApiResponse {
    data: Data;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    image: string;
    institution: Institution;
    designation: Institution;
    department: Institution;
    primarySpecialty: PrimarySpecialty;
    otherSpecialties: any[];
    researchInterests: PrimarySpecialty[];
    patientPools: PrimarySpecialty[];
    email: string;
    bio?: any;
    correctedPubmedNames: string[];
    acknowledgedAt?: any;
    googleScholar: GoogleScholar;
    assumeAccountLink: string;
  }

  export interface GoogleScholar {
    id: string;
    type: string;
    url: string;
    name: string;
    table: Table[];
    graph: Graph[];
  }

  export interface Graph {
    year: string;
    citations: string;
  }

  export interface Table {
    citations?: Citations;
    "h-index"?: Citations;
    "i10-index"?: Citations;
  }

  export interface Citations {
    all: string;
    since_2018: string;
  }

  export interface PrimarySpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}
