// import { differenceInYears } from "date-fns";
import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
// import AddVitalSignModal from "../AddVitalSignModal";
import { useGetActiveVitalSignFields } from "../hooks/useGetActiveVitalSignFields";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
// import { start } from "@popperjs/core";
import { useAddTriage } from "../hooks/useAddTriage";
import PatientGeneralInforamtion from "../../patient/patient Detail/PatientGeneralInforamtion";
// import { useGetPatient } from "../../patient/hooks/patientHooks/useGetPatient";
import { useGetPatientGeneralInfo } from "../../patient/hooks/patientHooks/useGetPatientGeneralInfo";
import { getBrandColor } from "../../../utils/getBrandColor";
import { useGetCurrentUser } from "../../../hooks/useGetCurrentUser";
import { useGetDoctors } from "../../Scheduling/hooks/useGetDoctors";
import { parse, format } from "date-fns";
const traigeSchema = yup.object().shape({
  symptom: yup.string(),
  visit_type: yup.string(),
  vitals: yup.array().of(
    yup.object().shape({
      vitalId: yup.number(),
      name: yup.string(),
      value: yup.string().when("name", ([name], schema) => {
        return schema.required(name + "  is required");
      }),
    })
  ),
  visit: yup.object().shape({
    // medicalRecord_id: yup.number().required(),
    // patient_id: yup.number().required(),
    doctor_id: yup.string().required("Doctor is required"),
    date: yup.date().required(),
    // time_of_visit: yup.string().required(),
    visit_type: yup.string().required(),
    // symptom: yup.string().required(),
  }),
});
const PerformTriage = () => {
  const { state } = useLocation();
  // const { data: patient } = useGetPatientGeneralInfo(state.patient_id);
  const user = useGetCurrentUser();
  const navigate = useNavigate();
  const { data } = useGetActiveVitalSignFields();
  const { data: doctors } = useGetDoctors();
  const { mutateAsync, isPending } = useAddTriage();
  const defaultValue = JSON.parse(
    localStorage.getItem(`medical_${state.medicalRecord_id}`)
  );
  // console.log(state.doctor.id);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: defaultValue
      ? {
          symptom: defaultValue.symptom,
          vitals: defaultValue.vitals,
          // visit: {
          //   doctor_id: state.doctor.id,
          //   date: new Date(`${state.assignment_date}T${state.visit_time}`),
          //   visit_type: state.visit_type,
          // },
        }
      : {
          // symptom: "",
          // vitals: [],
          visit: {
            doctor_id: state.doctor.id,
            date: `${state.assignment_date}T${state.visit_time}`,
            visit_type: state.visit_type,
          },
        },
    resolver: yupResolver(traigeSchema),
  });
  // console.log(new Date(`${state.assignment_date}T${state.visit_time}`));
  // const navigate = useNavigate()
  console.log(state);
  const [Doctors, setDoctors] = useState([]);
  const [showCancelTriageModal, setShowCancelTriageModal] = useState(false);
  const visitDateWatcher = watch("visit.date");
  // console.log(visitDateWatcher);
  // console.log(showAddVitalSignModal);
  // const DoctorList = useMemo(() => {
  //   console.log("sdkjfnj");
  //   if (visitDateWatcher) {
  //     const weekdayNumber = new Date(visitDateWatcher).getDay();
  //     // : new Date(state.assignment_date).getDay();
  //     console.log(weekdayNumber);
  //     const weekday = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];
  //     // console.log(visitDateWatcher.substring(11, 16) + ":00");
  //     // console.log(weekday[weekdayNumber]);
  //     return doctors?.filter((doctor) => {
  //       return doctor?.schedules?.find(
  //         (availability) =>
  //           availability.day_of_week === weekday[weekdayNumber] &&
  //           availability.start_time <= visitDateWatcher?.substring(11, 19) &&
  //           // : new Date(
  //           //     `${state.assignment_date}T${state.visit_time}`
  //           //   ).toISOString(11, 16) + ":00"
  //           availability.end_time >= visitDateWatcher?.substring(11, 16) + ":00"
  //         // : new Date(
  //         //     `${state.assignment_date}T${state.visit_time}`
  //         //   ).toISOString(11, 16) + ":00"
  //       );
  //     });
  //   } else {
  //     // const weekdayNumber = new Date(state.assignment_date).getDay();
  //     // console.log(weekdayNumber);
  //     // const weekday = [
  //     //   "Sunday",
  //     //   "Monday",
  //     //   "Tuesday",
  //     //   "Wednesday",
  //     //   "Thursday",
  //     //   "Friday",
  //     //   "Saturday",
  //     // ];
  //     // // console.log(visitDateWatcher.substring(11, 16) + ":00");
  //     // // console.log(weekday[weekdayNumber]);
  //     // return doctors?.filter((doctor) => {
  //     //   return doctor?.schedules?.find(
  //     //     (availability) =>
  //     //       availability.day_of_week === weekday[weekdayNumber] &&
  //     //       availability.start_time <= `${state.visit_time}` &&
  //     //       availability.end_time >= `${state.visit_time}`
  //     //   );
  //     // });
  //     return [];
  //   }
  // }, [visitDateWatcher]);
  useEffect(() => {
    if (visitDateWatcher) {
      const weekdayNumber = new Date(visitDateWatcher).getDay();
      // : new Date(state.assignment_date).getDay();
      console.log(weekdayNumber);
      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      // console.log(visitDateWatcher.substring(11, 16) + ":00");
      // console.log(weekday[weekdayNumber]);
      setDoctors(
        doctors?.filter((doctor) => {
          return doctor?.schedules?.find(
            (availability) =>
              availability.day_of_week === weekday[weekdayNumber] &&
              availability.start_time <= visitDateWatcher?.substring(11, 19) &&
              // : new Date(
              //     `${state.assignment_date}T${state.visit_time}`
              //   ).toISOString(11, 16) + ":00"
              availability.end_time >=
                visitDateWatcher?.substring(11, 16) + ":00"
            // : new Date(
            //     `${state.assignment_date}T${state.visit_time}`
            //   ).toISOString(11, 16) + ":00"
          );
        })
      );
    } else {
    }
  }, [visitDateWatcher]);
  // console.log(Doctors);
  // console.log(getValues("visit"));
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    const vitals = data.vitals.map((v) => {
      return {
        vitalSignField_id: v.vitalId,
        // name: v.name,
        result: v.value,
        // medicalRecord_id: state.id,
      };
    });
    // return;
    const visit = {
      visit_type: data.visit.visit_type,
      doctor_id: data.visit.doctor_id,
      date: new Date(data.visit.date).toISOString(),
      // time_of_visit: data.visit.time_of_visit,
      // symptom: data.symptom,
    };
    // console.log(visit);
    // return;
    mutateAsync({
      vitals,
      symptom: data.symptom,
      visit,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          localStorage.removeItem(`medical_${state.medicalRecord_id}`);
          navigate(-1);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const saveForLaterHandler = () => {
    console.log(getValues("vitals"));
    const data = {
      vitals: getValues("vitals"),
      symptom: getValues("symptom"),
    };
    localStorage.setItem(
      `medical_${state.medicalRecord_id}`,
      JSON.stringify(data)
    );
    if (localStorage.getItem(`medical_${state.medicalRecord_id}`)) {
      toast.success("Traige data saved successfully");
      navigate(-1);
    }
  };
  return (
    <div>
      <Container className="triage-page">
        <div className="mb-2 border-bottom py-2 mb-1 d-flex gap-3 align-items-center">
          <IoMdArrowRoundBack
            className="cursorpointer"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h4>Perform Triage</h4>
        </div>
        <div className="d-flex gap-3">
          <div style={{ flex: 75 }} className="left ">
            <div className="d-flex mt-2 justify-content-between align-items-center gap-2 top-buttons">
              <Row className="flex-grow-1">
                {/* <p className="mb-0">Nurse:</p> */}
                <Col md={6} className="d-flex gap-2 align-items-center">
                  <p className="mb-0">Nurse:</p>
                  <Form.Control
                    type="text"
                    value={user.name}
                    className="border-0"
                    disabled={true}
                  />
                </Col>
              </Row>

              <>
                {" "}
                <Button
                  size="sm"
                  variant="danger"
                  disabled={
                    !localStorage.getItem(
                      `medical_${state.medicalRecord_id}`
                    ) || isPending
                  }
                  onClick={() => setShowCancelTriageModal(true)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={isPending}
                  onClick={saveForLaterHandler}
                  variant="warning"
                  className="text-white text-nowrap"
                >
                  Save for Later
                </Button>
                <Button
                  size="sm"
                  form="traigeForm"
                  // formTarget="traigeForm"
                  type="submit"
                  variant="success"
                  disabled={isPending}
                >
                  {isPending && <Spinner size="sm" animation="border" />}
                  Finish
                </Button>
              </>
            </div>

            <Form
              id="traigeForm"
              className="mt-2"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h5
                style={{ color: getBrandColor() }}
                className="border-bottom p-2"
              >
                Vital Signs
              </h5>
              <Row className="">
                {data?.map((field, index) => (
                  <Col key={field.id} md={4} sm={12} className="mb-2">
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
                        // placeholder={field.name}
                        isInvalid={errors?.vitals?.[index]?.value}
                      />
                      {/* <Form.Text>{field.name}</Form.Text> */}
                      <Form.Control.Feedback type="invalid">
                        {errors?.vitals?.[index]?.value?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Control type="text" placeholder={field.name} /> */}
                  </Col>
                ))}
                <Col md={4} sm={12} className="mb-2"></Col>
              </Row>

              <Row className="">
                <h5
                  style={{ color: getBrandColor() }}
                  className="border-bottom p-2 mb-2"
                >
                  Change Visit
                </h5>
                <Col md={4} sm={12} className="mb-2">
                  {" "}
                  <Form.Group className="mb-3">
                    <Form.Label>Visit Type</Form.Label>
                    <Form.Select
                      type="text"
                      {...register("visit.visit_type")}
                      // defaultValue={state.v}
                    >
                      <option value="">Please Select</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Routine">Routine Check-up</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.visit?.visit_type?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} sm={12} className="mb-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Visit Time</Form.Label>
                    <Form.Control
                      // defaultValue={new Date(
                      //   `${state.assignment_date}T${state.visit_time}`
                      // )
                      //   .toISOString()
                      //   .substring(0, 19)}
                      // defaultValue={`${state.assignment_date}T${state.visit_time}`}
                      type="datetime-local"
                      {...register("visit.date", {
                        onChange: (e) => {
                          // setShowAddVitalSignModal(e.target.value);
                          // setValue("visit.doctor_id", "");
                        },
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} sm={12} className="mb-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Assigned Doctor</Form.Label>
                    <Form.Select
                      {...register("visit.doctor_id")}
                      isInvalid={errors.visit?.doctor_id}
                      aria-label="Default select example"
                      // defaultValue={state.doctor.id}
                    >
                      <option value="">Select Doctor</option>
                      {Doctors?.map((doctor, index) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.employee.firstName}{" "}
                          {doctor.employee.middleName}{" "}
                          {doctor.employee.lastName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.visit?.doctor_id?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              {/* <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer> */}
            </Form>
          </div>
          <div style={{ flex: 25 }} className="right p-2 border">
            <PatientGeneralInforamtion
              patient={state.patient}
              medicalRecordId={state.medicalRecord_id}
            />
          </div>
        </div>

        {/* <Row className="vital-signs-section">
          <Col>
            <h2>Vital Signs</h2>
          </Col>
        </Row>

        <Row className="chief-complaint-section">
          <Col>
            <h2>Chief Complaint</h2>
            <Form.Control type="text" placeholder="Enter chief complaint" />
            <div className="common-complaints"></div>
          </Col>
        </Row>

        <Row className="symptom-notes-section">
          <Col>
            <h2>Symptom Notes</h2>
            <Form.Control as="textarea" />
          </Col>
        </Row>

        <Row className="patient-info-section">
          <Col>
            <h2>Patient Information</h2>
            <div className="patient-details">
              <p>
                Name: <span className="patient-name"></span>
              </p>
              <p>
                Sex: <span className="patient-sex"></span>
              </p>
              <p>
                Age: <span className="patient-age"></span>
              </p>
            </div>

            <div className="allergies-section">
              <h3>Allergies</h3>
              <div className="allergies-list">sdfsg</div>
              <Button variant="primary">Add Allergy</Button>
            </div>
          </Col>
        </Row> */}
      </Container>

      {/* {showAddVitalSignModal && (
        <AddVitalSignModal
          handleClose={() => setShowAddVitalSignModal(false)}
          show={showAddVitalSignModal}
          // patient={state.patient}
          // doctor={state.doctor}
          // assignment_date={state.assignment_date}
          // visit_time={state.visit_time}
          // visit_type={state.visit_type}
          // status={state.status}
          // stage={state.stage}
          // reason={state.reason}
        />
      )} */}

      {showCancelTriageModal && (
        <Modal
          size="sm"
          show={showCancelTriageModal}
          onHide={() => setShowCancelTriageModal(false)}
          backdrop="static"
          centered
        >
          <Modal.Body>{`Are you sure you want to cancel traige for this visit?`}</Modal.Body>

          <div className="d-flex justify-content-end gap-3 p-3">
            <Button
              variant="secondary"
              onClick={() => setShowCancelTriageModal(false)}
            >
              Exit
            </Button>
            <Button
              variant={"danger"}
              // disabled={startTraige.isPending || finishTraige.isPending}
              onClick={() => {
                localStorage.removeItem(`medical_${state.medicalRecord_id}`);
                if (
                  !localStorage.getItem(`medical_${state.medicalRecord_id}`)
                ) {
                  toast.success("Traige data saved successfully");
                }
                setShowCancelTriageModal(false);
                navigate(-1);
              }}
            >
              {/* {(startTraige.isPending || finishTraige.isPending) && (
            <Spinner animation="border" size="sm" />
          )} */}
              Yes
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PerformTriage;
