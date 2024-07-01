import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useGetActiveVitalSignFields } from "./hooks/useGetActiveVitalSignFields";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAddTriage } from "./hooks/useAddTriage";

const vitalSignSchema = yup.object().shape({
  vitals: yup.array().of(
    yup.object().shape({
      vitalId: yup.number(),
      name: yup.string(),
      value: yup.string().when("name", ([name], schema) => {
        return schema.required(name + "  is required");
      }),
    })
  ),
});
const AddVitalSignModal = ({ show, handleClose }) => {
  const { data } = useGetActiveVitalSignFields();
  const { state } = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(vitalSignSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    // defaultValues: {
    //   vitals: [
    //     {
    //       vitalId: 0,
    //       name: "",
    //       value: "",
    //     },
    //   ],
    // },
  });
  const { mutateAsync } = useAddTriage();
  // console.log(data);
  const submitHandler = (data) => {
    // console.log(data);

    // handleClose();
    const vitals = data.vitals.map((v) => {
      return {
        vitalSignField_id: v.vitalId,
        // name: v.name,
        result: v.value,
        // medicalRecord_id: state.id,
      };
    });
    console.log(vitals);
    mutateAsync({
      medicalRecord_id: state.id,
      vitals,
    })
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(errors);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Vital Sign</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            {data?.map((field, index) => (
              <Col key={field.id} md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>{field.name}</Form.Label>
                  <input
                    type="hidden"
                    {...register(`vitals[${index}].vitalId`)}
                    value={field.id}
                  />
                  <input
                    type="hidden"
                    {...register(`vitals[${index}].name`)}
                    value={field.name}
                  />
                  <Form.Control
                    type="number"
                    {...register(`vitals[${index}].value`)}
                    placeholder={field.name}
                    isInvalid={errors?.vitals?.[index]?.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.vitals?.[index]?.value?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Control type="text" placeholder={field.name} /> */}
              </Col>
            ))}
            <Col md={4} sm={12} className="mb-2"></Col>
          </Row>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVitalSignModal;
