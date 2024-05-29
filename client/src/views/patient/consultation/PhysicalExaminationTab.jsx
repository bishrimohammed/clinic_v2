import React from "react";
import { useGetActiveVitalSignFields } from "../../patient visit/hooks/useGetActiveVitalSignFields";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useGetAcvtivePhysicalExamination } from "../../patient visit/hooks/useGetAcvtivePhysicalExamination";
import { useGetPhysicalExamination } from "../hooks/consultationHooks/useGetPhysicalExamination";
import { useLocation } from "react-router-dom";
import { useAddPhysicalExamination } from "../hooks/consultationHooks/useAddPhysicalExamination";

const physicalExaminationSchema = yup.object().shape({
  physicalExaminations: yup.array().of(
    yup.object().shape({
      physicalExaminationId: yup.number().required(),
      name: yup.string(),
      value: yup
        .string()
        .transform((value) => value.trim())
        .when("name", ([name], schema) => {
          return schema.required(name + "  is required");
        }),
    })
  ),
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
const PhysicalExaminationTab = () => {
  const { data: PhysicalExaminationFields } =
    useGetAcvtivePhysicalExamination();
  const { data: VitalSignFields } = useGetActiveVitalSignFields();
  const { state } = useLocation();
  const { data, isPending: PhysicalExaminationPending } =
    useGetPhysicalExamination(state.medicalRecord_id);
  const { mutateAsync, isPending } = useAddPhysicalExamination();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(physicalExaminationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    // defaultValues: {
    //   physicalExaminations: PhysicalExaminationFields,
    //   vitals: VitalSignFields,
    // },
  });
  const submitHandler = (data) => {
    console.log(data);
    mutateAsync({
      medicalRecordId: state.medicalRecord_id,
      formData: data,
    });
  };
  if (PhysicalExaminationPending) return <Spinner />;
  const getPhysicalExaminationDefaultValue = (id) => {
    const physicalExamination = data?.physicalExamination.find(
      (physicalExamination) =>
        physicalExamination.physical_ExaminationField_id === id
    );
    return physicalExamination?.value;
  };
  const getVitalDefaultValue = (id) => {
    const vital = data?.vital.find((vital) => vital.vitalSignField_id === id);
    return vital?.result;
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(submitHandler)} className="px-4">
        <Row>
          <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
            Physical Examination
          </h5>
          {PhysicalExaminationFields?.map((field, index) => (
            <Col key={field.id} md={4} sm={12} className="">
              <Form.Group className="mb-3">
                <Form.Label>{field.name}</Form.Label>
                <input
                  type="hidden"
                  {...register(
                    `physicalExaminations[${index}].physicalExaminationId`
                  )}
                  value={field.id}
                />
                <input
                  type="hidden"
                  {...register(`physicalExaminations[${index}].name`)}
                  value={field.name}
                />
                <Form.Control
                  type="text"
                  {...register(`physicalExaminations[${index}].value`)}
                  //   placeholder={field.name}
                  defaultValue={getPhysicalExaminationDefaultValue(field.id)}
                  isInvalid={errors?.physicalExaminations?.[index]?.value}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.physicalExaminations?.[index]?.value?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Control type="text" placeholder={field.name} /> */}
            </Col>
          ))}

          <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
            Vital Signs
          </h5>
          {VitalSignFields?.map((field, index) => (
            <Col key={field.id} md={4} sm={12} className="">
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
                  //   placeholder={field.name}
                  isInvalid={errors?.vitals?.[index]?.value}
                  defaultValue={getVitalDefaultValue(field.id)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.vitals?.[index]?.value?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Control type="text" placeholder={field.name} /> */}
            </Col>
          ))}
        </Row>
        <div className=" d-flex justify-content-end gap-2">
          <Button
            // form="traigeForm"
            // formTarget="traigeForm"
            type="submit"
            variant="success"
            disabled={isPending}
          >
            {isPending && <Spinner size="sm" animation="border" />}
            {data ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PhysicalExaminationTab;
