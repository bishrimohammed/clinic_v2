import React, { useEffect, useMemo, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useAddPatientSocialHistory } from "../../hooks/patientHooks/useAddPatientSocialHistory";
// import { Form } from "react-router-dom";
import * as yup from "yup";
import { useAddPatientSocialHistory } from "../../hooks/patientHooks/useAddPatientSocialHistory";
import { useDeleteSocialHistory } from "../../hooks/patientHooks/useDeleteSocialHistory";
import { useUpdateSocialHistory } from "../../hooks/patientHooks/useUpdateSocialHistory";
import { FaTrash } from "react-icons/fa6";
const socialHistorySchema = yup.object().shape({
  tobacco_use: yup.string().required("Tobacco Use is required"),
  alcohol_use: yup.string().required("Alcohol Use is required"),
});
const AddPatientSocialHistoryModal = ({
  show,
  handleClose,
  patientId,
  socialHistories,
}) => {
  const addSocialHistory = useAddPatientSocialHistory();
  const updateSocialHistory = useUpdateSocialHistory();
  const deleteSocialHistory = useDeleteSocialHistory();
  const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  const [action, setAction] = useState("Save");
  const [showForm, setShowForm] = useState(false);
  // console.log(socialHistories);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(socialHistorySchema),
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessState("");
      setErrorState("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorState, successState]);
  // const submitHandler = (data) => {
  //   const Data = {
  //     newSocialHistory: data,
  //     patientId: patientId,
  //   };
  //   mutateAsync(Data)
  //     .then((res) => {
  //       if (res.status === 201) {
  //         handleClose();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       const errors = err.response.data.message;
  //       if (Array.isArray(errors)) {
  //         errors.map((err) => {
  //           const msg = err.message;
  //           // console.log(err.path);
  //           // console.log(err.message);
  //           // setError(err.path, msg.join(""));
  //         });
  //       } else {
  //         // console.log(err);
  //         const errors = err.response.data.message;
  //       }
  //     });
  // };

  const submitHandler = (data) => {
    // console.log(data);
    // return;
    // const Data = {
    //   newSocialHistory: {
    //     medical_condition: data.medical_condition,
    //     relationship:
    //       data.relationship !== "Other"
    //         ? data.relationship
    //         : data.other_relationship,
    //   },
    //   patientId: patientId,
    // };
    const Data = {
      newSocialHistory: data,
      patientId: patientId,
    };
    if (action === "Save") {
      addSocialHistory
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
      updateSocialHistory
        .mutateAsync({
          formData: Data.newSocialHistory,
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
    deleteSocialHistory
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
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Patient Social History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label> Tobacco use</Form.Label>
            <Form.Select
              {...register("tobacco_use")}
              isInvalid={errors.tobacco_use}
            >
              <option value={""}>Please Select</option>
              <option value="Current smoker">Smoker</option>
              <option value="Former smoker">Former Smoker</option>
              <option value="Non-smoker">Non-smoker</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tobacco_use?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alcohol use</Form.Label>
            <Form.Control
              {...register("alcohol_use")}
              isInvalid={errors.alcohol_use}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {errors.alcohol_use?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              // onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary "
              // onClick={handleClose}
            >
              Save
            </button>
          </div>
        </Form> */}
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
                  <th>Tobacco</th>
                  <th>Alcohol</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {socialHistories?.map((SH, index) => (
                  <tr
                    key={SH.id}
                    className="curserpointer"
                    // style={{ cursor: "pointer" }}
                    onClick={() => {
                      //   setSelectedSH(SH);
                      !showForm && setShowForm(true);
                      action === "Save" && setAction("Update");

                      // setValue("id", SH.id);
                      setValue("alcohol_use", SH.alcohol_use);

                      setValue("tobacco_use", SH.tobacco_use);
                      setValue("id", SH.id);
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{SH.tobacco_use}</td>
                    <td>{SH.alcohol_use} times a day</td>
                    {/* <td>{SH.reaction_details}</td> */}
                    <td>
                      <div
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Are you sure you want to Remove")) {
                            deleteHandler(SH.id);
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
                  <Form.Label> Tobacco use</Form.Label>
                  <Form.Select
                    {...register("tobacco_use")}
                    isInvalid={errors.tobacco_use}
                  >
                    <option value={""}>Please Select</option>
                    <option value="Current smoker">Smoker</option>
                    <option value="Former smoker">Former Smoker</option>
                    <option value="Non-smoker">Non-smoker</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tobacco_use?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alcohol use</Form.Label>
                  <Form.Control
                    {...register("alcohol_use")}
                    isInvalid={errors.alcohol_use}
                    type="text"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.alcohol_use?.message}
                  </Form.Control.Feedback>
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
                    // onClick={handleClose}
                    // disabled={isPending}
                  >
                    {/* {isPending && <Spinner size="sm" animation="border" />} */}
                    {action}
                  </button>
                </div>
              </Form>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddPatientSocialHistoryModal;
