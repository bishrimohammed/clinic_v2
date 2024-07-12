import React, { Fragment, useRef, useState } from "react";
import { Accordion, Button, Form, Spinner, Table } from "react-bootstrap";
// import AddLabInvestigation from "../History/investigation/AddLabInvestigation";
import "./plan/plan.css";
// import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { useLocation } from "react-router-dom";
// import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import FollowUpVisit from "./plan/FollowUpVisit";
// import Refer from "./plan/Refer";
import * as yup from "yup";
// import { LuPrinter } from "react-icons/lu";
import { useForm, useFieldArray } from "react-hook-form";
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
import AddSickNoteModal from "./plan/AddSickNoteModal";
import { FaPlusCircle } from "react-icons/fa";
import AddReferralNoteModal from "./plan/AddReferralNoteModal";
import ViewSickNote from "./plan/ViewSickNote";
import ViewReferralNote from "./plan/ViewReferralNote";
const planSchema = yup.object().shape({
  plan: yup.string().required(),
  // selectedLabs: yup.array().of(yup.number()),
  // indirectlySelectedLabs: yup.array().of(yup.number()),
  follow_up_visit: yup.object().shape({
    due_date: yup.date(),
    note: yup.string(),
  }),
  // referral_notes: yup.array().of(yup.string()),
  sick_notes: yup.array().of(
    yup.object().shape({
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
    })
  ),
  referral_notes: yup.array().of(
    yup.object().shape({
      is_show: yup.boolean(),
      hospital_name: yup.string().when("is_show", ([is_show], schema) => {
        if (is_show) return schema.required("Hospital name is required");
        return schema;
      }),
      department_name: yup.string(),
      clinical_finding: yup.string().when("is_show", ([is_show], schema) => {
        if (is_show) return schema.required("Clinical Finding is required");
        return schema;
      }),
      reason: yup.string(),
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
    })
  ),
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
  // console.log(sicknote);
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
    control,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(planSchema),
    defaultValues: data
      ? {
          plan: data?.plan ? data.plan : "",
          // referral_notes: refferalnote
          //   ? {
          //       is_show: true,
          //       hostipal_name: refferalnote?.referral_to,
          //       department_name: refferalnote?.department,
          //       clinical_finding: refferalnote?.clinical_finding,
          //       reason: refferalnote?.reason_for_referral,
          //       // start_date: refferalnote?.start_date,
          //       // end_date: refferalnote?.end_date,
          //       // diagnosis: refferalnote?.diagnosis
          //       //  ?.filter((d) => {
          //       //       if (d.value) return d;
          //       //     })
          //       //  .map((d) => d.id),
          //     }
          //   : undefined,
          // sick_notes: sicknote
          //   ? {
          //       is_show: true,
          //       start_date: sicknote?.start_date,
          //       end_date: sicknote?.end_date,
          //       // diagnosis: sicknote?.diagnosis.map(d=>{})
          //       //  ?.filter((d) => {
          //       //       if (d.value) return d.diagnosis_id;
          //       //     })
          //       //   .map((d) => d.diagnosis_id),
          //     }
          //   : undefined,
          is_refer: refferalnote ? true : false,
          is_sick_note: sicknote ? true : false,
        }
      : undefined,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { data: diagnosis } = useGetDiagnosis(state.medicalRecord_id);

  const [showpreviewshowSickNote, setShowPreviewShowSickNote] = useState({
    show: false,
    start_date: "",
    end_date: "",
    diagnosisIds: [],
  });
  const [showPreviewRefferalNote, setShowPreviewRefferalNote] = useState({
    show: false,
    referralNote: null,
  });
  const [showViewSickNoteNote, setShowViewSickNoteNote] = useState({
    show: false,
    sickNote: null,
  });
  const [showViewReferralNoteNote, setShowViewReferralNoteNote] = useState({
    show: false,
    referralNote: null,
  });
  const [showAddSickNoteModal, setShowAddSickNoteModal] = useState(false);
  const [showAddReferralNoteModal, setShowAddReferralNoteModal] =
    useState(false);

  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  const { fields, append, remove } = useFieldArray({
    name: "sick_notes",
    control,
  });
  const {
    fields: referralFields,
    append: appendReferralNote,
    remove: removeReferralNote,
  } = useFieldArray({
    name: "referral_notes",
    control,
  });
  // start_date: data.sick_notes?.start_date,
  //         end_date: data.sick_notes?.end_date,
  //         diagnosis: data.sick_notes?.diagnosis
  //           ?.filter((d) => {
  //             if (d.value) return d.diagnosis_id;
  //           })
  //           .map((d) => d.diagnosis_id),
  // console.log(errors);
  // console.log(getValues(`referral_notes[${0}].hospital_name`));
  const submitHandler = async (data) => {
    // console.log(data);
    // return;
    const sickNote =
      data.sick_notes?.length > 0
        ? // is_show: data.sick_notes.is_show,
          data?.sick_notes.map((sn) => {
            return {
              // is_show: sn.is_show,
              start_date: sn.start_date,
              end_date: sn.end_date,
              diagnosis: sn.diagnosis
                ?.filter((d) => {
                  if (d.value) return d.diagnosis_id;
                })
                .map((d) => d.diagnosis_id),
            };
          })
        : null;
    const RefferalNote =
      data.referral_notes?.length > 0 ? data.referral_notes : null;
    // console.log(sickNote);
    // return;
    const formData = {
      plan: data.plan,
      sickNote,
      RefferalNote,
    };
    // console.log(formData);
    // return;
    mutateAsync({ formData, medicalRecordId: state.medicalRecord_id }).then(
      (res) => {
        if (res.status === 200) {
          reset();
        }
      }
    );
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

  // console.log(getValues("referral_notes"));
  const getDiagnosisName = (id, value) => {
    // console.log(id);
    // console.log(diagnosis);
    // return;
    const diagnosis2 = diagnosis?.find((d) => d.id === parseInt(id));
    // console.log(diagnosis2);
    return (
      value == true && diagnosis2?.diagnosis + "(" + diagnosis2?.status + ")"
    );
  };
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
            <Accordion.Body className="px-1">
              <div
                className="border-bottom border-2 py-1 px-2 d-flex align-items-center"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
              >
                <Form.Group className="">
                  <Form.Check
                    type="switch"
                    {...register("is_sick_note", {
                      onChange: (e) => {
                        // setValue("sick_notes.is_show", e.target.checked);
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
                  <div
                    style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
                    className="d-flex justify-content-between py-2"
                  >
                    <span></span>
                    <div className="d-flex justify-content-between ">
                      <button
                        style={{ color: "#cf01f9" }}
                        className="border-0 bg-transparent fw-bold me-2"
                        onClick={() => {
                          append({
                            // is_show: true,
                            is_show: true,
                            start_date: new Date()
                              .toISOString()
                              .substring(0, 10),
                            end_date: "",
                            diagnosis: [],
                          });
                          setShowAddSickNoteModal(true);
                        }}
                        type="button"
                      >
                        {/* import { FaPlusCircle } from "react-icons/fa"; */}
                        <FaPlusCircle size={20} />
                      </button>
                      {/* <button
                  style={{ color: "#cf01f9" }}
                  className="border-0 bg-transparent fw-bold"
                  onClick={() => setShowPreviewShowSickNote(true)}
                  type="button"
                >
                  Preview
                </button> */}
                      {/* <button
                        type="button"
                        className="border-0 btn btn-sm btn-warning ms-4 text-white"
                      >
                        Print <LuPrinter className="ms-1" />
                      </button> */}
                    </div>
                  </div>
                  {fields.length > 0 && (
                    <Table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Diagnosis</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {watch("sick_notes")?.map((sickNote, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {sickNote?.diagnosis?.map((d) => (
                                <p key={d.diagnosis_id} className="mb-0">
                                  {getDiagnosisName(d?.diagnosis_id, d.value)}
                                </p>
                              ))}
                            </td>
                            <td>{sickNote.start_date}</td>
                            <td>{sickNote.end_date}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-info ms-2"
                                onClick={() => {
                                  setShowPreviewShowSickNote({
                                    show: true,
                                    start_date: sickNote.start_date,
                                    end_date: sickNote.end_date,
                                    diagnosisIds: sickNote.diagnosis,
                                  });
                                }}
                              >
                                Preview
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                  {sicknote?.length > 0 && (
                    <>
                      <h6></h6>
                      <Table striped bordered className="mt-2">
                        <thead>
                          <tr>
                            <th>Diagnosis</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sicknote?.map((s, index) => (
                            <tr key={index}>
                              <td>
                                {s.diagnoses.map((d) => (
                                  <p key={d.id + d.diagnosis} className="mb-0">
                                    {d.diagnosis} ({d.status})
                                  </p>
                                ))}
                              </td>
                              <td>{s.start_date}</td>
                              <td>{s.end_date}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-info ms-2"
                                  onClick={() => {
                                    setShowViewSickNoteNote({
                                      show: true,
                                      sickNote: s,
                                    });
                                  }}
                                >
                                  View
                                </button>
                                {/* <button
                                  type="button"
                                  className="btn btn-sm btn-warning ms-2"
                                >
                                  Print
                                </button> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
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
                    className="mb-0"
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
                        className="border-0 bg-transparent fw-bold me-2"
                        type="button"
                        onClick={() => {
                          appendReferralNote({
                            is_show: true,
                            hospital_name: "",
                            reason: "",
                            department_name: "",
                            clinical_finding: "",
                          });
                          setShowAddReferralNoteModal(true);
                        }}
                      >
                        {/* import { FaPlusCircle } from "react-icons/fa"; */}
                        <FaPlusCircle size={20} />
                      </button>

                      {/* <button
                  style={{ color: "#cf01f9" }}
                  className="border-0 bg-transparent fw-bold"
                  onClick={() => setShowPreviewRefferalNote(true)}
                  type="button"
                >
                  Preview
                </button> */}
                      {/* <button
                        type="button"
                        className="border-0 btn btn-sm btn-warning ms-4 text-white"
                      >
                        Print <LuPrinter className="ms-1" />
                      </button> */}
                    </div>
                  </div>
                  {referralFields.length > 0 && (
                    <>
                      <Table className="my-1">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Hospital Name</th>
                            <th>Department</th>
                            <th>Clinical Finding</th>
                            <th>Reason</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {watch("referral_notes")?.map(
                            (referralNote, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{referralNote.hospital_name}</td>
                                <td>{referralNote.department_name}</td>
                                <td>{referralNote.clinical_finding}</td>
                                <td>{referralNote.reason}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger ms-2"
                                    onClick={() => {
                                      removeReferralNote(index);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-info ms-2"
                                    onClick={() => {
                                      setShowPreviewRefferalNote({
                                        show: true,
                                        referralNote,
                                      });
                                    }}
                                  >
                                    Preview
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                      <hr />
                    </>
                  )}
                  {refferalnote?.length > 0 && (
                    <>
                      {/* <h6 className="mt-2">Saved referral note</h6> */}
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Hospital Name</th>
                            <th>Department</th>
                            <th>Clinical Finding</th>
                            <th>Referral Date</th>
                            <th>Reason</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {refferalnote?.map((referralNote, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{referralNote.referral_to}</td>
                              <td>{referralNote.department}</td>
                              <td>{referralNote.clinical_finding}</td>
                              <td>
                                {new Date(referralNote.referral_date)
                                  .toISOString()
                                  .substring(0, 10)}
                              </td>
                              <td>{referralNote.reason_for_referral}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-info ms-2"
                                  onClick={() => {
                                    setShowViewReferralNoteNote({
                                      show: true,
                                      referralNote,
                                    });
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>{" "}
                      {/* <hr /> */}
                    </>
                  )}
                </>
              )}
              <div
                className="border-bottom border-2 py-1 mt-1 px-2 d-flex align-items-center"
                style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
              >
                <Form.Group className="">
                  <Form.Check
                    type="switch"
                    // {...register("is_sick_note", {
                    //   onChange: (e) => {
                    //     // setValue("sick_notes.is_show", e.target.checked);
                    //   },
                    // })}
                    {...register("is_follow_up_visit")}
                    className="mb-0"
                    // onChange={(e) => {
                    //   console.log();
                    //   setShowSickNote(e.target.checked);
                    // }}
                    label="FollowUp Visit"
                    // placeholder="Out Come"
                  />
                </Form.Group>
              </div>
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

        <div className="d-flex justify-content-end gap-2 mt-2">
          {/* <Button variant="secondary">Save for Later</Button> */}
          <Button
            variant="primary"
            type="submit"
            // onClick={submitHandler}
            disabled={isPending}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Save
          </Button>
        </div>
      </Form>
      {showpreviewshowSickNote.show && (
        <PreviewSickLeaveNote
          show={showpreviewshowSickNote.show}
          handleClose={() =>
            setShowPreviewShowSickNote({
              show: false,
              start_date: "",
              end_date: "",
              diagnosisIds: [],
            })
          }
          diagnosis={diagnosis}
          start_date={showpreviewshowSickNote.start_date}
          end_date={showpreviewshowSickNote.end_date}
          diagnosisIds={showpreviewshowSickNote.diagnosisIds}
        />
      )}
      {showPreviewRefferalNote.show && (
        <PreviewRefferalNote
          show={showPreviewRefferalNote.show}
          handleClose={() => setShowPreviewRefferalNote(false)}
          clinical_finding={
            showPreviewRefferalNote.referralNote?.clinical_finding
          }
          reason={showPreviewRefferalNote.referralNote?.reason}
          hospital_name={showPreviewRefferalNote.referralNote?.hospital_name}
          department_name={
            showPreviewRefferalNote.referralNote?.department_name
          }
        />
      )}
      {showAddSickNoteModal && (
        <AddSickNoteModal
          show={showAddSickNoteModal}
          handleClose={setShowAddSickNoteModal}
          fieldsLength={fields.length}
          diagnosis={diagnosis}
          register={register}
          errors={errors}
          remove={remove}
          getValues={getValues}
        />
      )}
      {showAddReferralNoteModal && (
        <AddReferralNoteModal
          show={showAddReferralNoteModal}
          handleClose={setShowAddReferralNoteModal}
          fieldsLength={referralFields.length}
          diagnosis={diagnosis}
          register={register}
          errors={errors}
          remove={removeReferralNote}
          getValues={getValues}
          watch={watch}
        />
      )}
      {showViewSickNoteNote.show && (
        <ViewSickNote
          show={showViewSickNoteNote.show}
          handleClose={() =>
            setShowViewSickNoteNote({ show: false, sickNote: null })
          }
          sickNote={showViewSickNoteNote.sickNote}
        />
      )}
      {showViewReferralNoteNote.show && (
        <ViewReferralNote
          show={showViewReferralNoteNote.show}
          handleClose={() =>
            setShowViewReferralNoteNote({
              show: false,
              referralNote: null,
            })
          }
          referralNote={showViewReferralNoteNote.referralNote}
        />
      )}
    </div>
  );
});

export default PlanTab;
