export declare module GetConnections {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    role: string;
    acknowledgedAt?: string;
    image: string;
    institution: Institution;
    designation?: Institution;
    userDepartments: UserDepartment[];
    primarySpecialty?: PrimarySpecialty;
    otherSpecialties: PrimarySpecialty[];
    researchInterests: PrimarySpecialty[];
    patientPools: PrimarySpecialty[];
  }

  export interface PrimarySpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface UserDepartment {
    id: string;
    type: string;
    designation?: Institution;
    department: Institution;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}
