export declare module PostUser {
  export interface PayLoad {
    name: string;
    email: string;
    institutionId: string;
    password: string;
    passwordConfirmation: string;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    pubMedNames: any[];
  }

  export interface ApiResponse {
    data: Data;
  }
}
