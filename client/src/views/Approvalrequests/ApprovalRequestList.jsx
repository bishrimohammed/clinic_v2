import React, { useState } from "react";
import { useGetPendingApprovalRequest } from "./hooks/useGetPendingApprovalRequest";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { useApprove } from "./hooks/useApprove";
import { useReject } from "./hooks/useReject";

const ApprovalRequestList = () => {
  const { data } = useGetPendingApprovalRequest();
  const [showConfirmModal, setShowConfirmModal] = useState({
    show: false,
    action: "",
    approvalRequestId: null,
  });
  const approveMutation = useApprove();
  const rejectMutation = useReject();
  // console.log(data[0]);
  return (
    <div>
      <Table bordered responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Approval Type</th>
            <th>Requester</th>
            <th>Current Level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((request, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{request.approvalSetting.name}</td>
              <td>
                {request.requestedBy.employee.firstName}{" "}
                {request.requestedBy.employee.middleName}{" "}
              </td>
              <td>level {request.current_approval_level}</td>
              <td>{request.status}</td>
              <td className="d-flex gap-1">
                <Button
                  onClick={() => {
                    // approveMutation.mutateAsync(request.id);
                    // window.location.reload(false)
                    setShowConfirmModal({
                      action: "Approve",
                      approvalRequestId: request.id,
                      show: true,
                    });
                  }}
                  className="btn-sm"
                  variant="success"
                >
                  Approve
                </Button>
                <Button
                  className="btn-sm"
                  variant="danger"
                  onClick={() => {
                    setShowConfirmModal({
                      action: "Reject",
                      approvalRequestId: request.id,
                      show: true,
                    });
                  }}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
          {/* <tr>
            <td>1</td>
            <td>Patient Registration</td>
            <td>John Doe</td>
            <td>Pending</td>
            <td className="d-flex gap-1">
              <Button className="btn-sm" variant="success">
                Approve
              </Button>
              <Button className="btn-sm" variant="danger">
                Decline
              </Button>
            </td>
          </tr> */}
        </tbody>
      </Table>
      <Modal
        size="sm"
        show={showConfirmModal.show}
        onHide={() => {
          setShowConfirmModal({
            show: false,
            action: "",
            approvalRequestId: null,
          });
        }}
        centered
        backdrop="static"
      >
        <Modal.Body>
          Are you sure you want to {showConfirmModal.action} this approval
          request?
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              variant="secondary"
              onClick={() => {
                // alert("jhvkhgv");
                setShowConfirmModal({
                  show: false,
                  action: "",
                  approvalRequestId: null,
                });
              }}
              // disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              {/* {(approveMutation.isPending || rejectMutation.isPending) && (
                <Spinner size="sm" />
              )} */}
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                {
                  showConfirmModal.action === "Approve"
                    ? approveMutation
                        .mutateAsync(showConfirmModal.approvalRequestId)
                        .then((res) => {
                          setShowConfirmModal({
                            show: false,
                            action: "",
                            approvalRequestId: null,
                          });
                        })
                    : null;
                }
                // approveMutation.mutateAsync(showConfirmModal.approvalRequestId);
                // setShowConfirmModal({
                //   show: false,
                //   action: "",
                //   approvalRequestId: null,
                // });
              }}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              {(approveMutation.isPending || rejectMutation.isPending) && (
                <Spinner size="sm" />
              )}
              {/* {showConfirmModal.action === "Approve" ? "Approve" : "Reject"} */}
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApprovalRequestList;
