export interface UserSession {
  id: string;
  name: string;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken?: string;
}
