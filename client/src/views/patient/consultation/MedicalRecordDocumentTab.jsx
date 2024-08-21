import React from "react";
import { useMedicalRecordDocument } from "../hooks/consultationHooks/useMedicalRecordDocument";
import { useLocation } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { Host_URL } from "../../../utils/getHost_URL";
import { format } from "date-fns";

const MedicalRecordDocumentTab = () => {
  const { state } = useLocation();
  const { data, isPending } = useMedicalRecordDocument(state.medicalRecord_id);
  console.log(state);
  return (
    <div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Document Name</th> */}
            <th>Uploaded By</th>
            <th>Uploaded Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isPending && (
            <tr>
              <Spinner />
            </tr>
          )}
          {data?.map((doc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {/* <td>{doc?.name}</td> */}
              <td>{doc.createdBy.employee.firstName}</td>
              <td>{format(new Date(doc.created_at), "yyyy-MM-d h:mm a")}</td>
              <td>
                <a
                  href={Host_URL + doc.document_url}
                  target="_blank"
                  //   className="btn btn-sm btn-primary"
                >
                  View file
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MedicalRecordDocumentTab;
