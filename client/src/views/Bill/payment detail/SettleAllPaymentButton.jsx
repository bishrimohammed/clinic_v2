import React, { useMemo, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useSettlePayments } from "../hooks/useSettlePayments";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const settleAllPaymentSchema = yup.object().shape({
  unpaidPayments: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      value: yup.boolean(),
    })
  ),
});

const SettleAllPaymentButton = ({
  medicalBillingId,
  has_advanced_payment,
  payments,
  billId,
}) => {
  const [showConfrimModal, setShowConfirmModal] = useState(false);
  const unpaidPayments = payments.filter(
    (payment) => payment.status === "Unpaid"
  );

  const { mutateAsync, isPending } = useSettlePayments();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(settleAllPaymentSchema),
  });
  // console.log(payments);
  // console.log(unpaidPayments);
  const submitHandler = (data) => {
    console.log(data);
    const formData = data.unpaidPayments
      .filter((payment) => {
        return payment.value;
      })
      .map((p) => p.id);
    mutateAsync({ medicalBillingId: medicalBillingId, paymentIds: formData })
      .then(() => {
        // toast.success("Payment settled successfully!");
        setShowConfirmModal(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          // delay: 5000,
        });
        setShowConfirmModal(false);
        // queryClient.invalidateQueries({
        //   queryKey: ["Medical Billing", billId],
        // });
      });
    // console.log(formData);
  };
  // console.log(errors);
  return (
    <>
      <button
        onClick={() => {
          setShowConfirmModal(true);
        }}
        disabled={
          !has_advanced_payment ||
          payments.some((payment) => payment.status === "Unaid")
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
        // size="sm"
      >
        <Modal.Body>
          {/* Are you sure you want to settle all payments for this patient? */}
          Select Unpaid Payments
          <Form
            id="formId"
            className="mt-2"
            onSubmit={handleSubmit(submitHandler)}
          >
            <Form.Group>
              {/* <Form.Label>Select Unpaid Payments</Form.Label> */}

              {unpaidPayments.map((payment, index) => (
                <>
                  <Form.Check
                    key={payment.id}
                    type="checkbox"
                    label={payment.item.service_name}
                    {...register(`unpaidPayments[${index}].value`)}
                    // name={`unpaidPayments.${index}`}
                    // value={payment.id}
                  />
                  <input
                    type="hidden"
                    key={index}
                    value={payment.id}
                    {...register(`unpaidPayments[${index}].id`)}
                  />
                </>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Close
          </Button>
          <Button
            // target="formId"
            form="formId"
            type="submit"
            disabled={isPending}
            variant="primary"
            // onClick={() => {
            //   mutateAsync(medicalBillingId)
            //     .then(() => {
            //       // toast.success("Payment settled successfully!");
            //       setShowConfirmModal(false);
            //     })
            //     .catch((err) => {
            //       toast.error(err.response.data.message, {
            //         // delay: 5000,
            //       });
            //       setShowConfirmModal(false);
            //       queryClient.invalidateQueries({
            //         queryKey: ["Medical Billing", billId],
            //       });
            //     });
            // }}
          >
            {isPending && <Spinner size="sm" />} Settle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettleAllPaymentButton;
