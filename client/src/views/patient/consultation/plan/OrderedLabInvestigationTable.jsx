import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
// import AddLabInvestigation from "../../History/investigation/AddLabInvestigation";
import { format } from "date-fns";
import AddLabInvestigation from "../investigation/AddLabInvestigation";
export const OrderedLabInvestigationTable = ({ investigations }) => {
  const [showAddLabModal, setShowLabModal] = useState(false);
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-end">
        <Button className="mb-2" onClick={() => setShowLabModal(true)}>
          + Add Lab
        </Button>
      </div>

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
