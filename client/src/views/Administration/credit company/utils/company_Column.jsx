import { format } from "date-fns";

export const Company_Column = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Company",
    accessorFn: (row) => row.name,
  },
  // {
  //   header: "Phone",
  //   accessorFn: (row) => row.address.phone_1,
  // },
  {
    header: "Email",
    accessorFn: (row) => row.address.email,
  },
  {
    header: "Expiration Date",
    accessorFn: (row) => format(row?.agreements[0]?.end_date, "MM/dd/yyyy"),
  },
  {
    header: "Maximum Limit",
    accessorFn: (row) => row?.agreements[0]?.max_limit,
  },
];
