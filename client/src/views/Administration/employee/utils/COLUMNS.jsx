import { createColumnHelper } from "@tanstack/react-table";
import { Image } from "react-bootstrap";
import { differenceInYears } from "date-fns";

import { Host_URL } from "../../../../utils/getHost_URL";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

const columnHelper = createColumnHelper();

export const COLUMNS = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    id: "Employee Name",
    accessorFn: (row) => {
      const employeeName = `${row.firstName} ${row.middleName} ${row.lastName}`;

      return {
        employeeName,
        firstName: row.firstName,
        middleName: row.middleName,
        employeePhoto: row.photo,
      };
    },
    filter: "fuzzyText", // Enable fuzzy text filtering
    sortType: "alphanumeric",
    filterFn: (rows, id, filterValue) => {
      const lowerCaseFilter = filterValue.toLowerCase();
      return rows.filter((row) => {
        const employeeName =
          `${row.firstName} ${row.middleName} ${row.lastName}`.toLowerCase();
        return employeeName.includes(lowerCaseFilter);
      });
    },
    cell: (row) => {
      return (
        <div className="d-flex gap-3 align-items-center">
          {row.getValue().employeePhoto ? (
            <div>
              <Image
                className="rounded-circle"
                src={`${Host_URL}${row.getValue().employeePhoto}`}
                style={{ objectFit: "cover", objectPosition: "center" }}
                alt=""
                roundedCircle
                width={30}
                height={30}
              />
            </div>
          ) : (
            <div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  fontSize: 13,
                  letterSpacing: 2,
                }}
                className="bg-primary text-white d-flex align-items-center justify-content-center"
              >
                {`${row.getValue().firstName?.split("")[0].toUpperCase()}`}
                {`${row.getValue().middleName?.split("")[0].toUpperCase()}`}
              </div>
            </div>
          )}
          <div className="d-flex flex-column justify-content-center align-items-start">
            <p className="mb-0">{row.getValue().employeeName}</p>
          </div>
        </div>
      );
    },
  },

  {
    header: "Age",
    accessorKey: "date_of_birth",
    accessorFn: (row) => {
      return differenceInYears(new Date(), row.date_of_birth) + " Years";
    },
  },
  // columnHelper.accessor("gender", {
  //   header: "Gender",
  //   filterFn: "customGenderFilter",
  // }),
  {
    header: "Gender",
    accessorKey: "gender",
    accessorFn: (row) => {
      // console.log(row.gender.charAt(0));
      return row.gender.charAt(0);
    },
    // filterFn: "customGenderFilter",
    // filterFn: (row) => {
    //   console.log(row);
    //   return row.original.gender.toLowerCase() === filterValue.toLowerCase();
    // },

    // enableColumnFilter: true,
    // enableGlobalFilter: false,
  },
  {
    header: "Position",
    accessorFn: (row) =>
      row.position !== "Other" ? row.position : row.other_position,
  },
  {
    header: "Start Date",
    accessorKey: "date_of_hire",
  },
  columnHelper.accessor("digital_signature", {
    header: "Signature",
    enableSorting: false,
    cell: (row) => {
      return row.getValue() ? (
        <FaCheck className="me-1" color="green" />
      ) : (
        <RxCross1 color="red" size={20} />
      );
    },
  }),
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
