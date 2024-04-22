import { createColumnHelper } from "@tanstack/react-table";
import { FaXmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
const columnHelper = createColumnHelper();

export const ServiceItemColumns = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
    // accessorKey: "id",
  },
  {
    header: "Item Name",
    accessorFn: (row) => row.service_name,
  },
  {
    header: "Group Name",
    accessorFn: (row) => row?.serviceCategory?.name,
  },
  {
    header: "Price",
    accessorFn: (row) => (row.price !== 0 ? row.price : "--"),
  },
  // {
  //   header: "is Fixed",
  //   accessorFn: (row) => (row.isFixed ? <FcCheckmark /> : <FaXmark />),
  // },
  columnHelper.accessor("isFixed", {
    header: "is Price Fixed",
    enableSorting: false,
    cell: (row) => {
      // return row.getValue() == true ? <FcCheckmark /> : <FaXmark color="red" />;
      return row.getValue() == true ? "Yes" : "No";
    },
  }),
  columnHelper.accessor("status", {
    enableSorting: false,
    cell: (s) => {
      // console.log(url)

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
