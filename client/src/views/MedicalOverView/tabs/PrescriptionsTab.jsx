import React from "react";
import { useLocation } from "react-router-dom";
import { useGet_Internal_MedicalRecordPrescription } from "../../patient/hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";
import { Spinner, Table } from "react-bootstrap";
import { IoReloadOutline } from "react-icons/io5";

const PrescriptionsTab = () => {
  const { state } = useLocation();
  const { data, isRefetching, refetch } =
    useGet_Internal_MedicalRecordPrescription(state.id);
  //   console.log(data);
  return (
    <div>
      <div className="d-flex justify-content-end gap-2 align-items-center w-100 mb-2  mt-2">
        <button
          disabled={isRefetching}
          onClick={refetch}
          type="button"
          className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
        >
          {/* <IoReloadOutline /> */}
          {isRefetching ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <IoReloadOutline />
          )}
          Reload
        </button>
      </div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Drug Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Prescriber</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((p, index) => {
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.medicine?.service_name}</td>
                <td>{p.dosage}</td>
                <td>{p.frequency}</td>
                <td>{p.duration} days</td>
                <td>{new Date(p.start_date).toISOString().substring(0, 10)}</td>
                <td>
                  {/* {
                    p.doctor?.id === currentUser.id ? "You" : p.doctor?.employee?.firstName + " " + p.doctor?.middleName 
                  } */}
                  {p.doctor?.employee?.firstName}{" "}
                  {p.doctor?.employee?.middleName}{" "}
                  {p.doctor?.employee?.lastName}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PrescriptionsTab;
