import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DutyManagement = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          //   disabled={agreements?.some((a) => a.status)}
          onClick={() => navigate("newprogram")}
        >
          + Add Week program
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Week</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>week 20</td>
            <td>2024</td>
            <td>
              <span className="text-success">Active</span>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>week 21</td>
            <td>2024</td>
            <td>
              <span className="text-success">enabled</span>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>week 23</td>
            <td>2024</td>
            <td>
              <span className="text-success">enabled</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DutyManagement;
