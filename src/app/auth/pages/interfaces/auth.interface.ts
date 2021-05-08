export interface AuthResponse {
    status: boolean;
    message: string;
    uid?: string;
    username?: string;
    token?: string;
    email?: string;
}

export interface User {
    uid: string;
    username: string;
    email: string;
}