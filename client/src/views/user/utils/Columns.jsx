import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const COLUMNS = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Name",
    id: "Name",
    accessorFn: (row) =>
      `${row.employee?.firstName} ${row.employee?.middleName} ${row.employee?.lastName}`,
  },
  {
    header: "Username",
    id: "Username",
    accessorFn: (row) => row?.username,
  },

  {
    id: "Role",
    header: "Role",
    accessorFn: (row) =>
      row?.role?.name.charAt(0).toUpperCase() + row?.role?.name.slice(1),
  },
  columnHelper.accessor("status", {
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
  }),
];
