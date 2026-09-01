export type UserRole = 'ADMIN' | 'WAITER';

export interface User {
  id: number;
  username: string;

  firstName: string;
  lastName?: string;

  role?: UserRole;
  roleId?: number;
  roleCode?: UserRole;
  roleName?: string;

  active: boolean;
}
