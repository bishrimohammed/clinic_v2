import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const ApprovalTableHeader = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Name",
    accessorFn: (row) => `${row.name}`,
    // accessorFn: (row) => `${row.firstName} ${row.middleName} ${row.lastName}`
  },
  {
    header: "Permisision",
    accessorFn: (row) => `${row.permission.name}`,
  },
  {
    header: " Approval Levels",
    accessorFn: (row) => `${row.approval_level}`,
  },
  columnHelper.accessor("approvers", {
    header: "Approvers",
    enableSorting: false,
    // accessorFn: (row) => `${row.approval_setting_approvers}`
    cell: (value) => {
      return (
        <div>
          {value.getValue().map((item, index) => {
            const user =
              item.user.employee.firstName +
              " " +
              item.user.employee.middleName;
            return <div key={index}>Approver {`${item.level} ${user}`}</div>;
          })}
        </div>
      );
    },
  }),
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
  // {
  //   header : "Approvers",
  //   accessorFn: (row) => `${row.approvers}`
  // }
];
