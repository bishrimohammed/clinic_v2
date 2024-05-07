import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();
export const CompanyEmployeeColumns = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Employee Name",
    accessorFn: (row) => `${row.firstName} ${row.middleName} ${row.lastName}`,
  },
  {
    header: "Employee ID",
    accessorFn: (row) => row.empl_id,
  },
  {
    header: " Gender",
    accessorFn: (row) => row.gender,
  },
  {
    header: "Phone",
    accessorFn: (row) => row?.address?.phone_1,
  },
  //   columnHelper.accessor("agreement_doc", {
  //     header: "Agreement File",
  //     cell: (a) => {
  //       return (
  //         <Button
  //           //className="downloadbtn"
  //           type="submit"
  //           href={Host_URL + a.getValue()}
  //           target="_blank"
  //           bsPrefix="downloadbtn"
  //         >
  //           File
  //         </Button>
  //       );
  //     },
  //   }),
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
];
