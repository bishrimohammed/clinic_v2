import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useActivateCreditCompany } from "./hooks/useActivateCreditCompany";
import { useDeactivateCreditCompany } from "./hooks/useDeactivateCreditCompany";

const ActivateDiactivateCreditCompanyModal = ({
  show,
  handleClose,
  companyId,
  action,
}) => {
  const openMutation = useActivateCreditCompany();
  const closeMutation = useDeactivateCreditCompany();
  // console.log(action);
  console.log(closeMutation.isPending);
  const handleSubmit = async () => {
    if (action === "Close") {
      closeMutation.mutateAsync(companyId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    } else {
      openMutation.mutateAsync(companyId).then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      });
    }
  };
  return (
    // <Modal show={show} onHide={() => handleClose(false)}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Update Credit Company</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>{action}</Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={() => handleClose(false)}>Close</Button>
    //     <Button onClick={() => handleClose(false)}>Update</Button>
    //   </Modal.Footer>
    // </Modal>
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose(false)}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>{`Are you sure you want to ${
        action === "Close" ? "close the agreement" : "open the agreement"
      } with the company?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Open" ? "success" : "danger"}
          disabled={closeMutation.isPending || openMutation.isPending}
          onClick={handleSubmit}
        >
          {(closeMutation.isPending || openMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action === "Close" ? "Ok" : "open"}
        </Button>
      </div>
    </Modal>
  );
};

export default ActivateDiactivateCreditCompanyModal;
