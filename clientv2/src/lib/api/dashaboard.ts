import API from "../axios-client";
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  card_number: string;
  gender: string;
}

interface ActiveVisit {
  id: number;
  visit_date: string; // ISO date string
  visit_time: string; // Time string
  status: boolean;
  patient: Patient;
}

export interface UserGroupByRole {
  count: number;
  role: {
    name: string;
  };
}
export interface appointmentT {
  id: number;
  appointment_date: Date;
  appointment_time: string;
  patient_name: string;
}
interface ApiResponse {
  totalCompletedLab: number;
  totalUpcomingAppointment: number;
  totalUpcomingPatientVisit: number;
  totalUser: number;
  totalPatient: number;
  userGroupByRoleAndCount: UserGroupByRole[];
  active_Visits: ActiveVisit[];
  appointments: appointmentT[];
}
export const getDashBoardWidgetData = async () => {
  return await API.get<ApiResponse>("/dashboards").then((res) => res.data);
};
