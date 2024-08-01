import React, { useMemo } from "react";
import { useGetPatient } from "../../../hooks/patientHooks/useGetPatient";
import { useGet_Internal_MedicalRecordPrescription } from "../../../hooks/consultationHooks/medication/useGet_Internal_MedicalRecordPrescription";
import { useGet_External_MedicalRecordPrescription } from "../../../hooks/consultationHooks/medication/useGet_External_MedicalRecordPrescription";
import { useGetClinicInformation } from "../../../../Administration/clinic setting/hooks/useGetClinicInformation";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { MdEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Host_URL } from "../../../../../utils/getHost_URL";
import { useLocation } from "react-router-dom";
import { useGetCurrentUser } from "../../../../../hooks/useGetCurrentUser";

const PreviewSickLeaveNote2 = ({
  show,
  handleClose,
  sicknote,
  diagnosis,
  control,
  getValues,
  remove,
  fieldIndex,
  register,
  errors,
}) => {
  const { data: clinicData } = useGetClinicInformation();
  const { state } = useLocation();
  const { data: patient } = useGetPatient(state.patient_id);
  const { data: internalPrescriptions } =
    useGet_Internal_MedicalRecordPrescription(state.medicalRecord_id);
  const { data: externalPrescriptions } =
    useGet_External_MedicalRecordPrescription(state.medicalRecord_id);
  const prescriptions = useMemo(
    () => internalPrescriptions?.concat(externalPrescriptions),
    [internalPrescriptions, externalPrescriptions]
  );
  const user = useGetCurrentUser();
  const diagnosesSelectOptions = useMemo(() =>
    diagnosis.map((diag) => {
      return { value: diag.id, label: diag.diagnosis };
    })
  );
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      borderBottom: `1px solid ${clinicData?.brand_color}`,
      borderRadius: "0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#999",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
      color: state.isSelected ? "#333" : "#666",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
  };
  return (
    <Modal
      show={show}
      // style={{ width: 800 }}
      size="md"
      onHide={() => {
        // if (
        //   errors.sick_notes?.[fieldsLength - 1]?.end_date ||
        //   getValues(`sick_notes[${fieldsLength - 1}].end_date`) === ""
        // ) {
        //   //   console.log(`sick_notes[${fieldsLength - 1}].end_date`);
        //   remove(fieldsLength - 1);
        // }
        if (
          errors.sick_notes?.[fieldIndex]?.sickleave ||
          getValues(`sick_notes[${fieldIndex}].sickleave`) === ""
        ) {
          //   console.log(`sick_notes[${fieldsLength - 1}].end_date`);
          remove(fieldIndex);
        }
        handleClose(false);
      }}
      //   backdrop="static"
    >
      <Modal.Header className="py-3" closeButton>
        <Modal.Title>Preview Sick Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ color: clinicData?.brand_color }}>
          <div style={{ width: "70%" }} className="d-flex flex-column">
            <div>
              <h5
                style={{ textTransform: "uppercase" }}
                className="text-center"
              >
                {clinicData?.name}
              </h5>
            </div>
            <div
              style={{ fontSize: 13 }}
              className="d-flex justify-content-between align-items-center text-sm"
            >
              <span>
                <MdOutlinePhoneInTalk /> {clinicData?.address?.phone_1}
              </span>
              <span>
                <MdEmail /> {clinicData?.address?.email}
              </span>
              <span>
                {/* <img src={internetIcon} width={13} color="red" alt="" /> */}
                <TbWorldWww className="me-1" />
                {clinicData?.website_url}
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-2">
            <div className="d-flex flex-column">
              {" "}
              <div className="d-flex align-items-center gap-2">
                <span className="">Date</span>
                <input
                  type="date"
                  style={{
                    border: "none",
                    borderBottom: `1px solid ${clinicData?.brand_color}`,
                    outline: "none",
                  }}
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  max={new Date().toISOString().substring(0, 10)}
                  className=" p-1"
                />
              </div>
              <div className="d-flex align-items-center mt-2 gap-2">
                <span className="">Card No.</span>
                <p
                  style={{
                    border: "none",
                    borderBottom: `1px solid ${clinicData?.brand_color}`,
                    // outline: "none",
                  }}
                  className="mb-0 text-dark flex-grow-1"
                >
                  {patient?.card_number}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            {" "}
            <h5
              style={{
                border: "none",
                borderBottom: `2px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              // className="border-bottom"
            >
              Medical Certificate
            </h5>
          </div>
          <div className="d-flex align-items-center gap-1 mt-1">
            <span className="me-1">Patient's Name</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark flex-grow-1 px-2"
            >
              {patient?.firstName +
                " " +
                patient?.middleName +
                " " +
                patient?.lastName}
            </p>
          </div>
          <div className="d-flex gap-3 mt-2">
            <div className="d-flex align-items-center  mt-1">
              <span className="me-1">Age</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark flex-grow-1 px-1"
              >
                {patient?.birth_date}
              </p>
            </div>
            <div className="d-flex align-items-center  mt-1">
              <span className="me-1">Sex</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark flex-grow-1 px-1"
              >
                {patient?.gender}
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 mt-3">
            <h6>Diagnosis</h6>
            <span className="flex-grow-1">
              {" "}
              <Controller
                control={control}
                name={`sick_notes[${fieldIndex}].diagnosis`}
                render={({ field }) => (
                  // <CreatableSelect
                  //   {...field}
                  //   isMulti
                  //   placeholder="Type to select or create options..."
                  //   // formatCreateLabel={handleCreateOption}
                  //   options={chiefComplaintOptions}
                  //   defaultValue={chiefs}
                  //   styles={{
                  //     control: (baseStyles, state) => ({
                  //       ...baseStyles,
                  //       borderColor: errors.chief_complaint
                  //         ? "red"
                  //         : state.isFocused
                  //         ? "white"
                  //         : "grey",
                  //     }),
                  //   }}
                  // />
                  <Select
                    {...field}
                    isMulti
                    styles={customStyles}
                    options={diagnosesSelectOptions}
                    placeholder="Select diagnosis"
                  />
                )}
              />
              {/* <Select
              isMulti
              styles={customStyles}
              options={diagnosesSelectOptions}
            /> */}
            </span>
          </div>
          <div className="d-flex align-items-center gap-1 mt-3">
            <span className="me-1 text-nowrap">Treatment's Given</span>
            <p
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                // outline: "none",
              }}
              className="mb-0 text-dark flex-grow-1 px-2"
            >
              {prescriptions?.map((prescription, index) => (
                <span key={prescription.id}>
                  {prescription.is_internal
                    ? prescription.medicine.service_name
                    : prescription.drug_name}
                  {index + 1 !== prescriptions?.length ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <div className="d-flex align-items-center mt-3">
            <span className="me-1">Sick Leave</span>
            <input
              type="number"
              style={{
                border: "none",
                borderBottom: `1px solid ${clinicData?.brand_color}`,
                outline: "none",
              }}
              {...register(`sick_notes.${fieldIndex}.sickleave`)}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center gap-1 mt-3">
              <span className="me-1 text-nowrap">Physicain Name</span>
              <p
                style={{
                  border: "none",
                  borderBottom: `1px solid ${clinicData?.brand_color}`,
                  // outline: "none",
                }}
                className="mb-0 text-dark  px-2"
              >
                {user.doctor_titer ? (
                  <img width={100} src={Host_URL + user.doctor_titer} />
                ) : (
                  user.name
                )}
              </p>
            </div>
            <div className="d-flex align-items-center gap-2 mt-3">
              <span className="me-1 text-nowrap">Signature</span>
              <p
                style={
                  {
                    // border: "none",
                    // borderBottom: `1px solid ${clinicData?.brand_color}`,
                    // outline: "none",
                  }
                }
                className="mb-0 text-dark  px-2"
              >
                {<img width={100} src={Host_URL + user.digital_signature} />}
              </p>
            </div>
          </div>
        </div>

        {/* <Form.Group className="my-3 px-2">
        <Form.Label>
          {" "}
          <span className="border-bottom pb-1">Diagnosis</span>{" "}
        </Form.Label>
        {diagnosis?.map((d, index) => (
          <Fragment key={d.id}>
            <Form.Check
              type="checkbox"
              {...register(
                `sick_notes.${fieldsLength - 1}.diagnosis[${index}].value`
              )}
              label={d.diagnosis + "(" + d.status + ")"}
              // placeholder="Diagnosis"
            />
            <input
              type="hidden"
              {...register(
                `sick_notes.${
                  fieldsLength - 1
                }.diagnosis[${index}].diagnosis_id`
              )}
              value={d.id}
            />
          </Fragment>
        ))}
      </Form.Group> */}
        <Row>
          {/* <Col md={6} sm={12}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="number"
              {...register(`sick_notes.${fieldsLength - 1}.sickleave`)}
              placeholder="Start Date"
              isInvalid={errors?.sick_notes?.[fieldsLength - 1]?.sickleave}
              // defaultValue={new Date().toISOString().substring(0, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sick_notes?.[fieldsLength - 1]?.sickleave?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col> */}
          {/* <Col md={4} sm={12}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              {...register(`sick_notes.${fieldsLength - 1}.start_date`)}
              placeholder="Start Date"
              isInvalid={errors?.sick_notes?.[fieldsLength - 1]?.start_date}
              defaultValue={new Date().toISOString().substring(0, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sick_notes?.[fieldsLength - 1]?.start_date?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12}>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              {...register(`sick_notes.${fieldsLength - 1}.end_date`)}
              placeholder="End Date"
              isInvalid={errors.sick_notes?.[fieldsLength - 1]?.end_date}
              min={new Date().toISOString().substring(0, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.sick_notes?.[fieldsLength - 1]?.end_date?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col> */}
          {/* <Col md={4} sm={12}></Col>
        <Col md={4} sm={12}></Col> */}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            if (
              errors.sick_notes?.[fieldIndex]?.sickleave ||
              getValues(`sick_notes[${fieldIndex}].sickleave`) === ""
            ) {
              //   console.log(`sick_notes[${fieldIndex}].end_date`);
              remove(fieldIndex);
            }
            handleClose();
          }}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewSickLeaveNote2;
