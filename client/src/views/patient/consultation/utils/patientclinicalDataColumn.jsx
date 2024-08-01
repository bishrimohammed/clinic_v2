import { format, parseISO } from "date-fns";

export const patientclinicalDataColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Chief Complaint",
    accessorFn: (row) => row.chief_complaint,
  },
  {
    header: "HPI",
    accessorFn: (row) => row.hpi,
  },
  {
    header: "Plan",
    accessorFn: (row) => row.plan,
  },
  {
    header: "Doctor",
    accessorFn: (row) =>
      row.doctor?.employee.firstName + " " + row.doctor?.employee.middleName,
  },
  {
    header: "Date",
    accessorFn: (row) => format(parseISO(row.createdAt), "MM/dd/yyyy, h:mm a"),
  },
];
