import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const Clinic_Service_Columns = [
  { header: "#", accessorFn: (row, index) => index + 1 },
  {
    header: "Service Name",
    accessorFn: (row) => row.service_name,
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
