export interface SignInResponse {
  username: string;
  password: string;
}
export interface SignInRequest {
  accessToken: string;
  refreshToken: string;
}
