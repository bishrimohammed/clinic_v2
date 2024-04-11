import React from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { Host_URL } from "../../utils/getHost_URL";

const ViewUser = ({ show, handleClose, user }) => {
  //   console.log(user);
  return (
    <Modal show={show} onHide={() => handleClose(false)} className="p-0">
      <Modal.Header closeButton>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="d-flex flex-column">
          <div>
            <div className="px-3 py-1 d-flex">
              <div className="d-flex gap-3 align-items-center p-2">
                <Image
                  className="rounded-circle"
                  //   src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  src={Host_URL + user.employee.photo}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  alt=""
                  roundedCircle
                  width={80}
                  height={80}
                />
                <div className="d-flex flex-column  justify-content-center align-items-start">
                  <h5 className=" mb-0">
                    {user.employee.firstName +
                      " " +
                      user.employee.middleName +
                      " " +
                      user.employee.lastName}
                  </h5>
                  <p className="mb-0 text-muted mt-1">{user.username}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-2" />
          <h6 className="border-bottom pt-1 pb-2 ps-2 mx-3 mb-3 ">
            Account Information
          </h6>{" "}
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Full Name</p>
              <p className="small">
                {user.employee.firstName} {user.employee.middleName}{" "}
                {user.employee.lastName}
              </p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Username</p>
              <p className="small">{user.username}</p>
            </Col>
          </Row>
          {/* <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Phone</p>
              <p className="small mb-3">{user.employee.address.phone_1}</p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Email</p>
              <p className="small mb-0">{user.email}</p>
            </Col>
          </Row> */}
          <Row className="px-3">
            <Col className="px-4">
              <p className="mb-0 text-muted">Role</p>
              <p className="small">
                {user.role.name.charAt(0).toUpperCase() +
                  user.role.name.slice(1)}
              </p>
            </Col>
            <Col className="px-4">
              <p className="mb-0 text-muted">Status</p>
              <p className="small mb-0">
                {user.status ? "Active" : "Inactive"}
              </p>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewUser;
