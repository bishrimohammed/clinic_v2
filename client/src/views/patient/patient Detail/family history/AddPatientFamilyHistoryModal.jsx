import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Row,
  Col,
  Button,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAddPatientFamilyHistory } from "../../hooks/patientHooks/useAddPatientFamilyHistory";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePatientSocialHistory } from "../../hooks/patientHooks/usePatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
import { FaTrash } from "react-icons/fa6";
import { useUpdateFamilyHistory } from "../../hooks/patientHooks/useUpdateFamilyHistory";
import { useDeleteFamilyHistory } from "../../hooks/patientHooks/useDeleteFamilyHistory";
const familyHistorySchema = yup.object().shape({
  medical_condition: yup.string().required("Medical condition is required"),
  relationship: yup.string().required("Relationship is required"),
  other_relationship: yup
    .string()
    .when("relationship", ([relationship], schema) => {
      if (relationship === "Other") {
        return schema.required("Other Relationship is required");
      }
      return schema.nullable();
    }),
});
const AddPatientFamilyHistoryModal = ({
  show,
  handleClose,
  patientId,
  familyHistories,
}) => {
  const addFamilyHistory = useAddPatientFamilyHistory();
  const updateFamilyHistory = useUpdateFamilyHistory();
  const deleteFamilyHistory = useDeleteFamilyHistory();
  const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  const [action, setAction] = useState("Save");
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(familyHistorySchema),
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessState("");
      setErrorState("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorState, successState]);
  // console.log(errors);
  const relationshipWatcher = watch("relationship");
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    const Data = {
      newFamilyHistory: {
        medical_condition: data.medical_condition,
        relationship:
          data.relationship !== "Other"
            ? data.relationship
            : data.other_relationship,
      },
      patientId: patientId,
    };
    if (action === "Save") {
      addFamilyHistory
        .mutateAsync(Data)
        .then((res) => {
          if (res.status === 201) {
            //   handleClose(false);
            // setAction("Save");
            setSuccessState(res.data.message);
            reset();
          }
        })
        .catch((err) => {
          console.log(err);
          const errors = err?.response?.data?.message;
          if (Array.isArray(errors)) {
            errors.map((err) => {
              const msg = err.message;
              // console.log(err.path);
              // console.log(err.message);
              // setError(err.path, msg.join(""));
            });
          } else {
            // console.log(err);
            // const errors = err.response.data.message;
            setErrorState(errors);
          }
        });
    } else {
      updateFamilyHistory
        .mutateAsync({
          formData: Data.newFamilyHistory,
          patientId,
          id: data.id,
        })
        .then((res) => {
          if (res.status === 200) {
            // handleClose();
            setSuccessState(res.data.message);
            reset();
          }
        })
        .catch((err) => {
          console.log(err);
          const errors = err.response.data.message;
          if (Array.isArray(errors)) {
            errors.map((err) => {
              const msg = err.message;
              // console.log(err.path);
              // console.log(err.message);
              // setError(err.path, msg.join(""));
            });
          } else {
            // console.log(err);
            const error = err.response.data.message;
            setErrorState(error);
          }
        });
    }
  };

  const deleteHandler = (id) => {
    deleteFamilyHistory
      .mutateAsync({ id, patientId })
      .then((res) => {
        if (res.status === 200) {
          // handleClose();
          setSuccessState(res.data.message);
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        const errors = err.response.data.message;
        if (Array.isArray(errors)) {
          errors.map((err) => {
            const msg = err.message;
            // console.log(err.path);
            // console.log(err.message);
            // setError(err.path, msg.join(""));
          });
        } else {
          // console.log(err);
          const error = err.response.data.message;
          setErrorState(error);
        }
      });
  };

  let isPending =
    addFamilyHistory.isPending ||
    deleteFamilyHistory.isPending ||
    updateFamilyHistory.isPending;
  return (
    // <Modal show={show} onHide={handleClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Add Patient Family History</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    // <Form onSubmit={handleSubmit(submitHandler)}>
    //   <Form.Group className="mb-3">
    //     <Form.Label>Medical Condition</Form.Label>
    //     <Form.Control
    //       {...register("medical_condition")}
    //       isInvalid={errors.medical_condition}
    //       type="text"
    //     />
    //     <Form.Control.Feedback type="invalid">
    //       {errors.medical_condition?.message}
    //     </Form.Control.Feedback>
    //   </Form.Group>
    //   <Form.Group className="mb-3">
    //     <Form.Label> Relationship</Form.Label>
    //     <Form.Select
    //       {...register("relationship")}
    //       isInvalid={errors.relationship}
    //     >
    //       <option value="">Please Select</option>
    //       <option value="Father">Father</option>
    //       <option value="Mother">Mother</option>
    //       <option value="Brother">Brother</option>
    //       <option value="Sister">Sister</option>

    //       <option value="Other">Other</option>
    //     </Form.Select>
    //     <Form.Control.Feedback type="invalid">
    //       {errors.relationship?.message}
    //     </Form.Control.Feedback>
    //   </Form.Group>
    //   {relationshipWatcher === "Other" && (
    //     <Form.Group className="mb-3">
    //       <Form.Label>Relationship Type</Form.Label>
    //       <Form.Control
    //         type="text"
    //         {...register("other_relationship")}
    //         isInvalid={errors.other_relationship}
    //       />
    //       <Form.Control.Feedback type="invalid">
    //         {errors.other_relationship?.message}
    //       </Form.Control.Feedback>
    //     </Form.Group>
    //   )}
    //   <div className="d-flex justify-content-end gap-2">
    //     <button
    //       type="button"
    //       className="btn btn-secondary"
    //       onClick={handleClose}
    //     >
    //       Close
    //     </button>
    //     <button
    //       type="submit"
    //       className="btn btn-primary"
    //       // onClick={handleClose}
    //     >
    //       Save
    //     </button>
    //   </div>
    // </Form>
    //   </Modal.Body>
    // </Modal>
    <Modal
      style={{ zIndex: 1999 }}
      size="lg"
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Patient Family History</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-1">
        {successState && <Alert variant="success">{successState}</Alert>}
        {errorState && (
          <Alert variant="danger" dismissible="true">
            {errorState}
          </Alert>
        )}

        <Row>
          <Col md={showForm ? 7 : 12}>
            <div className="d-flex justify-content-end w-100  py-1">
              <Button
                className=" btn-sm "
                onClick={() => {
                  !showForm && setShowForm(true);
                  action !== "Save" && setAction("Save");
                  // setValue( name: "", serviceType: "" );
                  reset();
                }}
              >
                Add +
              </Button>
            </div>
            <Table striped responsive bordered className="border-end border-1">
              <thead>
                <tr>
                  <td>#</td>
                  <th>Medical Condition</th>
                  <th>Relation</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {familyHistories?.map((fh, index) => (
                  <tr
                    key={fh.id}
                    className="curserpointer"
                    // style={{ cursor: "pointer" }}
                    onClick={() => {
                      //   setSelectedfh(fh);
                      !showForm && setShowForm(true);
                      action === "Save" && setAction("Update");
                      setValue("id", fh.id);
                      setValue("medical_condition", fh.medical_condition);
                      let other_relationship = "";
                      let relationship;
                      if (
                        ["Father", "Mother", "Sister", "Brother"].includes(
                          fh.relationship
                        )
                      ) {
                        relationship = fh.relationship;
                        other_relationship = "";
                      } else {
                        relationship = "Other";
                        other_relationship = fh.relationship;
                      }
                      setValue("relationship", relationship);
                      setValue("other_relationship", other_relationship);
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{fh.medical_condition}</td>
                    <td>{fh.relationship}</td>
                    <td>{fh.reaction_details}</td>
                    <td>
                      <div
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Are you sure you want to Remove")) {
                            deleteHandler(fh.id);
                          }
                        }}
                      >
                        <FaTrash color="red" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={5} className="mt-md-9 mt-3">
            {showForm && (
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Form.Group className="mb-3">
                  <Form.Label>Medical Condition</Form.Label>
                  <Form.Control
                    {...register("medical_condition")}
                    isInvalid={errors.medical_condition}
                    type="text"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.medical_condition?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Relationship</Form.Label>
                  <Form.Select
                    {...register("relationship")}
                    isInvalid={errors.relationship}
                  >
                    <option value="">Please Select</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    ["Father","Mother","Sister","Brother"]
                    <option value="Other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.relationship?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {relationshipWatcher === "Other" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Relationship Type</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("other_relationship")}
                      isInvalid={errors.other_relationship}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.other_relationship?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // onClick={handleClose}
                    disabled={isPending}
                  >
                    {isPending && <Spinner size="sm" animation="border" />}
                    {action}
                  </button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Modal.Body>

      {/* <ServiceGroupDeactivateModal
        show={showDeactiveModal.isShow}
        handleClose={setShowDeactiveModal}
        id={showDeactiveModal.id}
        action={showDeactiveModal.action}
      /> */}
      {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
        </Modal.Footer> */}
    </Modal>
  );
};

export default AddPatientFamilyHistoryModal;
