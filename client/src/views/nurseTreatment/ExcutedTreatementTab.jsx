import React from "react";
import { useGetExcutedMedication } from "./hooks/useGetExcutedMedication";
import { Button, Table } from "react-bootstrap";
import { format, parse } from "date-fns";

const ExcutedTreatementTab = ({ treatmentId }) => {
  const { data } = useGetExcutedMedication(treatmentId);
  //   console.log(data);
  return (
    <div>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Route</th>
            <th>When</th>
            <th>Prescriber</th>

            <th>Excuted By</th>
            <th>Excuted At</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((medicine, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {medicine.is_internal
                  ? medicine.medicine?.service_name
                  : medicine.drug_name}
              </td>
              <td>{medicine.dosage}</td>
              <td>{medicine.frequency}</td>
              <td>{medicine.route}</td>
              <td>{medicine.when}</td>
              <td>
                {medicine.doctor.employee.firstName}{" "}
                {medicine.doctor.employee.middleName}
              </td>
              <td>
                {medicine.excutedBy?.employee?.firstName}{" "}
                {medicine.excutedBy?.employee?.middleName}
              </td>
              <td>
                {format(new Date(medicine.excutedAt), "yyyy-MM-dd") +
                  "    " +
                  format(new Date(medicine.excutedAt), "hh:mm a")}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExcutedTreatementTab;
