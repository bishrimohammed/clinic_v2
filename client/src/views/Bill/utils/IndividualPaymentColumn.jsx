import { createColumnHelper } from "@tanstack/react-table";
import { format, parse } from "date-fns";
const columnHelper = createColumnHelper();

export const IndividualPaymentColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Item",
    accessorFn: (row) => row.item.service_name,
  },
  {
    header: "Cashier",
    accessorFn: (row) =>
      row.cashier
        ? row.cashier.employee.firstName +
          " " +
          row.cashier.employee.middleName +
          " " +
          row.cashier.employee.lastName
        : "____",
  },
  {
    header: "Price",
    accessorFn: (row) => row.item.price + " birr",
  },
  {
    header: "Payment Date",
    accessorFn: (row) => row.payment_date,
  },

  columnHelper.accessor("status", {
    header: "Status",
    enableGlobalFilter: false,
    enableSorting: false,
    cell: (s) => {
      // console.log(url);
      return (
        <span
          style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
          className={` text-white  ${
            s.getValue() === "Unpaid"
              ? "bg-danger"
              : s.getValue() === "Paid"
              ? "bg-success"
              : "bg-warning fw-bolder"
          }   d-inline-flex align-items-center justify-content-center`}
        >
          {s.getValue()}
        </span>
        // ) : (
        //   <span
        //     style={{ borderRadius: 15, padding: "0.2rem 0.5rem", fontSize: 14 }}
        //     className=" text-white bg-danger d-inline-flex align-items-center justify-content-center"
        //   >
        //     Unpaid
        //   </span>
      );
    },
  }),
];
