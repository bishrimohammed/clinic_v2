import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useDeactivateService } from "../hooks/useDeactivateService";
import { useActivateService } from "../hooks/useActivateService";
import { useDeactivateServiceItem } from "../hooks/service item/useDeactivateServiceItem";
import { useActivateServiceItem } from "../hooks/service item/useActivateServiceItem";
// import { useDeactivateService } from "./hooks/useDeactivateService";
// import { useActivateService } from "./hooks/useActivateService";

const DeactivateServiceItemModal = ({
  show,
  handleClose,
  id,
  action,
  serviceId,
}) => {
  const deactiveMutation = useDeactivateServiceItem();
  const activateMutation = useActivateServiceItem();
  //   console.log("hello");
  //   console.log(show);
  console.log(serviceId);
  const clickHandler = () => {
    console.log(action);
    // return;
    if (action === "Activate") {
      activateMutation.mutateAsync(id).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else {
      deactiveMutation.mutateAsync(id).then(async (res) => {
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
      <Modal.Body>{`Are you sure you want to ${action} Service?`}</Modal.Body>

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

export default DeactivateServiceItemModal;
