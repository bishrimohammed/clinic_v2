import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useSettlePayments } from "../hooks/useSettlePayments";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const SettleAllPaymentButton = ({
  medicalBillingId,
  has_advanced_payment,
  payments,
  billId,
}) => {
  const [showConfrimModal, setShowConfirmModal] = useState(false);
  const { mutateAsync, isPending } = useSettlePayments();
  const queryClient = useQueryClient();
  // console.log(payments.every((payment) => payment.status === "Paid"));
  return (
    <>
      <button
        onClick={() => {
          setShowConfirmModal(true);
        }}
        disabled={
          !has_advanced_payment ||
          payments.every((payment) => payment.status === "Paid")
        }
        className="btn btn-sm btn-success ms-2"
      >
        Settle Payment
      </button>
      <Modal
        show={showConfrimModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        backdrop="static"
        size="sm"
      >
        <Modal.Body>
          Are you sure you want to settle all payments for this patient?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Close
          </Button>
          <Button
            disabled={isPending}
            variant="primary"
            onClick={() => {
              mutateAsync(medicalBillingId)
                .then(() => {
                  // toast.success("Payment settled successfully!");
                  setShowConfirmModal(false);
                })
                .catch((err) => {
                  toast.error(err.response.data.message, {
                    // delay: 5000,
                  });
                  setShowConfirmModal(false);
                  queryClient.invalidateQueries({
                    queryKey: ["Medical Billing", billId],
                  });
                });
            }}
          >
            {isPending && <Spinner size="sm" />} Settle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettleAllPaymentButton;
