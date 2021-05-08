export interface AuthResponse {
    status: boolean,
    message: string,
    uid?: string,
    username?: string,
    token?: string
}