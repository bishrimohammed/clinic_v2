/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Axiosinstance from "../../../../api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AxiosHeaders } from "../../../../api/useAxiosHeaders";

const AddPaymentModal = (props) => {
  const AmountRef = useRef();
  const paymentNoteRef = useRef();
  const queryClient = useQueryClient();
  const { historyId } = useParams();
  const header = AxiosHeaders();
  // console.log(props);
  const paymetMutation = useMutation({
    mutationFn: async (data) => {
      // eslint-disable-next-line react/prop-types
      return Axiosinstance.post(`/bill/${props.bill._id}`, data, { ...header });
    },
    onSuccess: () => {
      toast.success("Payment is added");
      queryClient.invalidateQueries({
        queryKey: ["billdetail", historyId],
        exact: true,
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
      //props.handleClose();
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const amount_to_pay = AmountRef.current.value;
    const paymentNote = paymentNoteRef.current.value;

    const paymentLeft = props.bill.totalAmount - props.bill.TotalpaidAmount;
    if (amount_to_pay != paymentLeft) {
      alert("You can't pay more or less than the bill left");
      return;
    }
    const paymentData = {
      paidamount: amount_to_pay,
      paymentNote,
    };
    console.log(paymentData);
    paymetMutation.mutateAsync(paymentData).then((res) => {
      if (res.status === 201) {
        props.handleClose();
      }
    });
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <AddPaymentService handleClose={closeModal} /> */}
        <div>
          <Form onSubmit={submitHandler}>
            <Row className="pb-1">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <span className=" ms-1 text-danger text-center">* </span>
                  <Form.Control
                    ref={AmountRef}
                    required={true}
                    defaultValue={
                      props?.bill?.totalAmount - props?.bill?.TotalpaidAmount
                    }
                    type="number"
                    placeholder="Enter..."
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <span className=" ms-1 text-danger text-center">* </span>
                  <Form.Control
                    ref={paymentNoteRef}
                    required={true}
                    type="text"
                    placeholder="Enter..."
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer className="pb-0">
              <Button variant="secondary" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit" /* onClick={props.handleClose} */
              >
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddPaymentModal;
