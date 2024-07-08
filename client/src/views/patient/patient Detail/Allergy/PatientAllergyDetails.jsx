import { useQueryClient } from "@tanstack/react-query";
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
import { FaLock, FaTrash, FaUnlock } from "react-icons/fa6";
// import { useEditServiceGroup } from "../../../Administration/clinic service/hooks/service group/useEditServiceGroup";
// import { useAddServiceGroup } from "../../../Administration/clinic service/hooks/service group/UseAddServiceGroup";
import { useForm } from "react-hook-form";
// import { useDeactivateServiceGroup } from "../../../Administration/clinic service/hooks/service group/useDeactivateServiceGroup";
// import { useActivateServiceGroup } from "../../../Administration/clinic service/hooks/service group/useActivateServiceGroup";
import { useGetServiceGroups } from "../../../Administration/clinic service/hooks/useGetServiceGroups";
import { useGetClinicService } from "../../../Administration/clinic service/hooks/useGetClinicService";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useAddPatientAllergy } from "../../hooks/patientHooks/useAddPatientAllergy";
import { useDeleteAllergy } from "../../hooks/allergyHooks/useDeleteAllergy";
import { useUpdateAllergy } from "../../hooks/allergyHooks/useUpdateAllergy";
// import { useUpdateAllergy } from "../../hooks/allergyHooks/useUpdateAllergy";
// import { useUpdateAllergy } from "../../hooks/allergyHooks/useUpdateAllergy";

const allergySchema = yup.object().shape({
  id: yup.number(),
  allergy_type: yup.string().required("Allergy type is required"),
  severity: yup.string().required("Severity is required").default(""),
  reaction_details: yup.string(),
});
const PatientAllergyDetails = ({ show, handleClose, allergies, patientId }) => {
  const { state } = useLocation();
  // console.log(state);

  // const [selectedAllergy, setSelectedAllergy] = useState(null);
  // const { data: services } = useGetClinicService();
  // const { data: groups } = useGetServiceGroups(state.id);
  const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  const [action, setAction] = useState("Save");
  const [showForm, setShowForm] = useState(false);
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    // isShow: false,
    id: null,
    action: "",
  });
  //   const deactiveMutation = useDeactivateServiceGroup();
  const addAllergyMutation = useAddPatientAllergy();
  const deleteAllergyMutation = useDeleteAllergy();
  const updateAllergyMutation = useUpdateAllergy();
  //add useeffect timer to remove successState and errorState after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessState("");
      setErrorState("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successState, errorState]);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //   name: action === "Save" ? "" : selectedAllergy.name,
    },
    resolver: yupResolver(allergySchema),
  });

  //   console.log(selectedAllergy);
  // const queryClient = useQueryClient();
  const submitHandler = (data) => {
    // console.log(data);
    if (action === "Save") {
      const Data = {
        newAllergy: {
          allergy_type: data.allergy_type,
          severity: data.severity,
          reaction_details: data.reaction_details,
        },
        patientId: patientId,
      };
      addAllergyMutation
        .mutateAsync(Data)
        .then((res) => {
          if (res.status === 201) {
            //   handleClose(false);
            reset();
            setAction("Save");
            // setSelectedAllergy(null);
            setSuccessState("Patient allergy added successfully");
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    } else {
      const Data = {
        allergyId: data.id,
        patientId,
        formData: {
          allergy_type: data.allergy_type,
          severity: data.severity,
          reaction_details: data.reaction_details,
        },
      };
      console.log(Data);
      //   return;
      updateAllergyMutation
        .mutateAsync(Data)
        .then((res) => {
          if (res.status === 200) {
            //   handleClose(false);
            setAction("Save");
            // setSelectedAllergy(null);
            setSuccessState("Patient allergy updated Successfully");
            reset();
            // reset({ name: "", serviceType: "" });
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    }
    // return;
    // mutate(data);
  };

  const deleteAllergyHandler = (id) => {
    // console.log(action);
    // return;
    deleteAllergyMutation
      .mutateAsync({ id, patientId })
      .then((res) => {
        if (res.status === 200) {
          setSuccessState("Patient allergy deleted successfully");
        }
      })
      .catch((err) => {
        setErrorState(err.response.data.message);
      });
    // if (action === "Deactivate") {
    //   deactiveMutation
    //     .mutateAsync(id)
    //     .then(async (res) => {
    //       if (res.status === 200) {
    //         // await refetch();
    //         queryClient.invalidateQueries({
    //           queryKey: ["ServiceGroups", state.id],
    //           exact: true,
    //         });
    //         setSuccessState("Service group is deactivated successfully");
    //         // handleClose(false);
    //       }
    //     })
    //     .catch((err) => {
    //       setErrorState(err.response.data.message);
    //     });
    // } else if (action === "Activate") {
    //   activateMutation
    //     .mutateAsync(id)
    //     .then(async (res) => {
    //       if (res.status === 200) {
    //         queryClient.invalidateQueries({
    //           queryKey: ["ServiceGroups", state.id],
    //           exact: true,
    //         });
    //         setSuccessState("Service group is activated successfully");
    //         // await refetch();
    //         // handleClose(false);
    //       }
    //     })
    //     .catch((err) => {
    //       setErrorState(err.response.data.message);
    //     });
    // }
  };

  //   console.log(allergies);
  return (
    <Modal
      style={{ zIndex: 1999 }}
      size="lg"
      show={show}
      onHide={() => handleClose(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title> Allergies</Modal.Title>
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
                  <th>Allergy Type</th>
                  <th>Severity</th>
                  <th>Reaction details</th>
                </tr>
              </thead>
              <tbody>
                {allergies?.map((allergy, index) => (
                  <tr
                    key={allergy.id}
                    className="curserpointer"
                    // style={{ cursor: "pointer" }}
                    onClick={() => {
                      //   setSelectedAllergy(allergy);
                      !showForm && setShowForm(true);
                      action === "Save" && setAction("Update");
                      setValue("id", allergy.id);
                      setValue("allergy_type", allergy.allergy_type);
                      setValue("severity", allergy.severity);
                      setValue("reaction_details", allergy.reaction_details);
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{allergy.allergy_type}</td>
                    <td>{allergy.severity}</td>
                    <td>{allergy.reaction_details}</td>
                    <td>
                      <div
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Are you sure you want to Remove")) {
                            deleteAllergyHandler(allergy.id);
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
          </Col>
          <Col md={5} className="mt-md-9 mt-3">
            {showForm && (
              <Form onSubmit={handleSubmit(submitHandler)}>
                <Form.Group className="mb-3">
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
                </Form.Group>
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
                    disabled={
                      addAllergyMutation.isPending ||
                      updateAllergyMutation.isPending
                    }
                    // onClick={handleClose}
                  >
                    {(addAllergyMutation.isPending ||
                      updateAllergyMutation.isPending) && (
                      <Spinner size="sm" animation="border" />
                    )}
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

export default PatientAllergyDetails;
