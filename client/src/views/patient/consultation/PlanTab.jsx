import React, { useRef, useState } from "react";
import { Accordion, Button, Form, Spinner } from "react-bootstrap";
import AddLabInvestigation from "../History/investigation/AddLabInvestigation";
import "./plan/plan.css";
import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { useLocation } from "react-router-dom";
import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import FollowUpVisit from "./plan/FollowUpVisit";
import Refer from "./plan/Refer";
import * as yup from "yup";

import { useFieldArray, useForm } from "react-hook-form";
import Lab from "./plan/Lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCirclePlus } from "react-icons/fa6";
// import { useGetLaboratory } from "../History/investigation/hooks/useGetLaboratory";
import { useGetMedicalRecordDetial } from "../hooks/consultationHooks/useGetMedicalRecordDetial";
import { useDispatch } from "react-redux";
import { unlockFinishButton } from "../../../store/consultationSlice";
import { useAddPlan } from "../hooks/consultationHooks/useAddPlan";
const planSchema = yup.object().shape({
  plan: yup.string().required(),
  // selectedLabs: yup.array().of(yup.number()),
  // indirectlySelectedLabs: yup.array().of(yup.number()),
  follow_up_visit: yup.object().shape({
    due_date: yup.date(),
    note: yup.string(),
  }),
  referral_notes: yup.array().of(yup.string()),
  sick_notes: yup.array().of(yup.string()),
  // is_labrequest: yup.boolean(),
  is_follow_up_visit: yup.boolean(),
  is_refer: yup.boolean(),
  is_sick_note: yup.boolean(),
});
const PlanTab = React.forwardRef((props, ref) => {
  const { state } = useLocation();
  // console.log(state);
  const { data, isPending: fetchingCheifComplaint } = useGetMedicalRecordDetial(
    state.medicalRecord_id
  );
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
    control,
    reset,
  } = useForm({
    resolver: yupResolver(planSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "referral_notes",
  });
  const {
    fields: Sick_notes_Fields,
    append: appendSick_notes,
    remove: removeSick_notes,
  } = useFieldArray({
    control,
    name: "sick_notes",
  });
  // setValue("selectedLabs",)
  // setValue("indirectlySelectedLabs")
  // console.log(lab_investigation);
  // const [showAddLabModal, setShowLabModal] = useState(false);
  // const [showLabAccordion, setShowLabAccordion] = useState(false);
  // const [showFollowUpAccordion, setShowFollowUpAccordion] = useState(false);
  // const [showRefer, setShowRefer] = useState(false);
  // const [showSickNote, setShowSickNote] = useState(false);

  // const foloowUpRef = useRef(false);
  // console.log(labRef.current.value);
  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  const submitHandler = async (data) => {
    console.log(data);
    const formData = {
      plan: data.plan,
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
                  type="checkbox"
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowFollowUpAccordion(e.target.checked);
                  // }}
                  {...register("is_follow_up_visit")}
                  label="Follow Up Visit"
                  // placeholder="Out Come"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowRefer(e.target.checked);
                  // }}
                  {...register("is_refer")}
                  label="Refer"
                  // placeholder="Out Come"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Check
                  type="checkbox"
                  {...register("is_sick_note")}
                  // onChange={(e) => {
                  //   console.log();
                  //   setShowSickNote(e.target.checked);
                  // }}
                  label="Sick Note"
                  // placeholder="Out Come"
                />
              </Form.Group>
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
        {watch("is_refer") && (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Refer</Accordion.Header>
              <Accordion.Body>
                {/* <Refer /> */}
                <div className="d-flex justify-content-end"></div>
                <Form.Group>
                  <div className="d-flex justify-content-end mb-2">
                    <button
                      onClick={() => {
                        append("");
                      }}
                      type="button"
                      className="border-0 bg-transparent gap-1 d-flex align-items-center"
                    >
                      <FaCirclePlus /> Add Refer
                    </button>
                    {/* <button
                      onClick={() => {
                        append("");
                      }}
                      type="button"
                      className="border-0 bg-transparent"
                    >
                      <FaCirclePlus />
                    </button> */}
                  </div>
                  {fields.map((field, index) => (
                    <Form.Group key={field.id} className="mb-3 d-flex gap-5">
                      <Form.Control
                        type="text"
                        {...register(`referral_notes[${index}]`)}
                        placeholder="Referral Notes"
                      />
                      {/* {errors.referral_notes && (
                        <span className="text-danger">
                          {errors.referral_notes.message}
                        </span>
                      )} */}
                      <button
                        className="btn btn-danger py-1"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </Form.Group>
                  ))}
                  {/* <Form.Control
                    as="textarea"
                    {...register("referral_notes")}
                    placeholder="Referral Notes"
                  />
                  {errors.referral_notes && (
                    <span className="text-danger">
                      {errors.referral_notes.message}
                    </span>
                  )} */}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}

        {watch("is_sick_note") && (
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Sick Note</Accordion.Header>
              <Accordion.Body>
                {/* <Refer /> */}
                <div className="d-flex justify-content-end"></div>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-end mb-2">
                    {/* Sick Notes{" "} */}
                    <button
                      onClick={() => {
                        appendSick_notes("");
                      }}
                      type="button"
                      className="border-0 bg-transparent gap-1 d-flex align-items-center"
                    >
                      <FaCirclePlus /> Add Sick Note
                    </button>
                  </Form.Label>
                  {Sick_notes_Fields.map((field, index) => (
                    <div key={field.id} className="d-flex gap-5 mb-3">
                      <Form.Control
                        type="text"
                        {...register(`sick_notes[${index}]`)}
                        placeholder="Sick Notes"
                      />
                      <button
                        className="btn btn-danger py-0"
                        type="button"
                        onClick={() => removeSick_notes(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
    </div>
  );
});

export default PlanTab;
