export module GetPendingUsersByAdmin {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    email: string;
    invitedAt: string;
  }
}
