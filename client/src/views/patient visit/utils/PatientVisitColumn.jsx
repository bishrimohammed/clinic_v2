import { format, parse } from "date-fns";

export const PatientVisitColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Patient",
    accessorFn: (row) =>
      row.patient.firstName +
      " " +
      row.patient.middleName +
      " " +
      row.patient.lastName,
  },
  {
    header: "Doctor",
    accessorFn: (row) =>
      row.doctor.employee.firstName +
      " " +
      row.doctor.employee.middleName +
      " " +
      row.doctor.employee.lastName,
  },
  {
    header: "Visit Date",
    accessorFn: (row) =>
      row.assignment_date +
      " " +
      format(parse(row.visit_time, "HH:mm:ss", new Date()), "h:mm a"),
  },
  {
    header: "Stage",
    accessorFn: (row) => row.stage,
  },
  {
    header: "Status",
    accessorFn: (row) => (row.status ? "active" : "inactive"),
  },
];
