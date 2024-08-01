import { format, parseISO } from "date-fns";

export const PrescriptionsColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Drug Name",
    accessorFn: (row) =>
      row.is_internal ? row.medicine.service_name : row.drug_name,
  },
  {
    header: "dosage",
    accessorFn: (row) => row.dosage,
  },
  {
    header: "Frequency",
    accessorFn: (row) => row.frequency,
  },
  {
    header: "Duration",
    accessorFn: (row) => row.duration,
  },
  {
    header: "Start Date",
    accessorFn: (row) =>
      new Date(row.start_date).toISOString().substring(0, 10),
  },
  {
    header: "Prescriber",
    accessorFn: (row) =>
      row.doctor?.employee.firstName + " " + row.doctor?.employee.middleName,
  },
  {
    header: "Date",
    accessorFn: (row) => format(parseISO(row.createdAt), "MM/dd/yyyy, h:mm a"),
  },
];
