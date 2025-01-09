import { LucideIcon } from "lucide-react";

export type PermissionAction = "edit" | "delete" | "read" | "create";
// Define the permission names as a union type
export type PermissionName =
  | "User"
  | "Employee"
  | "Role"
  | "Patient"
  | "Lab"
  | "Appointment"
  | "Visit"
  | "Admit Patient"
  | "Payments"
  | "Triage"
  | "Clinic Profile"
  | "Approval Setting"
  | "Clinic Services"
  | "Event"
  | "View Lab Result"
  | "Nurse Treatment"
  | "External Service"
  | "Lab Result"
  | "External Lab Service Result"
  | "Report"
  | "Credit Service"
  | "Clinic Field Configuration";

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  permissions: PermissionName[];
  items?: {
    title: string;
    url: string;
    permission: PermissionName;
  }[];
};

type region = {
  id: number;
  name: string;
};
type city = {
  id: number;
  name: string;
  region?: region;
};
type subcity = {
  id: number;
  name: string;
  city?: city;
};
type woreda = {
  id: number;
  name: string;
  subcity?: subcity;
};

export type Taddress = {
  id: number;
  phone_1: string;
  woreda_id: number;
  phone_2?: string | null;
  email?: string;
  street?: string;
  house_number: string | null;
  woreda?: woreda;
};
