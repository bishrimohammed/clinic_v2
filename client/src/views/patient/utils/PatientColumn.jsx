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
    header: "Gender",
    accessorFn: (row) => row.gender.charAt(0).toUpperCase(),
  },
  {
    header: "Phone",
    accessorFn: (row) => (row.has_phone ? row.phone : row.address.phone_1),
  },
  {
    header: "Age",
    // accessorFn: (row) => differenceInYears(row.birth_date),
    accessorFn: (row) => {
      return differenceInYears(new Date(), row.birth_date) + " Years";
    },
  },
  columnHelper.accessor("status", {
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
  }),
];
