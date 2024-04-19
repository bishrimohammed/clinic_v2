import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeactivateService } from "./hooks/useDeactivateService";
import { useActivateService } from "./hooks/useActivateService";

const DeactiveServiceModal = ({ show, handleClose, serviceId, action }) => {
  const deactiveMutation = useDeactivateService();
  const activateMutation = useActivateService();
  console.log("hello");
  console.log(show);
  const clickHandler = () => {
    if (action === "Activate") {
      activateMutation.mutateAsync(serviceId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else {
      deactiveMutation.mutateAsync(serviceId).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    }
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
          variant={action === "Activate" ? "success" : "danger"}
          disabled={deactiveMutation.isPending || activateMutation.isPending}
          onClick={clickHandler}
        >
          {(deactiveMutation.isPending || activateMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action}
        </Button>
      </div>
    </Modal>
  );
};

export default DeactiveServiceModal;
