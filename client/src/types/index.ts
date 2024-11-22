export interface User {
    id: string;
    email: string;
    fullName: string;
    token: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    message: string;
    user?: User;
    users?: User[];
    error?: string;
  }
  