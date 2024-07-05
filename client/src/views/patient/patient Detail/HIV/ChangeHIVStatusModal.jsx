import React, { useEffect, useRef, useState } from "react";
import { Alert, Form, Modal, Spinner } from "react-bootstrap";
import { useUpdateHIVStatus } from "../../hooks/patientHooks/useUpdateHIVStatus";
import { toast } from "react-toastify";
const ChangeHIVStatusModal = ({ show, handleClose, patientId, status }) => {
  const { mutateAsync, isPending } = useUpdateHIVStatus();
  // console.log(status);
  const statusRef = useRef(status);
  //   const [successState, setSuccessState] = useState("");
  const [errorState, setErrorState] = useState("");
  // console.log(patientId);
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorState("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorState]);
  const changeHandler = () => {
    // console.log(statusRef.current.value);
    mutateAsync({
      formData: { status: statusRef.current.value },
      patientId,
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message);
          handleClose(false);
        }
      })
      .catch((err) => {
        console.log(err);
        const error = err.response.data.message;
        console.log(error);
        setErrorState(error);
        // toast.error(error);
        // setError("action", {
        //   type: "error",
        //   message: error,
        // });
        // console.log(err.response.data.message);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change HIV Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {successState && <Alert variant="success">{successState}</Alert>} */}
        {errorState && (
          <Alert variant="danger" dismissible="true">
            {errorState}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>has HIV</Form.Label>
            <Form.Control as="select" ref={statusRef} defaultValue={status}>
              {/* {status.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))} */}
              {/* <option value="">Please Select</option> */}
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={isPending}
          onClick={changeHandler}
        >
          {isPending && <Spinner size="sm" />}
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeHIVStatusModal;
