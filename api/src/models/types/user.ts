export interface UserEntity {
  id?: number;
  username: string;
  email?: string;
  password: string;
  employee_id: number;
  role_id: number;
  is_new?: boolean;
  status?: boolean;
  employee?: EmployeeEntity;
  role?: RoleEntity;
}

export interface EmployeeEntity {
  id?: number;
  firstName: string;
  middleName: string;
  lastName?: string | null;
  gender: "Male" | "Female";
  date_of_birth: Date;
  date_of_hire: Date;
  position: "Doctor" | "Nurse" | "Laboratorian" | "Cashier" | "Other";
  other_position?: string | null;
  photo?: string | null;
  address_id: number;
  emergence_contact_id: number;
  has_digital_signature: boolean;
  digital_signature?: string | null;
  doctor_titer?: string | null;
  status?: boolean;
  deletedAt?: Date | null;
}
export interface RoleEntity {
  id?: number;
  name: string;
  status?: boolean;
}
