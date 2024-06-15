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
  columnHelper.accessor("approval_setting_approvers", {
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
  // {
  //   header : "Approvers",
  //   accessorFn: (row) => `${row.approvers}`
  // }
];
