import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";

const columnHelper = createColumnHelper();
export const labsColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Test Name",
    accessorFn: (row) => row.test.service_name,
  },
  {
    header: "Requested By",
    accessorFn: (row) =>
      row.requestedBy?.employee?.firstName +
      " " +
      row.requestedBy?.employee?.middleName,
  },
  {
    header: "Requested Time",
    accessorFn: (row) =>
      format(new Date(row.order_time), "yyyy-MM-dd") +
      "    " +
      format(new Date(row.order_time), "hh:mm a"),
  },
  columnHelper.accessor("status", {
    header: "Status",
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
            backgroundColor: s.getValue() === "completed" ? "green" : "#ffc107",
            color: s.getValue() === "completed" ? "white" : "white",
          }}
          className="d-inline-flex align-items-center justify-content-center"
        >
          {s.getValue()}
        </span>
      );
    },
  }),
];
