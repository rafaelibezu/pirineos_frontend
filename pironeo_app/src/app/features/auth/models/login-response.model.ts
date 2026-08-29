export interface LoginResponse {
  accessToken: string;
  tokenType: string;

  userId: number;
  username: string;

  firstName: string;
  lastName?: string;

  role: 'ADMIN' | 'WAITER' | 'ROLE_ADMIN' | 'ROLE_WAITER' | string;
}
