import React from "react";
import { Button, Modal } from "react-bootstrap";

const ViewProgressNoteDetail = ({
  show,
  handleClose,
  progressNoteId,
  progressNote,
}) => {
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Progress Note Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="d-flex  pb-1"
          // style={{ borderBottomStyle: "dashed" }}
        >
          <span className="fw-bold mb-2 pe-2 pb-1 text-nowrap ">
            Problem List{" : "}
          </span>
          <p className="pe-4 ps-1">{progressNote.problem_list}</p>
        </div>
        <div
          className="d-flex pb-1"
          // style={{ borderBottomStyle: "dashed" }}
        >
          <span className="fw-bold mb-2  pe-2 pb-1 text-nowrap ">
            Current Management{" : "}
          </span>
          <p className="pe-4 ps-1">
            {progressNote.current_management}
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Praesentium laborum minima temporibus illum cupiditate magnam
            officiis dolorem quia expedita deleniti! */}
          </p>
        </div>

        {/* plan */}

        <div
          className="d-flex pb-1"
          // style={{ borderBottomStyle: "dashed" }}
        >
          <span className="fw-bold mb-2 border-bottom pe-2 pb-1 text-nowrap ">
            Plan{" :"}
          </span>
          <p className="pe-4 ps-1"> {progressNote.plan}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProgressNoteDetail;
