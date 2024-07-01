import React, { useEffect, useState } from "react";
import { useGetActiveVitalSignFields } from "../../patient visit/hooks/useGetActiveVitalSignFields";
import * as yup from "yup";
import { format, parseISO } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useGetAcvtivePhysicalExamination } from "../../patient visit/hooks/useGetAcvtivePhysicalExamination";
import { useGetPhysicalExamination } from "../hooks/consultationHooks/useGetPhysicalExamination";
import { useLocation } from "react-router-dom";
import { useAddPhysicalExamination } from "../hooks/consultationHooks/useAddPhysicalExamination";
import { useGetVitalSigns } from "../hooks/consultationHooks/useGetVitalSigns";
import AddVitalSignModal from "./physicalExamination/AddVitalSignModal";
import AddVitalSignButton from "./physicalExamination/AddVitalSignButton";
import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { unlockTreatment } from "../../../store/consultationSlice";
import { useDispatch } from "react-redux";

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
  // vitals: yup.array().of(
  //   yup.object().shape({
  //     vitalId: yup.number(),
  //     name: yup.string(),
  //     value: yup.string().when("name", ([name], schema) => {
  //       return schema.required(name + "  is required");
  //     }),
  //   })
  // ),
  selectedTests: yup.array().of(yup.number()),
  indirectlySelectedLabs: yup.array().of(yup.number()),
});
const PhysicalExaminationTab = React.forwardRef((props, ref) => {
  const { data: PhysicalExaminationFields } =
    useGetAcvtivePhysicalExamination();
  // const { data: VitalSignFields } = useGetActiveVitalSignFields();
  const { state } = useLocation();
  const { data, isPending: PhysicalExaminationPending } =
    useGetPhysicalExamination(state.medicalRecord_id);
  const { data: vitalSigns } = useGetVitalSigns(state.medicalRecord_id);
  const { data: lab_investigation, error } = useOrdered_Lab_Investigations(
    state.medicalRecord_id
  );
  const { mutateAsync, isPending } = useAddPhysicalExamination();
  const [showAddVitalSignModa, setShowAddVitalSignModal] = useState(false);
  const dispatch = useDispatch();
  // console.log(data);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
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
  useEffect(() => {
    // [].length
    if (data?.length > 0) {
      // console.log("aejgbakjhvbgh");
      dispatch(unlockTreatment());
    }
  }, [dispatch, data]);
  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  const submitHandler = (data) => {
    console.log(data);
    // return;
    mutateAsync({
      medicalRecordId: state.medicalRecord_id,
      formData: data,
    }).then((res) => {
      if (res.status === 201) {
        reset();
      }
    });
  };
  // console.log("rere");
  if (PhysicalExaminationPending) return <Spinner />;
  const getPhysicalExaminationDefaultValue = (id) => {
    const physicalExamination = data?.physicalExamination.find(
      (physicalExamination) =>
        physicalExamination.physical_ExaminationField_id === id
    );
    return physicalExamination?.value;
  };
  // const getVitalDefaultValue = (id) => {
  //   const vital = data?.vital.find((vital) => vital.vitalSignField_id === id);
  //   return vital?.result;
  // };
  const vitalSignFieldNames = Array.from(
    new Set(
      vitalSigns?.flatMap((item) =>
        item.vitalResults.map((result) => {
          if (String(result.vitalSignField.name).includes(" ")) {
            return result.vitalSignField.name
              .split(" ")
              .map(
                (word) => word.charAt(0).toUpperCase()
                // console.log(word)
              )
              .join("");
          } else {
            return result.vitalSignField.name;
          }
        })
      )
    )
  );

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Form
        id="examination"
        onSubmit={handleSubmit(submitHandler)}
        className="px-4 mb-3"
      >
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
                  // defaultValue={getPhysicalExaminationDefaultValue(field.id)}
                  isInvalid={errors?.physicalExaminations?.[index]?.value}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.physicalExaminations?.[index]?.value?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Control type="text" placeholder={field.name} /> */}
            </Col>
          ))}

          {/* <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
            Vital Signs
          </h5> */}
          <Accordion defaultActiveKey="0" className="px-0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Vital Signs</Accordion.Header>
              <Accordion.Body className="px-0">
                <div className="d-flex justify-content-end mb-2 me-2">
                  {/* <Button
                    onClick={() => {
                      setShowAddVitalSignModal(true);
                    }}
                  >
                    +Add Vital Sign
                  </Button> */}
                  <AddVitalSignButton />
                </div>
                {vitalSigns?.length > 0 && (
                  <Table bordered striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date Taken</th>
                        <th>Examiner</th>
                        {vitalSignFieldNames.map((name, index) => (
                          <th key={index}>{name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vitalSigns?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {format(
                              parseISO(item.taken_date),
                              "MM/dd/yyyy, h:mm a"
                            )}
                          </td>
                          <td>{`${item.examiner.employee.firstName} ${item.examiner.employee.middleName}`}</td>
                          {vitalSignFieldNames.map((name, i) => {
                            const result = item.vitalResults.find((r) => {
                              const fieldName = String(r.vitalSignField.name);
                              if (fieldName.includes(" ")) {
                                return (
                                  fieldName
                                    .split(" ")
                                    .map((word) => word.charAt(0).toUpperCase())
                                    .join("") === name
                                );
                              } else {
                                return r.vitalSignField.name === name;
                              }
                            });
                            return (
                              <td key={i}>{result ? result.result : "-"}</td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Accordion.Body>
            </Accordion.Item>
            {/* <Accordion.Item eventKey="1" className="mt-2">
              <Accordion.Header>Investigations</Accordion.Header>
              <Accordion.Body>
                {" "}
                <OrderedLabInvestigationTable
                  investigations={lab_investigation?.orderedTest}
                  getValues={getValues}
                  setValue={setValue}
                  // watch={watch}
                />
              </Accordion.Body>
            </Accordion.Item> */}
          </Accordion>

          {/* {VitalSignFields?.map((field, index) => (
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
                  // defaultValue={getVitalDefaultValue(field.id)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.vitals?.[index]?.value?.message}
                </Form.Control.Feedback>
              </Form.Group>
              // {/* <Form.Control type="text" placeholder={field.name} /> 
            </Col>
          ))} */}
        </Row>
      </Form>
      {/* <Accordion defaultActiveKey="0" className="px-2 mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Investigations</Accordion.Header>
          <Accordion.Body>
            <OrderedLabInvestigationTable
              investigations={lab_investigation?.orderedTest}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      <div className="px-2">
        <OrderedLabInvestigationTable
          investigations={lab_investigation?.orderedTest}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
        />
      </div>

      <div className=" d-flex justify-content-end gap-2 mt-2">
        <Button
          form="examination"
          // formTarget="traigeForm"
          type="submit"
          variant={data?.length > 0 ? "success" : "primary"}
          disabled={isPending}
        >
          {isPending && <Spinner size="sm" animation="border" />}
          {/* {data?.length > 0 ? "Update" : "Next"} */}
          Next
        </Button>
      </div>

      {showAddVitalSignModa && (
        <AddVitalSignModal
          show={showAddVitalSignModa}
          handleClose={() => setShowAddVitalSignModal(false)}
          medicalRecordId={state.medicalRecord_id}
          vitalSignFieldNames={vitalSignFieldNames}
        />
      )}
    </div>
  );
});

export default PhysicalExaminationTab;
