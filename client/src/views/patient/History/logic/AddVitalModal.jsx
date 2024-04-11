/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { vitalschema } from "../vitals/utils/vitalschema";
import { useAddVitals } from "../vitals/hooks/useAddVitals";

const AddVital = (props) => {
  const pulseRateRef = useRef();
  const headCircumferenceRef = useRef();
  const waistCircumferenceRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const RBSRef = useRef();
  const FBSRef = useRef();
  const SPO2Ref = useRef();
  const SaO2Ref = useRef();
  const heartRateRef = useRef();
  const respiratoryRateRef = useRef();
  const temperatureRef = useRef();
  const systolicBloodPressureRef = useRef();
  const diastolicBloodPressureRef = useRef();
  const { mutateAsync, isPending } = useAddVitals();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(vitalschema),
  });
  const { historyId } = useParams();
  // console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);

    mutateAsync({ vitals: data, historyId }).then((resData) => {
      if (resData.status === 201) {
        props.handleClose();
      }
    });
  };
  return (
    <>
      <div>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row className="pb-1">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Temperature (°C)</Form.Label>{" "}
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={temperatureRef}
                  type="number"
                  {...register("temperature")}
                  isInvalid={errors.temperature}
                  name="temperature"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  ref={weightRef}
                  type="number"
                  {...register("weight")}
                  isInvalid={errors.weight}
                  name="weight"
                />
              </Form.Group>
            </Col>{" "}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  ref={heightRef}
                  type="number"
                  {...register("height")}
                  isInvalid={errors.height}
                  name="height"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "#f2f2f2" }} className="pb-1">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>SBP</Form.Label>{" "}
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={systolicBloodPressureRef}
                  type="number"
                  {...register("SystolicBloodPressure")}
                  isInvalid={errors.SystolicBloodPressure}
                  name="SystolicBloodPressure"
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>DBP</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>

                <Form.Control
                  ref={diastolicBloodPressureRef}
                  type="number"
                  {...register("DiastolicBloodPressure")}
                  isInvalid={errors.DiastolicBloodPressure}
                  name="DiastolicBloodPressure"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Heart Rate</Form.Label>{" "}
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={heartRateRef}
                  type="number"
                  {...register("heartRate")}
                  isInvalid={errors.heartRate}
                  name="heartRate"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="pb-1">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Respiratory Rate</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={respiratoryRateRef}
                  type="number"
                  {...register("respiratoryRate")}
                  isInvalid={errors.respiratoryRate}
                  name="respiratoryRate"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>pulseRate</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={pulseRateRef}
                  type="number"
                  {...register("pulseRate")}
                  isInvalid={errors.pulseRate}
                  name="pulseRate"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>RBS</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={RBSRef}
                  type="number"
                  {...register("RBS")}
                  isInvalid={errors.RBS}
                  name="RBS"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row style={{ backgroundColor: "#f2f2f2" }} className="pb-1">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>FBS</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={FBSRef}
                  {...register("FBS")}
                  isInvalid={errors.FBS}
                  name="FBS"
                  type="number"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>headCircumference</Form.Label>

                <Form.Control
                  ref={headCircumferenceRef}
                  type="number"
                  {...register("headCircumference")}
                  isInvalid={errors?.headCircumference}
                  name="headCircumference"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>waistCircumference</Form.Label>

                <Form.Control
                  ref={waistCircumferenceRef}
                  type="number"
                  {...register("waistCircumference")}
                  isInvalid={errors.waistCircumference}
                  name="waistCircumference"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>SPO2</Form.Label>
                <span className=" ms-1 text-danger text-center">* </span>
                <Form.Control
                  ref={SPO2Ref}
                  type="number"
                  {...register("SPO2")}
                  isInvalid={errors.SPO2}
                  name="SPO2"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>SaO2</Form.Label>

                <Form.Control
                  ref={SaO2Ref}
                  type="number"
                  {...register("SaO2")}
                  isInvalid={errors?.SaO2}
                  name="SaO2"
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <Modal.Footer className="pb-0">
            <Button variant="secondary" onClick={props.handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit" /* onClick={props.handleClose} */
              disabled={isPending}
            >
              {isPending && <Spinner animation="border" size="sm" />}+ Add
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </>
  );
};
const AddVitalModal = (props) => {
  const closeModal = () => {
    props.handleClose();
  };
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Vital Signs</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddVital handleClose={closeModal} />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default AddVitalModal;
