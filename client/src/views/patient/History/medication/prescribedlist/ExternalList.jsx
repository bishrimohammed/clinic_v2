import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetExternalPrescription } from "../hooks/useGetExternalPrescription";
import { Button, Spinner, Table } from "react-bootstrap";
const PrintExternalPrescription = React.lazy(() =>
  import("../../print/PrintExternalPrescription")
);

const ExternalList = () => {
  const { historyId } = useParams();
  const {
    data: history,
    isFetching,
    error,
  } = useGetExternalPrescription(historyId);
  const ExternalchildRef = useRef(null);
  const callExternalChildFunction = () => {
    if (ExternalchildRef.current) {
      ExternalchildRef.current.printData();
    }
  };
  if (isFetching) return <Spinner animation="border" variant="primary" />;
  if (error) return <div>error : {error?.response?.data.message}</div>;
  return (
    <>
      {history?.ExternalPrescription.length !== 0 ? (
        <>
          <h4 className="ps-2  pb-1"> External medication</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Drug name</th>
                <th>Dosage</th>
                <th>frequency</th>
                <th>route</th>

                <th>No of Days</th>
                <th>quantity</th>
                <th>remark</th>
              </tr>
            </thead>
            <tbody>
              {history?.ExternalPrescription.map((presmedicine, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{presmedicine.drugname}</td>
                  <td>{presmedicine.dosage}</td>
                  <td>{presmedicine.frequency}</td>
                  <td>{presmedicine.route}</td>

                  <td>{presmedicine.number_of_days}</td>
                  <td>{presmedicine.qty}</td>
                  <td>{presmedicine.remark}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-none">
            <PrintExternalPrescription
              medications={history?.ExternalPrescription}
              ref={ExternalchildRef}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              onClick={callExternalChildFunction}
              className="px-4 ms-auto mb-3"
            >
              <span>print</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
          There is no External Prescription for this history
        </div>
      )}
    </>
  );
};

export default ExternalList;
