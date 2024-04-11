import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import AddLabResultModal from "./AddLabResultModal";
// import UseLabByHistoryId from "../../hooks/UseLabByHistoryId";
import { format, formatHour } from "../../../../utils/formatDate";

const AddLabResult = () => {
  // const [history, setHistory] = useState(null);
  const [show, setShow] = useState(false);
  const { state } = useLocation();
  // console.log(state);
  const { historyId } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <AddLabResultModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        lab={state.orderedTests}
        labId={state?.id}
      />

      <h3>Add Lab Results</h3>
      <h6>clinical finding</h6>
      <p>{state?.clinical_finding}</p>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Test Name</th>

            <th>Requested By</th>

            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {state?.orderedTests.map((inves, index) => (
            <tr key={index}>
              <td>
                {format(inves?.order_time)} {formatHour(inves?.order_time)}
              </td>
              <td>{inves?.test.service_name}</td>
              <td>
                {inves?.requestedBy?.firstName} {inves?.requestedBy?.lastName}
              </td>

              <td>{inves?.status}</td>
            </tr>
          ))}

          <tr></tr>
        </tbody>
      </Table>
      <div className="d-flex w-100  justify-content-end">
        <div>
          <Button
            onClick={handleShow}
            className="ms-3"
            variant="success"
            type="button"
          >
            + Add Lab Result
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddLabResult;
