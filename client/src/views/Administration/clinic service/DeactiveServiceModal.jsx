import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeactivateService } from "./hooks/useDeactivateService";

const DeactiveServiceModal = ({ show, handleClose, serviceId }) => {
  const deactiveMutation = useDeactivateService();
  console.log("hello");
  console.log(show);
  const clickHandler = () => {
    deactiveMutation.mutateAsync(serviceId).then(async (res) => {
      if (res.status === 200) {
        // await refetch();
        handleClose(false);
      }
    });
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>{`Are you sure you want to Deactivate Service?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={deactiveMutation.isPending}
          onClick={clickHandler}
        >
          {deactiveMutation.isPending && (
            <Spinner animation="border" size="sm" />
          )}
          Deactivate
        </Button>
      </div>
    </Modal>
  );
};

export default DeactiveServiceModal;
