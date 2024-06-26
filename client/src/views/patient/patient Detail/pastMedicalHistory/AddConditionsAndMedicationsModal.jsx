import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaCirclePlus, FaTrash } from "react-icons/fa6";
import * as yup from "yup";
import { useAddCurrentMedication } from "../../hooks/ConditionsAndMedicationsHooks/useAddCurrentMedication";
import { useAddPastMedicalHistory } from "../../hooks/ConditionsAndMedicationsHooks/useAddPastMedicalHistory";
import { useAddDiscontinuedMedication } from "../../hooks/ConditionsAndMedicationsHooks/useAddDiscontinuedMedication";
import { useDeleteCurrentMedication } from "../../hooks/ConditionsAndMedicationsHooks/useDeleteCurrentMedication";
import { useDeletePastMedicalHistory } from "../../hooks/ConditionsAndMedicationsHooks/useDeletePastMedicalHistory";
import { useDeleteDiscontinuedMedication } from "../../hooks/ConditionsAndMedicationsHooks/useDeleteDiscontinuedMedication";
import { useUpdateCurrentMedication } from "../../hooks/ConditionsAndMedicationsHooks/UseUpdateCurrentMedication";
import { useUpdatePastMedicalHistory } from "../../hooks/ConditionsAndMedicationsHooks/useUpdatePastMedicalHistory";
import { useUpdateDiscontinuedmedication } from "../../hooks/ConditionsAndMedicationsHooks/useUpdateDiscontinuedmedication";
// import { updateDiscontinuedMedication } from "../../../../../../api/controllers/patient/ConditionsAndMedicationController";
// import { UseUpdateCurrentMedication } from "../../hooks/ConditionsAndMedicationsHooks/UseUpdateCurrentMedication";
const ConditionsAndMedicationsSchema = yup.object().shape({
  formType: yup
    .string()
    .oneOf([
      "",
      "currentMedication",
      "discontinuedMedication",
      "previousMedication",
    ])
    .default("")
    .required(),
  //   currentmedication: yup.object().shape({
  currentmedication_condition: yup
    .string()
    .transform((value) => value.trim())
    .when("formType", ([formType], schema) => {
      if (formType === "currentMedication") {
        return schema.required("Condition is required");
      }
      return schema.nullable();
    }),
  currentmedication_treatment: yup
    .string()
    .transform((value) => value.trim())
    .when(["formType"], ([formType], schema) => {
      if (formType == "currentMedication") {
        return schema.required("Treatment is required");
      }
      return schema.nullable();
    }),
  //   }),
  //   discontinuedmedication: yup.object().shape({
  discontinuedmedication_medicationName: yup
    .string()
    .transform((value) => value.trim())
    //   .required("Medication name is required")
    .when("formType", ([formType], schema) => {
      if (formType === "discontinuedMedication") {
        return schema.required("Medication name is required");
      }
      return schema.nullable();
    }),

  // treatment: yup.string(),
  //   }),
  //   pastmedicalHistory: yup.object().shape({
  pastmedicalHistory_condition: yup
    .string()
    .transform((value) => value.trim())
    .when("formType", ([formType], schema) => {
      if (formType === "previousMedication") {
        return schema.required("Condition is required");
      }
      return schema.nullable();
    }),
  pastmedicalHistory_treatment: yup
    .string()
    .transform((value) => value.trim())
    .when("formType", ([formType], schema) => {
      if (formType === "previousMedication") {
        return schema.required("Treatment is required");
      }
      return schema.nullable();
    }),
  //   }),
  showForm: yup.boolean().default(false),
});
const AddConditionsAndMedicationsModal = ({
  show,
  handleClose,
  currentmedications,
  discontinued_medications,
  pastmedicalHistories,
  patientId,
  medicalRecordId,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [action, setAction] = useState("Save");
  const [formType, setFormType] = useState("");
  const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  // add
  const addcurrentMedicationMutation = useAddCurrentMedication();
  const addPastMedicalHistoryMutation = useAddPastMedicalHistory();
  const addDiscontinuedMedicationMutation = useAddDiscontinuedMedication();
  // delete

  const deleteCurrentMedication = useDeleteCurrentMedication();
  const deletePastMedicalHistory = useDeletePastMedicalHistory();
  const deleteDiscontinuedMedicationMutation =
    useDeleteDiscontinuedMedication();

  // update
  const updatecurrentMutation = useUpdateCurrentMedication();
  const updatePastMedicalHistory = useUpdatePastMedicalHistory();
  const updateDiscontinuedmedication = useUpdateDiscontinuedmedication();
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessState("");
      setErrorState("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successState, errorState]);
  const {
    register,
    reset,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ConditionsAndMedicationsSchema),
  });
  let isPending =
    addDiscontinuedMedicationMutation.isPending ||
    addPastMedicalHistoryMutation.isPending ||
    addcurrentMedicationMutation.isPending ||
    deleteCurrentMedication.isPending ||
    deleteDiscontinuedMedicationMutation.isPending ||
    deletePastMedicalHistory.isPending ||
    updateDiscontinuedmedication.isPending ||
    updatecurrentMutation.isPending ||
    updatePastMedicalHistory.isPending;
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    if (action === "Save") {
      // if(data.formType==="previousMedication")
      switch (data.formType) {
        case "previousMedication":
          const newPastMedicalHistory = {
            condition: data.pastmedicalHistory_condition,
            treatment: data.pastmedicalHistory_treatment,
          };
          addPastMedicalHistoryMutation
            .mutateAsync({ newPastMedicalHistory, patientId })
            .then((res) => {
              if (res.status === 201) {
                setSuccessState("Previous Medication added successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });

          break;
        case "currentMedication":
          const formData = {
            condition: data.currentmedication_condition,
            treatment: data.currentmedication_treatment,
          };
          const medicalRecord_id = medicalRecordId;
          addcurrentMedicationMutation
            .mutateAsync({
              formData,
              medicalRecord_id,
            })
            .then((res) => {
              if (res.status === 201) {
                setSuccessState("Current Medication added successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });
          break;
        case "discontinuedMedication":
          const newDiscontinuedMedication = {
            medicationName: data.discontinuedmedication_medicationName,
          };
          // const medicalRecord_id = medicalRecordId;
          addDiscontinuedMedicationMutation
            .mutateAsync({ newDiscontinuedMedication, medicalRecordId })
            .then((res) => {
              if (res.status === 201) {
                setSuccessState("Discontinued Medication added successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });

          break;

        default:
          break;
      }
    } else if (action === "Update") {
      switch (data.formType) {
        case "previousMedication":
          const newPastMedicalHistory = {
            condition: data.pastmedicalHistory_condition,
            treatment: data.pastmedicalHistory_treatment,
          };
          updatePastMedicalHistory
            .mutateAsync({
              newPastMedicalHistory,
              patientId,
              id: data.pastmedicalHistoryId,
            })
            .then((res) => {
              if (res.status === 200) {
                setSuccessState("Previous Medication updated successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });

          break;
        case "currentMedication":
          const formData = {
            condition: data.currentmedication_condition,
            treatment: data.currentmedication_treatment,
          };
          // const medicalRecord_id = medicalRecordId;
          updatecurrentMutation
            .mutateAsync({
              formData,
              medicalRecordId,
              id: data.currentMedicationId,
            })
            .then((res) => {
              if (res.status === 200) {
                setSuccessState("Current Medication updated successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });
          break;
        case "discontinuedMedication":
          const newDiscontinuedMedication = {
            medicationName: data.discontinuedmedication_medicationName,
          };
          // const medicalRecord_id = medicalRecordId;
          updateDiscontinuedmedication
            .mutateAsync({
              newDiscontinuedMedication,
              medicalRecordId,
              id: data.discontinuedMedicationId,
            })
            .then((res) => {
              if (res.status === 200) {
                setSuccessState("Discontinued Medication added successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              setErrorState(err?.response?.data?.message);
            });

          break;

        default:
          break;
      }
    }
  };
  const deleteHandler = (target, id) => {
    if (target === "currentMedication") {
      deleteCurrentMedication
        .mutateAsync({ id, medicalRecordId })
        .then((res) => {
          if (res.status === 200) {
            setSuccessState("Current Medication deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorState(err?.response?.data?.message);
        });
    } else if (target === "previousMedication") {
      deletePastMedicalHistory
        .mutateAsync({ id, patientId })
        .then((res) => {
          if (res.status === 200) {
            setSuccessState("Previous Medication deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorState(err?.response?.data?.message);
        });
    } else if (target === "discontinuedMedication") {
      deleteDiscontinuedMedicationMutation
        .mutateAsync({ id, medicalRecordId })
        .then((res) => {
          if (res.status === 200) {
            setSuccessState("Discontinued Medication deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorState(err?.response?.data?.message);
        });
    }
  };

  return (
    <Modal
      style={{ zIndex: 1999 }}
      size="lg"
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title> Condition and Medication</Modal.Title>
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
            <div className="d-flex flex-column gap-2">
              <div>
                {" "}
                <div className="d-flex align-items-center w-100  py-1">
                  <h6 className="mb-0 align-self-bottom text-bottom">
                    Current Medication
                  </h6>
                  <button
                    variant="primary"
                    className="border-0 bg-transparent"
                    onClick={() => {
                      setValue("showForm", true);
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      setValue("formType", "currentMedication");
                      formType !== "currentMedication" &&
                        setFormType("currentMedication");
                      setValue("currentmedication_condition", "");
                      setValue("currentmedication_treatment", "");
                    }}
                  >
                    <FaCirclePlus />
                  </button>
                  {/* <Button
                    className=" btn-sm "
                    onClick={() => {
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      // setValue( name: "", serviceType: "" );
                      reset();
                    }}
                  >
                    +Add
                  </Button> */}
                </div>
                <Table
                  striped
                  responsive
                  bordered
                  className="border-end border-1"
                >
                  <thead>
                    <tr>
                      <td>#</td>
                      <th>Condition</th>
                      <th>Treatment</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentmedications?.map((cm, index) => (
                      <tr
                        key={cm.id}
                        className="curserpointer"
                        // style={{ cursor: "pointer" }}
                        onClick={() => {
                          //   setSelectedAllergy(allergy);
                          !showForm && setShowForm(true);
                          action === "Save" && setAction("Update");

                          formType !== "currentMedication" &&
                            setFormType("currentMedication");
                          getValues("formType") !== "currentMedication" &&
                            setValue("formType", "currentMedication");
                          setValue("currentMedicationId", cm.id);
                          setValue("currentmedication_condition", cm.condition);
                          setValue("currentmedication_treatment", cm.treatment);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{cm.condition}</td>
                        <td>{cm.treatment}</td>
                        {/* <td>{cm.reaction_details}</td> */}
                        <td>
                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Are you sure you want to Remove")) {
                                deleteHandler("currentMedication", cm.id);
                              }
                              // setShowDeactiveModal({
                              //   isShow: true,
                              //   id: group.id,
                              //   action: "Activate",
                              // });
                            }}
                          >
                            <FaTrash color="red" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <div>
                {" "}
                <div className="d-flex align-items-center w-100  py-1">
                  <h6 className="mb-0">Discontinue Medication</h6>
                  <button
                    variant="primary"
                    className="border-0 bg-transparent"
                    onClick={() => {
                      setValue("showForm", true);
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      setValue("formType", "discontinuedMedication");
                      formType !== "discontinuedMedication" &&
                        setFormType("discontinuedMedication");
                      setValue("discontinuedmedication_medicationName", "");
                    }}
                  >
                    <FaCirclePlus />
                  </button>
                  {/* <Button
                    className=" btn-sm "
                    onClick={() => {
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      // setValue( name: "", serviceType: "" );
                      reset();
                    }}
                  >
                    +Add
                  </Button> */}
                </div>
                <Table
                  striped
                  responsive
                  bordered
                  className="border-end border-1"
                >
                  <thead>
                    <tr>
                      <td>#</td>
                      <th>Medication Name</th>
                      {/* <th>Treatment</th> */}
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discontinued_medications?.map((dm, index) => (
                      <tr
                        key={dm.id}
                        className="curserpointer"
                        // style={{ cursor: "pointer" }}
                        onClick={() => {
                          //   setSelectedAllergy(allergy);
                          !showForm && setShowForm(true);
                          action === "Save" && setAction("Update");

                          formType !== "discontinuedMedication" &&
                            setFormType("discontinuedMedication");
                          getValues("formType") !== "discontinuedMedication" &&
                            setValue("formType", "discontinuedMedication");

                          setValue("discontinuedMedicationId", dm.id);
                          setValue(
                            "discontinuedmedication_medicationName",
                            dm.medication_name
                          );
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{dm.medication_name}</td>
                        {/* <td>{dm.treatment}</td> */}
                        {/* <td>{cm.reaction_details}</td> */}
                        <td>
                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Are you sure you want to Remove")) {
                                deleteHandler("discontinuedMedication", dm.id);
                              }
                              // setShowDeactiveModal({
                              //   isShow: true,
                              //   id: group.id,
                              //   action: "Activate",
                              // });
                            }}
                          >
                            <FaTrash color="red" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                {" "}
                <div className="d-flex align-items-center w-100  py-1">
                  <h6 className="mb-0 align-self-bottom text-bottom">
                    Previous Medication
                  </h6>
                  <button
                    // variant="primary"
                    className="border-0 bg-transparent"
                    onClick={() => {
                      setValue("showForm", true);
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      setValue("formType", "previousMedication");
                      formType !== "previousMedication" &&
                        setFormType("previousMedication");
                      setValue("pastmedicalHistory_condition", "");
                      setValue("pastmedicalHistory_treatment", "");
                    }}
                  >
                    <FaCirclePlus />
                  </button>
                  {/* <Button
                    className=" btn-sm "
                    onClick={() => {
                      !showForm && setShowForm(true);
                      action !== "Save" && setAction("Save");
                      // setValue( name: "", serviceType: "" );
                      reset();
                    }}
                  >
                    +Add
                  </Button> */}
                </div>
                <Table
                  striped
                  responsive
                  bordered
                  className="border-end border-1"
                >
                  <thead>
                    <tr>
                      <td>#</td>
                      <th>Condition</th>
                      <th>Treatment</th>
                      <th>Remove</th>
                      {/* <th>Reaction details</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {pastmedicalHistories?.map((previousMedication, index) => (
                      <tr
                        key={previousMedication.id}
                        className="curserpointer"
                        // style={{ cursor: "pointer" }}
                        onClick={() => {
                          //   setSelectedAllergy(allergy);
                          !showForm && setShowForm(true);
                          action === "Save" && setAction("Update");
                          formType !== "previousMedication" &&
                            setFormType("previousMedication");
                          getValues("formType") !== "previousMedication" &&
                            setValue("formType", "previousMedication");
                          setValue(
                            "pastmedicalHistoryId",
                            previousMedication.id
                          );
                          setValue(
                            "pastmedicalHistory_condition",
                            previousMedication.medical_condition
                          );
                          setValue(
                            "pastmedicalHistory_treatment",
                            previousMedication.treatment
                          );
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{previousMedication.medical_condition}</td>
                        <td>{previousMedication.treatment}</td>
                        {/* <td>{previousMedication.reaction_details}</td> */}
                        <td>
                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Are you sure you want to Remove")) {
                                deleteHandler(
                                  "previousMedication",
                                  previousMedication.id
                                );
                              }
                              // setShowDeactiveModal({
                              //   isShow: true,
                              //   id: group.id,
                              //   action: "Activate",
                              // });
                            }}
                          >
                            <FaTrash color="red" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <Col md={5} className="mt-md-9 mt-3">
            {showForm && (
              <Form onSubmit={handleSubmit(submitHandler)}>
                {formType === "currentMedication" && (
                  <>
                    <h6 className=" pb-1">
                      <span className="border-bottom border-dark">
                        Current Medication
                      </span>
                    </h6>
                    <Form.Group>
                      <Form.Label>Medical condition</Form.Label>
                      <Form.Control
                        {...register("currentmedication_condition")}
                        isInvalid={errors.currentmedication_condition}
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.currentmedication_condition?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Treatment </Form.Label>
                      <Form.Control
                        {...register("currentmedication_treatment")}
                        isInvalid={errors.currentmedication_treatment}
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.currentmedication_treatment?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
                {formType === "discontinuedMedication" && (
                  <>
                    <h6 className=" pb-1">
                      <span className="border-bottom border-dark">
                        Discontinue Medication
                      </span>
                    </h6>
                    <Form.Group>
                      <Form.Label>Medication Name</Form.Label>
                      <Form.Control
                        {...register("discontinuedmedication_medicationName")}
                        isInvalid={
                          errors?.discontinuedmedication_medicationName
                        }
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.discontinuedmedication_medicationName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
                {formType == "previousMedication" && (
                  <>
                    <h6 className=" pb-1">
                      <span className="border-bottom border-dark">
                        Previous Medication
                      </span>
                    </h6>
                    <Form.Group>
                      <Form.Label>Medical condition</Form.Label>
                      <Form.Control
                        {...register("pastmedicalHistory_condition")}
                        isInvalid={errors?.pastmedicalHistory_condition}
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pastmedicalHistory_condition?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Treatment </Form.Label>
                      <Form.Control
                        {...register("pastmedicalHistory_treatment")}
                        isInvalid={errors.pastmedicalHistory_treatment}
                        type="text"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pastmedicalHistory_treatment?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}
                {/* <Form.Group className="mb-3">
                  <Form.Label>Allergy Type</Form.Label>
                  <Form.Control
                    {...register("allergy_type")}
                    isInvalid={errors.allergy_type}
                    type="text"
                    placeholder="Enter Allergies"
                    // defaultValue={
                    //   action === "Save" ? "" : selectedAllergy.allergy_type
                    // }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.allergy_type?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Severity</Form.Label>
                  <Form.Select
                    {...register("severity")}
                    isInvalid={errors.severity}
                    // defaultValue={
                    //   action === "Save" ? "" : selectedAllergy.severity
                    // }
                  >
                    <option value="">Please Select</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.severity?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Reaction details</Form.Label>
                  <Form.Control
                    {...register("reaction_details")}
                    type="text"
                    placeholder="Enter reaction"
                  />
                </Form.Group> */}
                <div className="d-flex justify-content-end gap-2 mt-2">
                  {/* <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button> */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // disabled={
                    //   addAllergyMutation.isPending ||
                    //   updateAllergyMutation.isPending
                    // }
                    disabled={isPending}
                    // onClick={handleClose}
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

export default AddConditionsAndMedicationsModal;
