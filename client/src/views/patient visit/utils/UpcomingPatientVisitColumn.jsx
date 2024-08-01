import { createColumnHelper } from "@tanstack/react-table";
import { format, parse } from "date-fns";
const columnHelper = createColumnHelper();
export const UpcomingPatientVisitColumn = [
  {
    header: "#",
    accessorFn: (row, index) => row.patient.card_number,
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
    header: "Assigned Doctor",
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
  // {
  //   header: "Stage",
  //   accessorFn: (row) => row.stage,
  // },
  {
    header: "Visit Type",
    accessorFn: (row) => row.visit_type,
  },
  columnHelper.accessor("stage", {
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
          className="d-inline-flex align-items-center justify-content-center text-nowrap"
        >
          {s.getValue()}
        </span>
      );
    },
  }),
  columnHelper.accessor(
    "status",

    {
      header: "Status",
      enableGlobalFilter: false,
      enableSorting: false,
      cell: (s) => {
        // console.log(url);
        return s.getValue() == true ? (
          <span
            style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
            className=" text-white bg-success d-inline-flex align-items-center justify-content-center"
          >
            active
          </span>
        ) : (
          <span
            style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
            className=" text-white bg-danger d-inline-flex align-items-center justify-content-center"
          >
            inactive
          </span>
        );
      },
    }
  ),
];
