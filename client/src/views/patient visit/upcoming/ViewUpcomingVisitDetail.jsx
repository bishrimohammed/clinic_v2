// import { differenceInYears } from "date-fns";
import React, { useState } from "react";
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
import AddVitalSignModal from "../AddVitalSignModal";
import { useGetActiveVitalSignFields } from "../hooks/useGetActiveVitalSignFields";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
// import { start } from "@popperjs/core";
import { useAddTriage } from "../hooks/useAddTriage";
import PatientGeneralInforamtion from "../../patient/patient Detail/PatientGeneralInforamtion";
import { useGetPatient } from "../../patient/hooks/patientHooks/useGetPatient";
import { useGetPatientGeneralInfo } from "../../patient/hooks/patientHooks/useGetPatientGeneralInfo";
import { getBrandColor } from "../../../utils/getBrandColor";
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
});
const ViewUpcomingVisitDetail = () => {
  const { state } = useLocation();
  const { data: patient } = useGetPatientGeneralInfo(state.patient_id);
  const navigate = useNavigate();
  const { data } = useGetActiveVitalSignFields();
  const { mutateAsync, isPending } = useAddTriage();
  const defaultValue = JSON.parse(
    localStorage.getItem(`medical_${state.medicalRecord_id}`)
  );
  // console.log(state);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: defaultValue
      ? {
          symptom: defaultValue.symptom,
          vitals: defaultValue.vitals,
        }
      : undefined,
    resolver: yupResolver(traigeSchema),
  });
  // const navigate = useNavigate()
  //   console.log(state);
  const [showAddVitalSignModal, setShowAddVitalSignModal] = useState(false);
  const [showCancelTriageModal, setShowCancelTriageModal] = useState(false);

  const submitHandler = (data) => {
    console.log(data);

    const vitals = data.vitals.map((v) => {
      return {
        vitalSignField_id: v.vitalId,
        // name: v.name,
        result: v.value,
        // medicalRecord_id: state.id,
      };
    });
    // return;
    mutateAsync({ vitals, symptom: data.symptom, visit_type: data.visit_type })
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
          <h4>Add Triage for this visit</h4>
        </div>
        <div className="d-flex gap-3">
          <div style={{ flex: 75 }} className="left ">
            <div className="d-flex mt-2 justify-content-end gap-2 top-buttons">
              <Button
                variant="danger"
                disabled={
                  !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
                  isPending
                }
                onClick={() => setShowCancelTriageModal(true)}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                onClick={saveForLaterHandler}
                variant="warning"
                className="text-white"
              >
                Save for Later
              </Button>
              <Button
                form="traigeForm"
                // formTarget="traigeForm"
                type="submit"
                variant="success"
                disabled={isPending}
              >
                {isPending && <Spinner size="sm" animation="border" />}
                Finish
              </Button>
            </div>

            <Form id="traigeForm" onSubmit={handleSubmit(submitHandler)}>
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
              {/* <hr className="mt-0" /> */}
              {/* <h5 className="border-bottom p-2 mb-3">Chief Complaint</h5> */}
              <Row className="">
                {/* <Form.Group className="mb-3">
                  <Form.Label>Chief Complaint</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Chief Complaint"
                    {...register("chiefComplaint")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.chiefComplaint?.message}
                  </Form.Control.Feedback>
                </Form.Group> */}
                {/* <Form.Group className="mb-3">
                  <Form.Label>Symptom Notes </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Symptom notes"
                    {...register("symptom")}
                    hidden
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.symptom?.message}
                  </Form.Control.Feedback>
                </Form.Group> */}
                <h5
                  style={{ color: getBrandColor() }}
                  className="border-bottom p-2 mb-2"
                >
                  Change Visit Type
                </h5>
                <Form.Group className="mb-3">
                  <Form.Label>Visit Type</Form.Label>
                  <Form.Select
                    type="text"
                    {...register("visit_type")}
                    defaultValue={state.visit_type}
                  >
                    <option value="">Please Select</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Routine">Routine Check-up</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.visit_type?.message}
                  </Form.Control.Feedback>
                </Form.Group>
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
            <PatientGeneralInforamtion patient={patient} />
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

      {showAddVitalSignModal && (
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
      )}

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

export default ViewUpcomingVisitDetail;
