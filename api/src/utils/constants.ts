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
  | "Report";

export const timePattern =
  /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;
