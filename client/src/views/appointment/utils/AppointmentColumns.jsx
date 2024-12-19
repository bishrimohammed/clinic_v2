import { Badge } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import { format, parse } from "date-fns";
const columHelper = createColumnHelper();
export const AppointmentColumns = [
  // {
  //   header: "#",
  //   accessorFn: (row, index) => index + 1,
  // },

  {
    header: "Patient",
    accessorFn: (row) =>
      row.patient
        ? row.patient.firstName +
          " " +
          row.patient.middleName +
          " " +
          row?.patient.lastName
        : // ? row?.lastName
          // : null
          row.patient_name,
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
    header: "Date",
    accessorFn: (row) => row.appointment_date,
  },

  {
    header: "Time",
    accessorFn: (row) =>
      format(parse(row.appointment_time, "HH:mm:ss", new Date()), "h:mm a"),
  },
  columHelper.accessor("status", {
    cell: (s) => {
      // console.log(url);
      return s.getValue() == "upcoming" ? (
        <span
          style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
          className=" text-white bg-success   d-inline-flex align-items-center justify-content-center"
        >
          {s.getValue()}
        </span>
      ) : (
        <span
          style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
          className=" text-white bg-danger d-inline-flex align-items-center justify-content-center"
        >
          {s.getValue()}
        </span>
      );
    },
  }),
  // columHelper.accessor(
  //   "status",
  //   {
  //     enableSorting: false,
  //     enableGlobalFilter: false,
  //   },
  //   {
  //     cell: (s) => {
  //       console.log(s.getValue());
  //       return (
  //         <div>
  //           <Badge
  //             color={s.getValue() === "cancelled" ? "warning" : "success"}
  //             // className="p-1"
  //             style={{
  //               borderRadius: 15,
  //               padding: "0.2rem 0.5rem",
  //               fontSize: 14,
  //             }}
  //           >
  //             {s.getValue()}
  //           </Badge>
  //         </div>
  //       );
  //     },
  //   }
  // ),
];
