import React, { Fragment, useRef, useState } from "react";
import { Accordion, Button, Col, Form, Row, Spinner } from "react-bootstrap";
// import AddLabInvestigation from "../History/investigation/AddLabInvestigation";
import "./plan/plan.css";
// import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { useLocation } from "react-router-dom";
// import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import FollowUpVisit from "./plan/FollowUpVisit";
// import Refer from "./plan/Refer";
import * as yup from "yup";
import { LuPrinter } from "react-icons/lu";
import { useForm } from "react-hook-form";
// import Lab from "./plan/Lab";
import { yupResolver } from "@hookform/resolvers/yup";
// import { FaCirclePlus } from "react-icons/fa6";
// import { useGetLaboratory } from "../History/investigation/hooks/useGetLaboratory";
import { useGetMedicalRecordDetial } from "../hooks/consultationHooks/useGetMedicalRecordDetial";
import { useDispatch } from "react-redux";
import { unlockFinishButton } from "../../../store/consultationSlice";
import { useAddPlan } from "../hooks/consultationHooks/useAddPlan";
import { useGetDiagnosis } from "../hooks/consultationHooks/useGetDiagnosis";
import PreviewSickLeaveNote from "./plan/PreviewSickLeaveNote";
import PreviewRefferalNote from "./plan/PreviewRefferalNote";
import { useGetRefferalNote } from "../hooks/consultationHooks/plan/useGetRefferalNote";
import { useGetSickNote } from "../hooks/consultationHooks/plan/useGetSickNote";
const planSchema = yup.object().shape({
  plan: yup.string().required(),
  // selectedLabs: yup.array().of(yup.number()),
  // indirectlySelectedLabs: yup.array().of(yup.number()),
  follow_up_visit: yup.object().shape({
    due_date: yup.date(),
    note: yup.string(),
  }),
  // referral_notes: yup.array().of(yup.string()),
  sick_notes: yup.object().shape({
    is_show: yup.boolean(),
    start_date: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return undefined; // Return undefined for empty string
        }
        return value;
      })
      .when("is_show", ([is_show], schema) => {
        if (is_show) return schema.required("Start Date is required");
        return schema;
      }),
    end_date: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return undefined; // Return undefined for empty string
        }
        return value;
      })
      .when("is_show", ([is_show], schema) => {
        if (is_show) return schema.required("End Date is required");
        return schema;
      }),
    diagnosis: yup.array().of(
      yup.object().shape({
        diagnosis_id: yup.number(),
        value: yup.boolean(),
        // diagnosis_details: yup.array().of(yup.object().shape({
        //   diagnosis_id: yup.number(),
        //   description: yup.string(),
        // })),
      })
    ),
  }),
  referral_notes: yup.object().shape({
    is_show: yup.boolean(),
    hostipal_name: yup.string().when("is_show", ([is_show], schema) => {
      if (is_show) return schema.required("Hospital name is required");
      return schema;
    }),
    department_name: yup.string(),
    clinical_finding: yup.string().when("is_show", ([is_show], schema) => {
      if (is_show) return schema.required("Clinical Finding is required");
      return schema;
    }),
    reason: yup.string(),
    // start_date: yup
    //   .date()
    //   .transform((value, originalValue) => {
    //     if (originalValue === "") {
    //       return undefined; // Return undefined for empty string
    //     }
    //     return value;
    //   })
    //   .when("is_show", ([is_show], schema) => {
    //     if (is_show) return schema.required("Start Date is required");
    //     return schema;
    //   }),
    // end_date: yup
    //   .date()
    //   .transform((value, originalValue) => {
    //     if (originalValue === "") {
    //       return undefined; // Return undefined for empty string
    //     }
    //     return value;
    //   })
    //   .when("is_show", ([is_show], schema) => {
    //     if (is_show) return schema.required("End Date is required");
    //     return schema;
    //   }),
    diagnosis: yup.array().of(
      yup.object().shape({
        diagnosis_id: yup.number(),
        value: yup.boolean(),
        // diagnosis_details: yup.array().of(yup.object().shape({
        //   diagnosis_id: yup.number(),
        //   description: yup.string(),
        // })),
      })
    ),
  }),
  // is_labrequest: yup.boolean(),
  is_follow_up_visit: yup.boolean(),
  is_refer: yup.boolean().transform((value) => Boolean(value)),
  is_sick_note: yup.boolean(),
});
const PlanTab = React.forwardRef((props, ref) => {
  const { state } = useLocation();
  // console.log(state);
  const { data, isPending: fetchingCheifComplaint } = useGetMedicalRecordDetial(
    state.medicalRecord_id
  );
  const { data: refferalnote } = useGetRefferalNote(state.medicalRecord_id);
  const { data: sicknote } = useGetSickNote(state.medicalRecord_id);
  // console.log(refferalnote);
  // console.log(data);
  // const sicknoteDiagonasis = sicknote?.diagnosis?.
  const { mutateAsync, isPending } = useAddPlan();
  // const { data: laboratoryTests } = useGetLaboratory();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data?.plan) {
      dispatch(unlockFinishButton());
    }
  }, [dispatch, data]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,

    reset,
  } = useForm({
    resolver: yupResolver(planSchema),
    defaultValues: data
      ? {
          plan: data?.plan ? data.plan : "",
          referral_notes: refferalnote
            ? {
                is_show: true,
                hostipal_name: refferalnote?.referral_to,
                department_name: refferalnote?.department,
                clinical_finding: refferalnote?.clinical_finding,
                reason: refferalnote?.reason_for_referral,
                // start_date: refferalnote?.start_date,
                // end_date: refferalnote?.end_date,
                // diagnosis: refferalnote?.diagnosis
                //  ?.filter((d) => {
                //       if (d.value) return d;
                //     })
                //  .map((d) => d.id),
              }
            : undefined,
          sick_notes: sicknote
            ? {
                is_show: true,
                start_date: sicknote?.start_date,
                end_date: sicknote?.end_date,
                // diagnosis: sicknote?.diagnosis.map(d=>{})
                //  ?.filter((d) => {
                //       if (d.value) return d.diagnosis_id;
                //     })
                //   .map((d) => d.diagnosis_id),
              }
            : undefined,
          is_refer: refferalnote ? true : false,
          is_sick_note: sicknote ? true : false,
        }
      : undefined,
  });

  const { data: diagnosis } = useGetDiagnosis(state.medicalRecord_id);

  const [showpreviewshowSickNote, setShowPreviewShowSickNote] = useState(false);
  const [showpreviewRefferalNote, setShowPreviewRefferalNote] = useState(false);

  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  // console.log(errors);
  const submitHandler = async (data) => {
    // console.log(data);

    const sickNote = data.sick_notes?.end_date
      ? {
          // is_show: data.sick_notes.is_show,
          start_date: data.sick_notes?.start_date,
          end_date: data.sick_notes?.end_date,
          diagnosis: data.sick_notes?.diagnosis
            ?.filter((d) => {
              if (d.value) return d.diagnosis_id;
            })
            .map((d) => d.diagnosis_id),
        }
      : null;
    const RefferalNote = data.referral_notes.hostipal_name
      ? {
          // is_show: data.referral_notes.is_show,
          hostipal_name: data.referral_notes.hostipal_name,
          department_name: data.referral_notes.department_name,
          clinical_finding: data.referral_notes.clinical_finding,
          reason: data.referral_notes.reason,
          // start_date: data.referral_notes.start_date,
          // end_date: data.referral_notes.end_date,
        }
      : null;
    // console.log(sickNote);
    // return;
    const formData = {
      plan: data.plan,
      sickNote,
      RefferalNote,
    };
    mutateAsync({ formData, medicalRecordId: state.medicalRecord_id });
    // const investigations = data?.selectedLabs.map((t) => {
    //   const lab = laboratoryTests.find((lab) => lab.id === t);
    //   // console.log(lab);
    //   return lab?.labTest_id;
    // });
    // const underPanels = data?.indirectlySelectedLabs.map((t) => {
    //   const lab = laboratoryTests.find((lab) => lab.id === t);
    //   // console.log(lab);
    //   return lab?.labTest_id;
    // });
    // console.log(investigations);
    // console.log(underPanels);
  };
  // console.log(errors);
  return (
    <div>
      <Form onSubmit={handleSubmit(submitHandler)} className="">
        <Form.Group className="mb-3">
          {/* <input type="hidden" {...register("selectedLabs")} /> */}
          <Form.Label>Plan Note</Form.Label>
          <Form.Control
            as="textarea"
            {...register("plan")}
            placeholder="Plan"
          />
          {errors.plan && (
            <span className="text-danger">{errors.plan.message}</span>
          )}
        </Form.Group>
        <Accordion flush defaultActiveKey="0" className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="w-25 border-bottom">
              Out Come
            </Accordion.Header>
            <Accordion.Body className="pb-1 d-flex justify-content-between">
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowFollowUpAccordion(e.target.checked);
                  // }}
                  {...register("is_follow_up_visit")}
                  label="Follow Up Visit"
                  // placeholder="Out Come"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowRefer(e.target.checked);
                  // }}
                  {...register("is_refer")}
                  label="Refer"
                  // placeholder="Out Come"
                />
              </Form.Group> */}
              {/* <Form.Group className="mb-1">
                <Form.Check
                  type="switch"
                  {...register("is_sick_note")}
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowSickNote(e.target.checked);
                  // }}
                  label="Sick Note"
                  // placeholder="Out Come"
                />
              </Form.Group> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {watch("is_follow_up_visit") && (
          <Accordion flush defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="border border-2 border-gredient">
                Follow Up Visit
              </Accordion.Header>
              <Accordion.Body>
                <FollowUpVisit />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}

        <div
          className="border-bottom border-2 py-1 px-2 d-flex align-items-center"
          style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
        >
          <Form.Group className="">
            <Form.Check
              type="switch"
              {...register("is_sick_note", {
                onChange: (e) => {
                  setValue("sick_notes.is_show", e.target.checked);
                },
              })}
              className="mb-0"
              // onChange={(e) => {
              //   console.log();
              //   setShowSickNote(e.target.checked);
              // }}
              label="Sick Note"
              // placeholder="Out Come"
            />
          </Form.Group>
        </div>

        {watch("is_sick_note") && (
          <>
            {/* <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sick Note</Accordion.Header>
                <Accordion.Body>
                  
                  <Form.Group className="mb-3">
                  <Form.Label>Diagnosis</Form.Label>
                  {diagnosis?.map((d, index) => (
                    <Form.Check
                      key={d.id}
                      type="checkbox"
                      {...register(`sick_notes.diagnosis[${index}]`)}
                      value={d.id}
                      label={d.diagnosis + "(" + d.status + ")"}
                      // placeholder="Diagnosis"
                    />
                  ))}
                </Form.Group>
                <Row>
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("sick_notes.start_date")}
                        placeholder="Start Date"
                        isInvalid={errors.sick_notes?.start_date}
                        defaultValue={new Date().toISOString().substring(0, 10)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.sick_notes?.start_date?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4} sm={12}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        {...register("sick_notes.end_date")}
                        placeholder="End Date"
                        isInvalid={errors.sick_notes?.end_date}
                        min={new Date().toISOString().substring(0, 10)}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.sick_notes?.end_date?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4} sm={12}></Col>
                  <Col md={4} sm={12}></Col>
                </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
            <div
              style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
              className="d-flex justify-content-between py-2"
            >
              <span></span>
              <div className="d-flex justify-content-between ">
                <button
                  style={{ color: "#cf01f9" }}
                  className="border-0 bg-transparent fw-bold"
                  onClick={() => setShowPreviewShowSickNote(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="border-0 btn btn-sm btn-warning ms-4 text-white"
                >
                  Print <LuPrinter className="ms-1" />
                </button>
              </div>
            </div>
            <Form.Group className="my-3 px-2">
              <Form.Label>
                {" "}
                <span className="border-bottom pb-1">Diagnosis</span>{" "}
              </Form.Label>
              {diagnosis?.map((d, index) => (
                <Fragment key={d.id}>
                  <Form.Check
                    type="checkbox"
                    {...register(`sick_notes.diagnosis[${index}].value`)}
                    label={d.diagnosis + "(" + d.status + ")"}
                    // placeholder="Diagnosis"
                  />
                  <input
                    type="hidden"
                    {...register(`sick_notes.diagnosis[${index}].diagnosis_id`)}
                    value={d.id}
                  />
                </Fragment>
              ))}
            </Form.Group>
            <Row>
              <Col md={4} sm={12}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("sick_notes.start_date")}
                    placeholder="Start Date"
                    isInvalid={errors.sick_notes?.start_date}
                    defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.sick_notes?.start_date?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("sick_notes.end_date")}
                    placeholder="End Date"
                    isInvalid={errors.sick_notes?.end_date}
                    min={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.sick_notes?.end_date?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}></Col>
              <Col md={4} sm={12}></Col>
            </Row>
          </>
        )}
        <div
          className="border-bottom border-2 py-1 px-2 d-flex mt-1 align-items-center"
          style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
        >
          <Form.Group className="">
            <Form.Check
              type="switch"
              // name="is_refer"
              {...register("is_refer", {
                onChange: (e) => {
                  // console.log(e.target.checked);
                  // setValue("is_refer", e.target.checked);
                  setValue("referral_notes.is_show", e.target.checked);
                },
              })}
              // value={getValues("is_refer")}
              // onChange={(e) => {
              //   setValue("is_refer", e.target.checked);
              //   setValue("referral_notes.is_show", e.target.checked);
              // }}
              className="mb-0"
              // onChange={(e) => {
              //   console.log();
              //   setShowSickNote(e.target.checked);
              // }}
              label="Refer"
              // placeholder="Out Come"
            />
          </Form.Group>
        </div>
        {watch("is_refer") && (
          <>
            {" "}
            <div
              style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
              className="d-flex justify-content-between py-2"
            >
              <span></span>
              <div className="d-flex justify-content-between ">
                <button
                  style={{ color: "#cf01f9" }}
                  className="border-0 bg-transparent fw-bold"
                  onClick={() => setShowPreviewRefferalNote(true)}
                  type="button"
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="border-0 btn btn-sm btn-warning ms-4 text-white"
                >
                  Print <LuPrinter className="ms-1" />
                </button>
              </div>
            </div>
            <Row className="mt-2">
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Hospital</Form.Label>
                  <Form.Control
                    // type="date"
                    type="text"
                    {...register("referral_notes.hostipal_name")}
                    // placeholder="Start Date"
                    isInvalid={errors.referral_notes?.hostipal_name}
                    // defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.referral_notes?.hostipal_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    // type="date"
                    type="text"
                    {...register("referral_notes.department_name")}
                    // placeholder="Start Date"
                    isInvalid={errors.referral_notes?.department_name}
                    // defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.referral_notes?.department_name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group>
                  <Form.Label>Clinical Finding</Form.Label>
                  <Form.Control
                    // type="date"
                    as="textarea"
                    {...register("referral_notes.clinical_finding")}
                    // placeholder="Start Date"
                    isInvalid={errors.referral_notes?.clinical_finding}
                    // defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.referral_notes?.clinical_finding?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    // type="date"
                    type="text"
                    {...register("referral_notes.reason")}
                    // placeholder="Start Date"
                    isInvalid={errors.referral_notes?.reason}
                    // defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.referral_notes?.reason?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}></Col>
              <Col md={4} sm={12}></Col>
            </Row>
          </>
        )}
        <div className="d-flex justify-content-end gap-2 mt-2">
          {/* <Button variant="secondary">Save for Later</Button> */}
          <Button
            variant="primary"
            type="submit"
            // onClick={submitHandler}
            // disabled={selectedTests.length === 0 || isPending}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Save
          </Button>
        </div>
      </Form>
      {showpreviewshowSickNote && (
        <PreviewSickLeaveNote
          show={showpreviewshowSickNote}
          handleClose={() => setShowPreviewShowSickNote(false)}
          diagnosis={diagnosis}
          start_date={getValues("sick_notes.start_date")}
          end_date={getValues("sick_notes.end_date")}
          diagnosisIds={getValues("sick_notes.diagnosis")}
        />
      )}
      {showpreviewRefferalNote && (
        <PreviewRefferalNote
          show={showpreviewRefferalNote}
          handleClose={() => setShowPreviewRefferalNote(false)}
          clinical_finding={getValues("referral_notes.clinical_finding")}
          reason={getValues("referral_notes.reason")}
          department_name={getValues("referral_notes.department_name")}
          hostipal_name={getValues("referral_notes.hostipal_name")}
        />
      )}
    </div>
  );
});

export default PlanTab;
