export type UserRole = 'ADMIN' | 'WAITER';

export interface UserSession {
  userId: number;

  username: string;

  firstName: string;
  lastName?: string;

  role: UserRole;

  accessToken: string;
  tokenType: string;
}