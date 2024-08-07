import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const externalServicePaymentsColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Patient Name",
    accessorFn: (row) => row?.externalService?.patient_name,
  },
  {
    header: "Service Date",
    accessorFn: (row) =>
      new Date(row?.externalService?.service_time)
        .toISOString()
        .substring(0, 10),
  },
  {
    header: "Service Type",
    accessorFn: (row) => row?.externalService?.service_type,
  },
  columnHelper.accessor("status", {
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
  }),
];
