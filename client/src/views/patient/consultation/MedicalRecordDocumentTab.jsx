import React, { useState } from "react";
import { useMedicalRecordDocument } from "../hooks/consultationHooks/useMedicalRecordDocument";
import { useLocation } from "react-router-dom";
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import { Host_URL } from "../../../utils/getHost_URL";
import { format } from "date-fns";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUploadDocument } from "../hooks/consultationHooks/useUploadDocument";
const documentSchema = yup.object().shape({
  document_name: yup.string(),
  document_file: yup
    .mixed()
    .test("required", "Document file is required", function (value) {
      // console.log(value.length);
      if (value.length == 0) {
        return this.createError({
          path: "document_file",
          message: "Document file is required",
        });
      }
      return true;
    })
    .nullable(),
  // .test("required", "Document file is required", (value) => {
  //   const fileSelected = !!value; // Check if a file is selected
  //   // If a file is selected, check its validity
  //   return !fileSelected || (fileSelected && value.size > 0);
  //   return !value.size > 0;
  // })
  // .test("fileType", "Unsupported file format", (value) => {
  //   if (!value) return false; // Checks if the file is present
  //   const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  //   return allowedTypes.includes(value.type);
  // })
  // .test("fileSize", "File size is too large", (value) => {
  //   console.log(value);

  //   if (!value) return true; // Skip if no file
  //   const maxSize = 5 * 1024 * 1024; // 2MB
  //   return value.size <= maxSize;
  // }),
});
const UploadDocumentModal = ({ show, handleClose }) => {
  const { mutateAsync, isPending } = useUploadDocument();
  const { state } = useLocation();
  // console.log(state);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(documentSchema),
  });
  // console.log(errors);

  const submitHandler = (data) => {
    // alert("sldkjfnjsdbh");
    // console.log(data);
    const formData = new FormData();
    formData.append("document_name", data.document_name);
    formData.append("document_file", data.document_file[0]);
    mutateAsync({ formData, medicalRecordId: state.medicalRecord_id })
      .then((res) => {
        if (res.status === 201) {
          handleClose();
        } else {
          alert("Error in uploading document");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error in uploading document");
        // handleClose();
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)} id="documentForm">
          <Form.Group controlId="documentName">
            <Form.Label>Document Name</Form.Label>
            <Form.Control
              {...register("document_name")}
              type="text"
              placeholder="Enter Document Name"
              isInvalid={errors.document_name}
            />
          </Form.Group>
          <Form.Group controlId="documentFile">
            <Form.Label>Document File</Form.Label>
            <Form.Control
              {...register("document_file")}
              name="document_file"
              accept=".pdf, .jpeg, .jpg, .png"
              type="file"
              isInvalid={errors.document_file}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.document_file?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Supported file types: PDF, JPEG, PNG. Maximum file size: 5MB.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          form="documentForm"
          disabled={isPending}
        >
          {isPending && <Spinner size="sm" />}
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const UploadDocumentBtn = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowUploadModal(true)} variant="primary">
        + Upload Document
      </Button>
      {showUploadModal && (
        <UploadDocumentModal
          show={showUploadModal}
          handleClose={() => setShowUploadModal(false)}
        />
      )}
    </>
  );
};

const MedicalRecordDocumentTab = () => {
  const { state } = useLocation();
  const { data, isPending } = useMedicalRecordDocument(state.medicalRecord_id);
  // console.log(state);
  return (
    <div>
      <div className="d-flex justify-content-end my-2">
        <UploadDocumentBtn />
      </div>
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
              <td>
                {doc.createdBy.employee.firstName}{" "}
                {doc.createdBy.employee.middleName}
              </td>
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
