export interface CreateUserRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: number;
}