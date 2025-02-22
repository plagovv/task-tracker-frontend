import { BaseApiService } from "./BaseApiService";

export interface SignInResponse {
  username: string;
  password: string;
}
export interface SignInRequest {
  accessToken: string;
  refreshToken: string;
}
export interface RefreshTokenResponse {
  refreshToken: string;
}

export interface SignUpRequest {
  message: string;
}

export interface GetMeRequest {
  _id: string;
  username: string;
}

export class AuthService extends BaseApiService {
  /**
   * Login method
   * @param username
   * @param password
   */
  async login(username: string, password: string): Promise<SignInRequest> {
    return this.handleRequest(
      this.http.post(
        "/auth/login",
        { username, password },
        { fetchOptions: { withoutRefresh: true } },
      ),
    );
  }

  /**
   * Register method
   * @param username
   * @param password
   */
  async register(username: string, password: string): Promise<SignUpRequest> {
    return this.handleRequest(
      this.http.post("/auth/register", { username, password }),
    );
  }

  /**
   * Get me method
   */
  async getMe(): Promise<GetMeRequest> {
    return this.handleRequest(this.http.get("/auth/me"));
  }
}
