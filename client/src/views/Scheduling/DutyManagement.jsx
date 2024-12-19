import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddDutyProgramModal from "./duty/AddDutyProgramModal";
import { useGetDutyProgram } from "./hooks/useGetDutyProgram";
import { getISOWeek } from "date-fns";

const DutyManagement = () => {
  const navigate = useNavigate();
  const [showAddDutyModal, setShowAddDutyModal] = useState(false);
  const { data } = useGetDutyProgram();
  // console.log(data);
  return (
    <div>
      <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
        <h5 className="mb-0"> Duty Programs </h5>
      </div>
      <hr />
      <div className="d-flex justify-content-end mb-2">
        <Button
          //   disabled={agreements?.some((a) => a.status)}
          onClick={() => {
            // navigate("newprogram");
            setShowAddDutyModal(true);
          }}
        >
          + Add Week program
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Week</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((duty, index) => (
            <tr
              key={duty.id}
              onClick={() => navigate("newprogram", { state: duty })}
            >
              <td>{index + 1}</td>
              <td>
                {duty.duty_week === getISOWeek(new Date())
                  ? "This Week"
                  : "Week " + duty.duty_week}
              </td>
              <td>{duty.weekStartDate}</td>
              <td>{duty.weekEndDate}</td>
              <td>{duty.year}</td>
              <td>{duty.status ? "active" : "inactive"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showAddDutyModal && (
        <AddDutyProgramModal
          show={showAddDutyModal}
          handleClose={() => setShowAddDutyModal(false)}
        />
      )}
    </div>
  );
};

export default DutyManagement;
