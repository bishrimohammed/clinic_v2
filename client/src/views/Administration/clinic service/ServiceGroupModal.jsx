import React, { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useGetServiceGroups } from "./hooks/useGetServiceGroups";
import * as yup from "yup";
import { useGetClinicService } from "./hooks/useGetClinicService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddServiceGroup } from "./hooks/service group/UseAddServiceGroup";
import { useEditServiceGroup } from "./hooks/service group/useEditServiceGroup";
import { FaLock, FaUnlock, FaUserLock } from "react-icons/fa6";
import ServiceGroupDeactivateModal from "./service group/ServiceGroupDeactivateModal";
import { useDeactivateServiceGroup } from "./hooks/service group/useDeactivateServiceGroup";
import { useActivateServiceGroup } from "./hooks/service group/useActivateServiceGroup";
import { useQueryClient } from "@tanstack/react-query";
const schema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Service Group Name is required"),
  serviceType: yup.string().required("Service Group Type is required"),
});
const ServiceGroupModal = ({ show, handleClose }) => {
  const { state } = useLocation();
  // console.log(state);
  const [action, setAction] = useState("Save");
  const [selectedServiceGroup, setSelectedServiceGroup] = useState(null);
  const { data: services } = useGetClinicService();
  const { data: groups } = useGetServiceGroups(state.id);
  const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    // isShow: false,
    id: null,
    action: "",
  });
  const deactiveMutation = useDeactivateServiceGroup();
  const activateMutation = useActivateServiceGroup();
  // console.log(showDeactiveModal);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //   name: action === "Save" ? "" : selectedServiceGroup.name,
    },
    resolver: yupResolver(schema),
  });
  const addGroupMutation = useAddServiceGroup();
  const updateGroupMutation = useEditServiceGroup();
  //   console.log(selectedServiceGroup);
  const queryClient = useQueryClient();
  const submitHandler = (data) => {
    console.log(data);
    if (action === "Save") {
      addGroupMutation
        .mutateAsync({ name: data.name, clinicService_id: data.serviceType })
        .then((res) => {
          if (res.status === 201) {
            //   handleClose(false);
            setAction("Save");
            setSelectedServiceGroup(null);
            setSuccessState("Service Group Created Successfully");
          } else {
            setErrorState(res.data.message);
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    } else {
      const Data = {
        serviceGroupId: selectedServiceGroup.id,
        serviceGroupData: {
          name: data.name,
          clinicService_id: data.serviceType,
        },
      };
      updateGroupMutation
        .mutateAsync(Data)
        .then((res) => {
          if (res.status === 200) {
            //   handleClose(false);
            setAction("Save");
            setSelectedServiceGroup(null);
            setSuccessState("Service Group Updated Successfully");
            reset({ name: "", serviceType: "" });
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    }
    // return;
    // mutate(data);
  };

  const active_And_DeactiveHandler = (id, action) => {
    // console.log(action);
    // return;
    if (action === "Deactivate") {
      deactiveMutation
        .mutateAsync(id)
        .then(async (res) => {
          if (res.status === 200) {
            // await refetch();
            queryClient.invalidateQueries({
              queryKey: ["ServiceGroups", state.id],
              exact: true,
            });
            setSuccessState("Service group is deactivated successfully");
            // handleClose(false);
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    } else if (action === "Activate") {
      activateMutation
        .mutateAsync(id)
        .then(async (res) => {
          if (res.status === 200) {
            queryClient.invalidateQueries({
              queryKey: ["ServiceGroups", state.id],
              exact: true,
            });
            setSuccessState("Service group is activated successfully");
            // await refetch();
            // handleClose(false);
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    }
  };
  return (
    <>
      <Modal
        style={{ zIndex: 1999 }}
        size="xl"
        show={show}
        onHide={() => handleClose(false)}
      >
        <Modal.Header className="p" closeButton>
          <Modal.Title className="text-nowrap"> Service Groups</Modal.Title>
          <div className="d-flex justify-content-center w-100 me-3">
            <Button
              className="me-5"
              onClick={() => {
                setShowForm(true);
                setAction("Save");
                // setValue( name: "", serviceType: "" );
                setValue("name", "");
                setValue("serviceType", "");
              }}
            >
              Add +
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {successState && (
            <Alert variant="success" dismissible="true">
              {successState}
            </Alert>
          )}
          {errorState && (
            <Alert variant="danger" dismissible="true">
              {errorState}
            </Alert>
          )}

          <Row>
            <Col md={7}>
              <Table
                striped
                responsive
                bordered
                className="border-end border-1"
              >
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Service Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groups?.map((group) => (
                    <tr
                      key={group.id}
                      className="curserpointer"
                      // style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedServiceGroup(group);
                        setShowForm(true);
                        setAction("Update");
                        setValue("name", group.name);
                        setValue("serviceType", group.clinicService_id);
                      }}
                    >
                      <td>{group.name}</td>
                      <td>{group.clinicService.service_name}</td>
                      <td>
                        {group.status ? (
                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm("Are you sure you want to Deactivate")
                              ) {
                                active_And_DeactiveHandler(
                                  group.id,
                                  "Deactivate"
                                );
                              }
                            }}
                          >
                            <FaLock color="red" />
                          </div>
                        ) : (
                          <div
                            role="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm("Are you sure you want to Activate")
                              ) {
                                active_And_DeactiveHandler(
                                  group.id,
                                  "Activate"
                                );
                              }
                              // setShowDeactiveModal({
                              //   isShow: true,
                              //   id: group.id,
                              //   action: "Activate",
                              // });
                            }}
                          >
                            <FaUnlock color="green" />
                          </div>
                        )}
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
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      //   required
                      type="text"
                      placeholder="Group Name"
                      {...register("name")}
                      defaultValue={
                        action === "Save" ? "" : selectedServiceGroup.name
                      }
                      isInvalid={errors.name}

                      //   name="groupName"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Service Type</Form.Label>
                    <Form.Select
                      type="text"
                      placeholder="Service Type"
                      disabled={true}
                      name="serviceType"
                      {...register("serviceType")}
                      value={state.id}
                      isInvalid={errors.serviceType}
                    >
                      <option value="">Please Select</option>
                      {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.service_name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.serviceType?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                />
              </Form.Group> */}
                  <div className="d-flex justify-content-end mt-2">
                    <Button variant="primary" type="submit">
                      {action}
                    </Button>
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
      {showDeactiveModal.isShow && (
        <ServiceGroupDeactivateModal
          id={showDeactiveModal.id}
          action={showDeactiveModal.action}
          handleClose={() => setShowDeactiveModal({ isShow: false })}
        />
      )}
    </>
  );
};

export default ServiceGroupModal;
