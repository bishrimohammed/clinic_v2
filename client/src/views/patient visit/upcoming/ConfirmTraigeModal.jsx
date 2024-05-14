import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useStartTraige } from "../hooks/useStartTraige";
import { useFinishTraige } from "../hooks/useFinishTraige";

const ConfirmTraigeModal = ({ show, handleClose, visitId, action }) => {
  const startTraige = useStartTraige();
  const finishTraige = useFinishTraige();
  const clickHandler = () => {
    if (action.toLowerCase() === "start") {
      startTraige.mutateAsync(visitId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    } else if (action.toLowerCase() === "finish") {
      finishTraige.mutateAsync(visitId).then((res) => {
        if (res.status === 200) {
          handleClose();
        }
      });
    }
    //   handleClose()
  };
  return (
    <Modal
      size="sm"
      show={show}
      onHide={() => handleClose()}
      backdrop="static"
      centered
    >
      <Modal.Body>{`Are you sure you want to ${action} traige for this visit?`}</Modal.Body>

      <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose()}>
          Exit
        </Button>
        <Button
          //   variant={"danger"}
          disabled={startTraige.isPending || finishTraige.isPending}
          onClick={clickHandler}
        >
          {(startTraige.isPending || finishTraige.isPending) && (
            <Spinner animation="border" size="sm" />
          )}
          {action} Traige
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmTraigeModal;
