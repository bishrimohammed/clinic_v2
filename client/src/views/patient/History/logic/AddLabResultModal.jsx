/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
// import { toast } from "react-toastify";
// import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAddLabResult } from "../investigation/hooks/useAddLabResult";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  labresults: yup
    .array()
    .of(
      yup.object().shape({
        orderId: yup.number(),
        result: yup.string().required("Result is required"),
        comment: yup.string(),
      })
    )
    .required("Lab is required"),
});
const AddResult = ({ handleClose, lab, labId }) => {
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const currentUser = useSelector((state) => state.auth.user);

  const { mutateAsync, isPending } = useAddLabResult();
  console.log(lab);

  const onSubmit = (data) => {
    console.log(data);
    mutateAsync({ data, labId }).then((res) => {
      console.log(res);
      if (res.status === 201) return handleClose();
    });
  };
  return (
    <Container>
      <Form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>id</th>
              <th>Test Name</th>
              <th>Result Value</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {lab.map((t, index) => (
              <tr key={index}>
                <td>{t.id}</td>
                <td>
                  <Form.Control
                    className="mb-1"
                    type="number"
                    name={`labresults[${index}].orderId`}
                    value={t.id}
                    // ref={register()}
                    {...register(`labresults[${index}].orderId`)}
                    hidden={true}
                  />
                  {t.test.service_name}
                </td>

                <td>
                  <Form.Group className="my-0">
                    <Form.Control
                      // name={t.test.service_name + "-" + "value"}
                      type="text"
                      placeholder="result"
                      // ref={register()}
                      {...register(`labresults[${index}].result`)}
                      className="my-0"
                      defaultValue={t.result && t.result}
                      isInvalid={errors?.labresults?.[index]?.result}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.labresults?.[index]?.result?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="my-0" controlId="formControlsTextarea">
                    <Form.Control
                      name={`labresults[${index}].comment`}
                      // ref={register()}
                      {...register(`labresults[${index}].comment`)}
                      type="text"
                      placeholder="comment"
                      className="my-0"
                      isInvalid={errors?.labresults?.[index]?.comment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.errors?.labresults?.[index]?.comment?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal.Footer style={{ justifyContent: "initial" }}>
          <div className="d-flex w-100  justify-content-end">
            <Button
              variant="primary"
              // disabled={filledTest.length === 0 || isPending}
              className="w-100"
              // onClick={submitHandler}
              type="submit"
            >
              {/* {isPending && <Spinner animation="border" size="sm" />} */}
              Submit Result
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Container>
  );
};

const AddLabResultModal = (props) => {
  console.log(props);
  const closeModal = () => {
    props.handleClose();
  };
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Laboratory Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddResult
          labId={props.labId}
          lab={props.lab}
          handleClose={closeModal}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AddLabResultModal;
