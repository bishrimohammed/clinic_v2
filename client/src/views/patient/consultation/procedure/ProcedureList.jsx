import React from "react";
import AddProcedureBtn from "./AddProcedureBtn";
import { Button, Table } from "react-bootstrap";
import { useGetProcedureByMedicalRecordId } from "../../hooks/consultationHooks/procedure/useGetProcedureByMedicalRecordId";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

const ProcedureList = () => {
  const { state } = useLocation();
  const { data, isPending } = useGetProcedureByMedicalRecordId(
    state.medicalRecord_id
  );
  //   console.log(data);
  return (
    <div>
      <AddProcedureBtn />
      <Table striped responsive bordered className="mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Procedure</th>
            <th>CreatedBy</th>
            <th>Date</th>
          </tr>

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
              <td>
                {format(new Date(procedure.createdAt), "yyyy-MM-d h:mm a")}
              </td>
            </tr>
          ))}

          {/* <tr></tr> */}
        </tbody>
      </Table>
    </div>
  );
};

export default ProcedureList;
