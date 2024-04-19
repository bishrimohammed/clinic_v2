import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDeactivateServiceGroup } from "../hooks/service group/useDeactivateServiceGroup";
import { useActivateServiceGroup } from "../hooks/service group/useActivateServiceGroup";

const ServiceGroupDeactivateModal = ({
  show,
  handleClose,
  id,
  action,
  serviceId,
}) => {
  const deactiveMutation = useDeactivateServiceGroup();
  const activateMutation = useActivateServiceGroup();
  // const deactiveServiceItemMutation = useDeactivateServiceItem();
  // const activateServiceItemMutation = useActivateServiceItem();
  console.log(action);
  const clickHandler = () => {
    if (action === "Deactivate") {
      deactiveMutation.mutateAsync(id).then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
    } else if (action === "Activate") {
      activateMutation.mutateAsync(id).then(async (res) => {
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
      style={{ zIndex: 9999 }}
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

export default ServiceGroupDeactivateModal;
