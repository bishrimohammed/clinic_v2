import { createColumnHelper } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
const columnHelper = createColumnHelper();

export const externalServiceColumn = [
  {
    header: "#",

    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Patient Name",
    accessorFn: (row) => row.patient_name,
  },
  {
    header: "Service Name",
    accessorFn: (row) => row.service_type,
  },
  {
    header: "Date",
    // accessorFn: (row) => format(parseISO(row.service_time), "dd/MM/yyyy"),
    accessorFn: (row) => row.service_time,
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
