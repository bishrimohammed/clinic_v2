import { format } from "date-fns";
export const completedLab_columns = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Patient Name",
    accessorFn: (row) =>
      row.medicalRecord.patient.firstName +
      " " +
      row.medicalRecord.patient.middleName +
      " " +
      row.medicalRecord.patient.lastName,
  },
  {
    header: "Requested By",
    accessorFn: (row) =>
      row.orderedTests[0]?.requestedBy?.employee?.firstName +
      " " +
      row.orderedTests[0]?.requestedBy?.employee?.middleName +
      " " +
      row.orderedTests[0]?.requestedBy?.employee?.lastName,
  },
  {
    header: "Request Time",
    accessorFn: (row) =>
      format(new Date(row.createdAt), "yyyy-MM-dd") +
      "    " +
      format(new Date(row.createdAt), "hh:mm a"),
  },
  {
    header: "Report Time",
    accessorFn: (row) =>
      format(new Date(row.updatedAt), "yyyy-MM-dd") +
      "    " +
      format(new Date(row.updatedAt), "hh:mm a"),
  },
];
