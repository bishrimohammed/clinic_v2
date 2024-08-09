import React from "react";
import AddProcedureBtn from "./AddProcedureBtn";
import { Button, Table } from "react-bootstrap";
import { useGetProcedureByMedicalRecordId } from "../../hooks/consultationHooks/procedure/useGetProcedureByMedicalRecordId";
import { useLocation } from "react-router-dom";

const ProcedureList = () => {
  const { state } = useLocation();
  const { data, isPending } = useGetProcedureByMedicalRecordId(
    state.medicalRecord_id
  );
  console.log(data);
  return (
    <div>
      <AddProcedureBtn />
      <Table striped responsive bordered className="mt-2">
        <thead>
          <th>#</th>
          <th>Procuder</th>
          <th>CreatedBy</th>
          <th>Date</th>

          {/* <th></th>
        <th></th> */}
        </thead>
        <tbody>
          {/* {isPending && <tr>Loading...</tr>} */}
          {data?.map((procedure, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{procedure?.serviceItem?.service_name}</td>
              <td>
                {procedure.createdBy.employee.firstName}{" "}
                {procedure.createdBy.employee.middleName}
              </td>
              <td>{procedure.createdAt}</td>
            </tr>
          ))}

          {/* <tr></tr> */}
        </tbody>
      </Table>
    </div>
  );
};

export default ProcedureList;
