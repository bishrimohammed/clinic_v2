import React from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
// import { useGetActiveVitalSignFields } from "../../patient visit/hooks/useGetActiveVitalSignFields";
// import { useGetAcvtivePhysicalExamination } from "../../patient visit/hooks/useGetAcvtivePhysicalExamination";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetAcvtivePhysicalExamination } from "../../patient visit/hooks/useGetAcvtivePhysicalExamination";
import { useGetActiveVitalSignFields } from "../../patient visit/hooks/useGetActiveVitalSignFields";
import Lab from "../consultation/plan/Lab";
import { FaCirclePlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useGetMedicines } from "../hooks/consultationHooks/medication/useGetMedicines";
import { useGetLaboratory } from "../History/investigation/hooks/useGetLaboratory";
import { useLocation } from "react-router-dom";
import { useAddprogressNote } from "../hooks/progressNoteHooks/useAddprogressNote";
import { toast } from "react-toastify";
const progressNoteSchema = yup.object().shape({
  problemList: yup
    .string()
    .transform((value) => value.trim())
    .required("problemList is required"),
  currentmanagement: yup
    .string()
    .transform((value) => value.trim())
    .required("current management is required"),
  plan: yup.string(),
  physicalExaminations: yup.array().of(
    yup.object().shape({
      physicalExaminationId: yup.number().required(),
      name: yup.string(),
      value: yup.string().transform((value) => value.trim()),
      // .when("name", ([name], schema) => {
      //   return schema.required(name + "  is required");
      // }),
    })
  ),
  vitals: yup.array().of(
    yup.object().shape({
      vitalId: yup.number(),
      name: yup.string(),
      value: yup.string().transform((value) => value.trim()),
      // .when("name", ([name], schema) => {
      //   return schema.required(name + "  is required");
      // }),
    })
  ),
  diagnoses: yup.array().of(
    yup
      .string()
      .transform((value) => value.trim())
      .required("Diagnosis is required")
    // yup.object().shape({
    //   diagnosis: yup
    //     .string()
    //     .transform((value) => value.trim())
    //     .required("Diagnosis is required"),
    // })
  ),
  internal_prescriptions: yup.array().of(
    yup
      .object()
      .shape({
        medicine_id: yup
          .string()
          .transform((value) => value.trim())
          .required("Medicine is required"),
        dosage: yup
          .string()
          .transform((value) => value.trim())
          .required("Dosage is required"),
        frequency: yup
          .string()
          .transform((value) => value.trim())
          .required("Frequency is required"),
        duration: yup
          .number()
          .positive()
          .min(0, "Duration must be greater than 0")
          .required(),
        start_date: yup.date().required("Start date is required"),
      })
      .required()
  ),
  selectedLabs: yup.array().of(yup.number()),
  indirectlySelectedLabs: yup.array().of(yup.number()),
  externalLabReport: yup.mixed(),
});
const ProgressNoteTab = React.forwardRef(({ savedforLaterData }, ref) => {
  const { data: PhysicalExaminationFields } =
    useGetAcvtivePhysicalExamination();
  const { data: VitalSignFields } = useGetActiveVitalSignFields();
  const { data: medicines } = useGetMedicines();
  const { data: laboratoryTests, error } = useGetLaboratory();
  // console.log(JSON.parse(savedforLaterData.lab.data).selectedLabs);
  //   const navigate = useNavigate();
  //   getValues("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: savedforLaterData
      ? {
          problemList: savedforLaterData.progressNote.problem_list,
          currentmanagement: savedforLaterData.progressNote.current_management,
          plan: savedforLaterData.progressNote.plan,
          physicalExaminations: JSON.parse(
            savedforLaterData.physicalExamination.data
          ),
          vitals: JSON.parse(savedforLaterData.vital.data),
          diagnoses: JSON.parse(savedforLaterData.diagnoses.data),

          selectedLabs: JSON.parse(savedforLaterData.lab.data).selectedLabs,
          indirectlySelectedLabs: JSON.parse(savedforLaterData.lab.data)
            .indirectlySelectedLabs,
          internal_prescriptions: JSON.parse(
            savedforLaterData.prescription.data
          ),
        }
      : undefined,
    resolver: yupResolver(progressNoteSchema),

    // reValidateMode: "onChange",
    shouldFocusError: true,

    // defaultValues: {
    //   physicalExaminations: PhysicalExaminationFields,
    //   vitals: VitalSignFields,
    // },
  });
  // console.log(errors);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "internal_prescriptions",
  });
  const {
    fields: FieldsDiagnosis,
    append: appendDiagnosis,
    remove: removeDiagnosis,
  } = useFieldArray({
    control,
    name: "diagnoses",
  });
  const { state } = useLocation();
  const { mutateAsync, isPending } = useAddprogressNote();
  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  // console.log(errors);
  //   console.log(medicines);
  const submitHandler = (data) => {
    console.log(data);
    // return;
    const investigations = data?.selectedLabs;
    // ?.map((t) => {
    //   const lab = laboratoryTests.find((lab) => lab.id === t);
    //   // console.log(lab);
    //   return lab?.labTest_id;
    // });
    const underPanels = data?.indirectlySelectedLabs;
    // ?.map((t) => {
    //   const lab = laboratoryTests.find((lab) => lab.id === t);
    //   // console.log(lab);
    //   return lab?.labTest_id;
    // });
    console.log(investigations);
    console.log(data.diagnoses);
    // return;
    const Data = {
      formData: {
        problemList: data.problemList,
        currentmanagement: data.currentmanagement,
        plan: data.plan,
        physicalExaminations: data.physicalExaminations.some(
          (phE) => phE.value !== ""
        )
          ? data.physicalExaminations
          : null,
        vitals: data.vitals.some((v) => v.value !== "") ? data.vitals : null,
        diagnoses: data.diagnoses,
        internal_prescriptions: data.internal_prescriptions,
        investigations,
        underPanels,
      },
      medicalRecordId: state.medicalRecord_id,
    };
    const formData = new FormData();
    formData.append("problemList", data.problemList);
    formData.append("currentmanagement", data.currentmanagement);
    formData.append("plan", data.plan);
    formData.append(
      "physicalExaminations",
      data.physicalExaminations.some((phE) => phE.value !== "")
        ? JSON.stringify(data.physicalExaminations)
        : null
    );
    formData.append(
      "vitals",
      data.vitals.some((v) => v.value !== "") ? JSON.stringify(data.vitals) : []
    );
    formData.append("diagnoses", JSON.stringify(data.diagnoses));
    formData.append(
      "internal_prescriptions",
      JSON.stringify(
        data.internal_prescriptions ? data.internal_prescriptions : []
      )
    );
    formData.append(
      "investigations",
      JSON.stringify(investigations ? investigations : [])
    );
    formData.append(
      "underPanels",
      JSON.stringify(underPanels ? underPanels : [])
    );
    formData.append("externalLabReport", data?.externalLabReport[0]);

    // console.log(Data);
    // return;
    mutateAsync({ formData, medicalRecordId: state.medicalRecord_id })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Progress note saved successfully");
          reset();
        }
        // navigate("/patient/progress-note");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="progress-note-tab-container"
      style={{ height: 400, overflowY: "auto" }}
    >
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Accordion defaultActiveKey="0" className="gap-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Subjective</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3 ">
                <Row>
                  <Col
                    lg={3}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <Form.Label className="w-100 text-nowrap d-flex justify-content-between">
                      Problem List
                      <span className="ms-2 fw-bold">:</span>
                    </Form.Label>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Form.Control
                      as="textarea"
                      {...register("problemList")}
                      isInvalid={errors.problemList}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Row>
                  <Col
                    lg={3}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <Form.Label className="text-nowrap d-flex justify-content-between">
                      Current Management
                      <span className="ms-2 fw-bold">:</span>
                    </Form.Label>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Form.Control
                      as="textarea"
                      {...register("currentmanagement")}
                      isInvalid={errors.currentmanagement}
                    />
                  </Col>
                </Row>
              </Form.Group>
              {/* <Form.Group className="mb-3 ">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" />
            </Form.Group> */}
            </Accordion.Body>
          </Accordion.Item>{" "}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Objective</Accordion.Header>
            <Accordion.Body>
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
                        //   defaultValue={getPhysicalExaminationDefaultValue(field.id)}
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
                        //   defaultValue={getVitalDefaultValue(field.id)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.vitals?.[index]?.value?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Control type="text" placeholder={field.name} /> */}
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-between">
                <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
                  Order Lab Investigation
                </h5>
              </div>
              <Form.Group className="">
                <Form.Label>External Lab Report</Form.Label>
                <Form.Control
                  size="sm"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register("externalLabReport")}
                />
                {/* <Form.Text>External Lab Report</Form.Text> */}
              </Form.Group>
              <Lab setValue={setValue} getValues={getValues} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Treatment</Accordion.Header>
            <Accordion.Body>
              <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
                Diagnoses
              </h5>
              <div className="d-flex justify-content-end mb-2">
                <button
                  onClick={() => {
                    appendDiagnosis("");
                  }}
                  type="button"
                  className="border-0 bg-transparent gap-1 d-flex align-items-center"
                >
                  <FaCirclePlus /> Add Diagnosis
                </button>
              </div>
              {FieldsDiagnosis.length > 0 && (
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Diagnosis</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FieldsDiagnosis?.map((field, index) => (
                      <tr key={field.id}>
                        <td className="py-0">{index + 1}</td>
                        <td className="py-0">
                          <Form.Control
                            type="text"
                            {...register(`diagnoses[${index}]`)}
                            placeholder="diagnoss"
                            className="border-0"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              removeDiagnosis(index);
                            }}
                            type="button"
                            className="border-0 bg-transparent gap-1 d-flex align-items-center"
                          >
                            <FaTrash color="red" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <h5 className="border-bottom border-dark fw-bold py-2 mb-3">
                Prescriptions
              </h5>
              <div className="d-flex justify-content-end mb-2">
                <button
                  onClick={() => {
                    append({
                      medicine_id: "",
                      dosage: "",
                      frequency: "",
                      start_date: new Date().toISOString().substring(0, 10),
                      duration: "",
                    });
                  }}
                  type="button"
                  className="border-0 bg-transparent gap-1 d-flex align-items-center"
                >
                  <FaCirclePlus /> Add Prescription
                </button>
              </div>
              {fields.length > 0 && (
                <Table responsive>
                  <thead>
                    <tr>
                      <td>#</td>
                      <th className="text-nowrap">Drug Name</th>
                      <th>
                        <span style={{ opacity: 0 }}>ergagrtshsfgbsrh</span>{" "}
                      </th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Start Date</th>
                      <th>Duration</th>
                      <th>
                        {/* <button
                    type="button"
                    className="btn btn-success py-1"
                    onClick={() =>
                      append({
                        medicine_id: "",
                        dosage: "",
                        frequency: "",
                        start_date: new Date().toISOString().substring(0, 10),
                        duration: "",
                      })
                    }
                  >
                    +Add
                  </button> */}
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td colSpan={2} className="border-end">
                          <Form.Select
                            {...register(
                              `internal_prescriptions.${index}.medicine_id`
                            )}
                            isInvalid={
                              errors.internal_prescriptions?.[index]
                                ?.medicine_id
                            }
                          >
                            {medicines?.map((medicine, index) => (
                              <option
                                key={medicine.id}
                                value={medicine.service_item_id}
                              >
                                {/* {console.log(data)} */}
                                {medicine?.medicineServiceItem?.service_name}
                              </option>
                            ))}
                          </Form.Select>
                          {/* <Form.Control
                            // placeholder="medicine"
                            list="medicines"
                            {...register(
                              `internal_prescriptions.${index}.medicine_id`
                            )}
                            isInvalid={
                              errors.internal_prescriptions?.[index]
                                ?.medicine_id
                            }
                          >

                          </Form.Control> */}

                          <datalist id="medicines">
                            {medicines?.map((medicine, index) => (
                              <option
                                key={medicine.id}
                                value={
                                  medicine.id +
                                  ". " +
                                  medicine?.medicineServiceItem?.service_name
                                }
                              >
                                {/* {console.log(data)} */}
                              </option>
                            ))}
                          </datalist>
                        </td>
                        <td className="border-end">
                          <Form.Control
                            type="text"
                            {...register(
                              `internal_prescriptions.${index}.dosage`
                            )}
                            // placeholder="dosage"
                            isInvalid={
                              !!errors.internal_prescriptions?.[index]?.dosage
                            }

                            // defaultValue={item.email}
                          />
                        </td>
                        <td className="border-end">
                          <Form.Control
                            // type="tel"
                            {...register(
                              `internal_prescriptions.${index}.frequency`
                            )}
                            // placeholder="frequency"
                            isInvalid={
                              !!errors.internal_prescriptions?.[index]
                                ?.frequency
                            }
                          />
                        </td>
                        <td className="border-end">
                          <Form.Control
                            type="date"
                            min={new Date().toISOString().substring(0, 10)}
                            defaultValue={new Date()
                              .toISOString()
                              .substring(0, 10)}
                            {...register(
                              `internal_prescriptions.${index}.start_date`
                            )}
                            isInvalid={
                              !!errors.internal_prescriptions?.[index]
                                ?.start_date
                            }
                          />
                        </td>
                        <td className="border-end">
                          <Form.Control
                            type="number"
                            {...register(
                              `internal_prescriptions.${index}.duration`
                            )}
                            isInvalid={
                              !!errors.internal_prescriptions?.[index]?.duration
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="btn fs-5 p-0"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <FaTrash color="red" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Plan</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3 ">
                <Row>
                  <Col
                    lg={3}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <Form.Label className="w-100 text-nowrap d-flex justify-content-between">
                      Plan Note
                      <span className="ms-2 fw-bold">:</span>
                    </Form.Label>
                  </Col>
                  <Col lg={9} md={8} sm={12}>
                    <Form.Control as="textarea" {...register("plan")} />
                  </Col>
                </Row>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-flex justify-content-end mt-2">
          <Button
            // disabled={isPending}
            variant="primary"
            type="submit"
            className="px-3"
          >
            {/* {isPending && <Spinner animation="border" size="sm" />} */}
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
});

export default ProgressNoteTab;
