import { createColumnHelper } from "@tanstack/react-table";
import { differenceInYears } from "date-fns";
const columnHelper = createColumnHelper();

export const patientColumns = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Name",
    accessorFn: (row) =>
      row.firstName + " " + row.middleName + " " + row.lastName,
  },
  {
    header: "Sex",

    accessorFn: (row) => row.gender.charAt(0).toUpperCase(),
  },
  // {
  //   header: "Phone",
  //   accessorFn: (row) =>
  //     row.has_phone ? row.phone : <span className="textdanger">---</span>,
  // },
  columnHelper.accessor(
    "phone",

    {
      header: "Phone",
      cell: (s) => {
        // console.log(url);
        return s.getValue() ? (
          <span
          // style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
          // className=" text-white bg-success   d-inline-flex align-items-center justify-content-center"
          >
            {s.getValue()}
          </span>
        ) : (
          <span
            // style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
            className=" text-danger "
          >
            ____
          </span>
        );
      },
    }
  ),
  {
    header: "Registation Date",
    enableGlobalFilter: false,
    enableSorting: false,
    accessorFn: (row) => row.createdAt.substring(0, 10),
  },
  {
    header: "Age",
    // accessorFn: (row) => differenceInYears(row.birth_date),
    accessorFn: (row) => {
      return differenceInYears(new Date(), row.birth_date) + " Years";
    },
  },
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
            className=" text-white bg-success   d-inline-flex align-items-center justify-content-center"
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
