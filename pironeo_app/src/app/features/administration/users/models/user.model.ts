export type UserRole = 'ADMIN' | 'WAITER';

export interface User {
  id: number;
  username: string;

  firstName: string;
  lastName?: string;

  role: UserRole;

  active: boolean;
}