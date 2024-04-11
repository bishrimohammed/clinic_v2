import React, { useCallback, useMemo, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddEmployeeModal from "./AddEmployeeModal";
import { useGetEmployees } from "./hooks/useGetEmployees";
import EmployeeTable from "./employee table/EmployeeTable";
import { toast } from "react-toastify";
import EditEmployeeModal from "./EditEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import ViewEmployeeDetail from "./ViewEmployeeDetail";
import FilterModal from "./FilterModal";

const ViewEmployees = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showViewEmployee, setShowViewEmployee] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: null,
    selectedFor: "",
  });
  const [filter, setFilter] = useState({
    status: "",
    position: [],
    gender: "",
  });

  const { data, isPending, isFetching, isLoading, error, refetch } =
    useGetEmployees(filter);
  // let editData;
  // console.log(searchParams);
  const navigate = useNavigate();
  const employeeData = useMemo(() => data || [], [data]);
  const handleClose = useCallback(() => setShow(false), [show]);
  const handleShow = useCallback(() => setShow(true), []);

  const handleCloseEdit = useCallback(() => setShowEdit(false), []);
  const handleShowEdit = (value) => setShowEdit(true);

  // const setData_to_be_Edited = (value) => {
  //   console.log(value);
  //   editData = value;
  // };
  // if (isLoading) return null;

  if (error) return toast.error(error.message);
  // console.log(data);
  return (
    <>
      <Container className="p-3">
        {/* <div>ViewEmployees</div> */}
        <div className=" border-bottom border-1 mb-1">
          {/* <h4 className="mb-2">View Employees</h4> */}
          <h4 className=" p-2 mb-0 fw-bold">Employees</h4>
          {/* <button onClick={() => setShowFilter(true)}>Filter</button> */}
          {/* <button
            onClick={() => setFilter({ status: "", position: [], gender: "" })}
          >
            clear filter
          </button> */}
        </div>
        {/* <hr className="mt-0" /> */}

        <EmployeeTable
          setAddEmployeeModal={setShow}
          Data={employeeData}
          isPending={isPending}
          handleShowEdit={handleShowEdit}
          setData_to_be_Edited={setEditData}
          setSelectedEmployee={setSelectedEmployee}
          setShowDelete={setShowDelete}
          setShowViewEmployee={setShowViewEmployee}
          setEmployee={setEmployee}
          setFilter={setFilter}
          setShowFilter={setShowFilter}
        />
      </Container>
      <AddEmployeeModal show={show} handleClose={handleClose} />
      {showEdit && editData && (
        <EditEmployeeModal
          empoyeeData={editData}
          show={showEdit}
          handleClose={handleCloseEdit}
        />
      )}
      {selectedEmployee.id && showDelete && (
        <DeleteEmployeeModal
          show={showDelete}
          handleClose={setShowDelete}
          employeeId={selectedEmployee.id}
          action={selectedEmployee.selectedFor}
          refetch={refetch}
        />
      )}
      {showViewEmployee && employee && (
        <ViewEmployeeDetail
          show={showViewEmployee}
          handleClose={setShowViewEmployee}
          employee={employee}
        />
      )}
      {showFilter && (
        <FilterModal
          show={showFilter}
          handleClose={setShowFilter}
          setFilter={setFilter}
        />
      )}
      {/* <FilterModal
        show={showFilter}
        handleClose={setShowFilter}
        setFilter={setFilter}
      /> */}
    </>
  );
};

export default ViewEmployees;
