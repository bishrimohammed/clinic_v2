import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
// import AddLabInvestigation from "../../History/investigation/AddLabInvestigation";
import { format } from "date-fns";
import AddLabInvestigation from "../investigation/AddLabInvestigation";
import { FaPlusCircle } from "react-icons/fa";
export const OrderedLabInvestigationTable = ({ investigations }) => {
  const [showAddLabModal, setShowLabModal] = useState(false);
  return (
    <div className="mt-2">
      {/* <div className="d-flex justify-content-end">
        <Button className="mb-2" onClick={() => setShowLabModal(true)}>
          + Add Lab
        </Button>
      </div> */}
      <h5 className="d-flex gap-2 mb-3">
        <span className="border-bottom border-dark py-2">
          Internal Lab Investigation
        </span>
        <button
          onClick={() => setShowLabModal(true)}
          className="border-0  bg-transparent "
        >
          <FaPlusCircle size={18} className="text-primary " />
        </button>
      </h5>
      <Table responsive bordered striped>
        <thead>
          <tr>
            <td>#</td>
            <th>Test Name</th>
            <th>Request Time</th>
            <th>Requested By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {investigations
            ?.filter((i) => !i.is_underpanel)
            .map((investigation, index) => (
              <tr key={investigation.id}>
                <td>{index + 1}</td>
                <td>{investigation.test?.service_name}</td>
                <td>
                  {format(new Date(investigation.createdAt), "yyyy-MM-dd") +
                    "    " +
                    format(new Date(investigation.createdAt), "hh:mm a")}
                </td>
                <td>
                  {investigation.requestedBy?.employee?.firstName}{" "}
                  {investigation.requestedBy?.employee?.middleName}{" "}
                </td>
                <td>{investigation.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {showAddLabModal && (
        <AddLabInvestigation
          show={showAddLabModal}
          handleClose={() => setShowLabModal(false)}
        />
      )}
    </div>
  );
};
