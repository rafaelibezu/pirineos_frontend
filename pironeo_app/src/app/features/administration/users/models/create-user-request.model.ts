export interface CreateUserRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
}

export interface UpdateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  roleId: number;
  active: boolean;
  password?: string;
}
