export default interface UserEntity {
  id?: number;
  username: string;
  email?: string;
  password: string;
  employee_id: number;
  role_id: number;
  is_new?: boolean;
  status?: boolean;
}
