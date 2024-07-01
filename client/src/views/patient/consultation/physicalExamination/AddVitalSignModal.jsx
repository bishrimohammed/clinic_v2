import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useGetActiveVitalSignFields } from "../../../patient visit/hooks/useGetActiveVitalSignFields";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAddVitalSign } from "../../hooks/consultationHooks/useAddVitalSign";
import { toast } from "react-toastify";
const vitalSignSchema = yup.object().shape({
  // physicalExaminations: yup.array().of(
  //   yup.object().shape({
  //     physicalExaminationId: yup.number().required(),
  //     name: yup.string(),
  //     value: yup
  //       .string()
  //       .transform((value) => value.trim())
  //       .when("name", ([name], schema) => {
  //         return schema.required(name + "  is required");
  //       }),
  //   })
  // ),
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
const AddVitalSignModal = ({ show, handleClose, medicalRecordId }) => {
  const { data: VitalSignFields } = useGetActiveVitalSignFields();
  const { mutateAsync } = useAddVitalSign();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(vitalSignSchema),
    mode: "onBlur",
    // reValidateMode: "onChange",
    // shouldFocusError: true,
    // defaultValues: {
    //   physicalExaminations: PhysicalExaminationFields,
    //   vitals: VitalSignFields,
    // },
  });
  const submitHandler = (data) => {
    console.log(data);
    const Data = {
      vitalData: data,
      medicalRecordId: medicalRecordId,
    };
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrorState(err?.response?.data?.message);
        toast.error(err.response.data.message);
      });

    // handleClose();
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Vital Sign</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="vitalForm" onSubmit={handleSubmit(submitHandler)}>
          <Row>
            {VitalSignFields?.map((field, index) => (
              <Col key={field.id} md={4} sm={12} className="">
                <Form.Group className="mb-3">
                  <Form.Label>
                    {field.name}
                    {String(field.name).toLowerCase() === "weight"
                      ? "(Kg)"
                      : String(field.name).toLowerCase() === "height"
                      ? "(cm)"
                      : null}{" "}
                  </Form.Label>
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
                    //   placeholder={field.name}
                    isInvalid={errors?.vitals?.[index]?.value}
                    // defaultValue={getVitalDefaultValue(field.id)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.vitals?.[index]?.value?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} type="button">
          Close
        </Button>
        <Button form="vitalForm" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVitalSignModal;
