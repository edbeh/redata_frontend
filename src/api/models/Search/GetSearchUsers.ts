export declare module GetSearchUsers {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    image: string;
    institution: Institution;
    userDepartments: UserDepartment[];
    designation: Institution;
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
