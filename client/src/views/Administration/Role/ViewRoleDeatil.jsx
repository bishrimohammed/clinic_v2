import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

const ViewRoleDeatil = ({ show, handleClose, role }) => {
  console.log(role);
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>View Role Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-2">
          <div>
            <span className="fw-bold">Role Name : </span> {role.name}
          </div>
          <div>
            <span className="fw-bold">Status : </span>{" "}
            {role.status ? "Active" : "Inactive"}
          </div>
          <span className="fw-bold ">Permissions :</span>{" "}
          <Table className="mt-1" bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Permission Name</th>
                <th>Create</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {role.permissions.map((permission, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{permission.name}</td>
                  {permission.rolepermission?.create ? (
                    <td>Yes</td>
                  ) : (
                    <td>No</td>
                  )}
                  {/* {permission.rolepermission?.create ? <td>Yes</td> : <td>No</td>} */}
                  {permission.rolepermission?.update ? (
                    <td>Yes</td>
                  ) : (
                    <td>No</td>
                  )}
                  {permission.rolepermission?.delete ? (
                    <td>Yes</td>
                  ) : (
                    <td>No</td>
                  )}
                  {permission.rolepermission?.read ? <td>Yes</td> : <td>No</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewRoleDeatil;
