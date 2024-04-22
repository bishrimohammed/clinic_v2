import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const ViewServiceItemDetail = ({ show, handleClose, action, serviceItem }) => {
  console.log(serviceItem);
  console.log(show);
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton className="py-2 px-md-4 px-3">
        <Modal.Title>View Item Details</Modal.Title>
        {/* <p>Service Name: {serviceItem.service_name}</p> */}
      </Modal.Header>
      <Modal.Body>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Item Name</p>
            <p className="small">{serviceItem.service_name}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Group</p>
            <p className="small">{serviceItem.serviceCategory.name}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Price</p>
            <p className="small ">{serviceItem.price}</p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">is Price Fixed?</p>
            <p className="small">{serviceItem.isFixed ? "Yes" : "No"}</p>
          </Col>
        </Row>
        <Row className="px-3">
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold ">Unit</p>
            <p className="small ps-1">
              {serviceItem.unit ? (
                serviceItem.unit
              ) : (
                <span className="text-danger">__</span>
              )}
            </p>
          </Col>
          <Col sm={6} className="px-4">
            <p className="mb-0 text-muted fw-bold">Status</p>
            <p className="small">
              {serviceItem.status ? "Active" : "Inactive"}
            </p>
          </Col>
        </Row>
      </Modal.Body>

      {/* <div className="d-flex justify-content-end gap-3 p-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant={action === "Activate" ? "success" : "danger"}
          // disabled={deactiveMutation.isPending || activateMutation.isPending}
          // onClick={clickHandler}
        >
         
          {action}
        </Button>
      </div> */}
    </Modal>
  );
};

export default ViewServiceItemDetail;
