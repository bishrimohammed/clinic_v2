import { createColumnHelper } from "@tanstack/react-table";
import { format, parse } from "date-fns";
const columnHelper = createColumnHelper();

export const OutStandingBillColumns = [
  {
    header: "Patient Id",
    accessorFn: (row) => row.patient.card_number,
  },
  {
    header: "Patient Name",
    accessorFn: (row) =>
      row.patient.firstName +
      " " +
      row.patient.middleName +
      " " +
      row.patient.lastName,
  },
  {
    header: "Assigned Doctor",
    accessorFn: (row) =>
      row.visit.doctor.employee.firstName +
      " " +
      row.visit.doctor.employee.middleName +
      " " +
      row.visit.doctor.employee.lastName,
  },
  {
    header: "Visit Date",
    accessorFn: (row) =>
      row.visit.assignment_date +
      " " +
      format(parse(row.visit.visit_time, "HH:mm:ss", new Date()), "h:mm a"),
  },
  {
    header: "Visit Type",
    accessorFn: (row) => row.visit.visit_type,
  },
  columnHelper.accessor("visit.stage", {
    header: "Stage",
    enableGlobalFilter: false,
    enableSorting: false,
    cell: (s) => {
      // console.log(url);
      return (
        <span
          style={{
            borderRadius: 15,
            padding: "0.2rem 0.5rem",
            fontSize: 13,
            fontWeight: 500,
            backgroundColor: s.getValue() === "Done" ? "green" : "#ffc107",
            color: s.getValue() === "Done" ? "white" : "white",
          }}
          className="d-inline-flex align-items-center justify-content-center"
        >
          {s.getValue()}
        </span>
      );
    },
  }),
];
