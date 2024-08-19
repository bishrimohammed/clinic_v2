import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { useGetInternalPrescription } from "../hooks/useGetInternalPrescription";
const PrintMedication = React.lazy(() => import("../../print/PrintMedication"));
// import { format } from "../../../../../utils/formatDate";

const InternalPresList = () => {
  const { historyId } = useParams();
  const {
    data: internalpres,
    isFetching,
    error,
  } = useGetInternalPrescription(historyId);
  const childRef = useRef(null);
  const callChildFunction = () => {
    if (childRef.current) {
      childRef.current.printData();
    }
  };
  if (isFetching) return <Spinner animation="border" variant="primary" />;
  if (error) return <div>error : {error?.response?.data.message}</div>;
  return (
    <div className=" p-2">
      {internalpres ? (
        <>
          {" "}
          <h4 className="ps-2  pb-1"> Internal</h4>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Drug name</th>
                <th>Dosage</th>
                <th>frequency</th>
                <th>route</th>
                <th>start Date</th>
                <th>No of Days</th>
                <th>quantity</th>
                <th>remark</th>
              </tr>
            </thead>
            <tbody>
              {internalpres?.medications.map((presmedicine, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{presmedicine.medicineId.drugname}</td>
                  <td>{presmedicine.dosage}</td>
                  <td>{presmedicine.frequency}</td>
                  <td>{presmedicine.route}</td>
                  <td>{format(Date.now())}</td>
                  <td>{presmedicine.number_of_days}</td>
                  <td>{presmedicine.qty}</td>
                  <td>{presmedicine.remark}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-none">
            <PrintMedication medications={internalpres} ref={childRef} />
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={callChildFunction} className="px-4 ms-auto mb-3">
              <span>print</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="p-2 bg-danger  bg-opacity-10 text-center">
          Not prescribed
        </div>
      )}
    </div>
  );
};

export default InternalPresList;
