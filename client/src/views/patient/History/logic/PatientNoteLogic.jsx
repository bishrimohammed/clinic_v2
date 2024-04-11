/* eslint-disable react/prop-types */

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import TextAreaInput from "../../../../components/inputs/TextAreaInput";

import { History_Note_schema } from "../note/utils/histirynote-validation";

import { useAddHistoryNote } from "../note/hooks/useAddHistoryNote";
import { useGetHistoryNote } from "../note/hooks/useGetHistoryNote";

const PatientNoteLogic = () => {
  const { historyId } = useParams();
  const { mutate, isPending } = useAddHistoryNote();
  const { data: history, isFetching, error } = useGetHistoryNote(historyId);
  // console.log(
  //   JSON.parse(history?.physicalExamination?.general_appreance)
  // );
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      // assesement: history ? history?.assassement : "",
      // chiefcomplaint: history ? history?.chief_complaint : "",
      // HPI: history?.hpi || "",
      // plan: history?.plan || "",
      vital: {
        pulse_rate: history?.vital?.pulse_rate || "",
        SPO2: history?.vital?.SPO2 || "",
        // SaO2: history?.vital?.SaO2 || "",
        respiration_rate: history?.vital?.respiration_rate || "",
        height: history?.vital?.height || "",
        weight: history?.vital?.weight || "",
        temperature: history?.vital?.temperature || "",
        diastolic_blood_pressure:
          history?.vital?.diastolic_blood_pressure || "",
        systolic_blood_pressure: history?.vital?.systolic_blood_pressure || "",
      },
      // physicalExamination: {
      //   general_appreance: {
      //     // normal: "false",
      //     remark: history?.physicalExamination?.general_appreance?.remark || "",
      //   },
      //   cardiovascular: {
      //     normal: history?.physicalExamination?.cardiovascular?.normal || "",
      //     remark: history?.physicalExamination?.cardiovascular?.remark || "",
      //   },

      //   abdominal: {
      //     normal: history?.physicalExamination?.abdominal?.normal,
      //     remark: history?.physicalExamination?.abdominal?.remark || "",
      //   },

      //   HEENT: {
      //     normal: history?.physicalExamination?.HEENT?.normal || "",
      //     remark: history?.physicalExamination?.HEENT?.remark || "",
      //   },
      //   musculoskeletal: {
      //     normal: history?.physicalExamination?.musculoskeletal?.normal || "",
      //     remark: history?.physicalExamination?.musculoskeletal?.remark || "",
      //   },
      //   neurological: {
      //     normal: history?.physicalExamination?.neurological?.normal || "",
      //     remark: history?.physicalExamination?.neurological?.remark || "",
      //   },
      //   respiratory: {
      //     normal: history?.physicalExamination?.respiratory?.normal || "",
      //     // remark: history?.physicalExamination?.respiratory?.remark || "",
      //   },
      // },
    },
    resolver: yupResolver(History_Note_schema),
  });

  if (isFetching) return <Spinner animation="grow" variant="primary" />;
  if (error) return <div>error : {error.message}</div>;

  const submitHandler = (data) => {
    // console.log(data);
    // return;
    mutate({ ...data, historyId });
  };
  console.log(history);
  const handleSetvalue = (value) => {
    setValue("physicalExamination.abdominal.normal", value);
    // setValue("physicalExamination.CNS.normal", value);
    setValue("physicalExamination.cardiovascular.normal", value);

    setValue("physicalExamination.neurological.normal", value);
    setValue("physicalExamination.respiratory.normal", value);
    setValue("physicalExamination.HEENT.normal", value);
    setValue("physicalExamination.musculoskeletal.normal", value);
    setValue("physicalExamination.general_appreance.normal", value);
    setValue("physicalExamination.abdominal.normal", value);
  };

  const parsePhysicsExamination = (value) => {
    return value && JSON.parse(value);
  };
  return (
    <Container>
      <hr />

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">
            Chief complaint :
          </Form.Label>
          <Form.Control
            type="text"
            // value={history.chief_complaint}
            isInvalid={errors.chiefcomplaint}
            {...register("chiefcomplaint")}
            key="chiefcomplaint"
            defaultValue={history ? history.chief_complaint : ""}
            name="chiefcomplaint"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">HPI :</Form.Label>
          {/* <TextAreaInput
            errors={errors.HPI}
            register={register}
            defaultValue
            key="HPI"
            name="HPI"
          /> */}
          <Form.Control
            as="textarea"
            defaultValue={history ? history.hpi : ""}
            {...register("HPI")}
            name="HPI"
            isInvalid={errors.HPI}
          />
        </Form.Group>

        <hr />
        <div>
          <div className="mb-3">
            <h5>physical exam</h5>
          </div>
          <hr className="mt-0 mb-3" />
          <>
            <div className="physical_vital border border-1 border-secondary-subtle rounded-1 px-2 py-3 mb-2">
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>SBP</Form.Label>

                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.systolic_blood_pressure}
                      {...register("vital.systolic_blood_pressure")}
                      name="vital.systolic_blood_pressure"
                    />
                    <Form.Text muted>mmHg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>DBP</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.diastolic_blood_pressure}
                      {...register("vital.diastolic_blood_pressure")}
                      name="vital.diastolic_blood_pressure"
                    />
                    <Form.Text muted>mmHg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>Temperature</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.temperature}
                      {...register("vital.temperature")}
                      name="vital.temperature"
                    />
                    <Form.Text muted>
                      <sup>o</sup>C
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>PR</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.pulse_rate}
                      {...register("vital.pulse_rate")}
                      name="vital.pulse_rate"
                    />
                    <Form.Text muted>breath/min</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>RR</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.respiration_rate}
                      {...register("vital.respiration_rate")}
                      name="vital.respiration_rate"
                    />
                    <Form.Text muted>breath/min</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>SPO2</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.SPO2}
                      {...register("vital.SPO2")}
                      name="vital.SPO2"
                    />
                    <Form.Text muted>%</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>height</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.height}
                      {...register("vital.height")}
                      name="vital.height"
                    />
                    <Form.Text muted>cm</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 d-flex gap-1 ">
                    <Form.Label>weight</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.weight}
                      {...register("vital.weight")}
                      name="vital.weight"
                    />
                    <Form.Text muted>kg</Form.Text>
                  </Form.Group>
                </Col>
                <Col>
                  {/* <Form.Group className="mb-3 d-flex gap-2 ">
                    <Form.Label>SaO2</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      isInvalid={errors.vital?.SaO2}
                      {...register("vital.SaO2")}
                      name="vital.SaO2"
                    />
                  </Form.Group> */}
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
            {/* <hr className="mt-0 mb-3" /> */}
            <div>
              <div className="p-2 d-flex gap-2">
                <button
                  onClick={() => handleSetvalue("true")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  all normal
                </button>
                <button
                  onClick={() => handleSetvalue("false")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  all abnormal
                </button>
                <button
                  onClick={() => handleSetvalue("")}
                  className="btn btn-outline-info"
                  type="button"
                >
                  reset
                </button>
              </div>
              <Row className="border border-1 ">
                <Col xs={3} className="d-flex align-items-center"></Col>
                <Col xs={2} className="d-flex align-items-center ">
                  Normal
                </Col>
                <Col xs={2} className="d-flex align-items-center ">
                  Abnormal
                </Col>
                <Col xs={5}>Remark</Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">General Appreance</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    // defaultChecked={
                    //   history
                    //     ? history?.physicalExamination?.general_appreance
                    //         ?.normal
                    //     : ""
                    // }
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.general_appreance
                      )?.normal
                    }
                    // defaultValue="false"
                    //label="Normal"
                    value="true"
                    //name="general_appreance"
                    type="radio"
                    name="physicalExamination.general_appreance.normal"
                    //isInvalid={errors.physicalExamination?.general_appreance?.normal}
                    {...register(
                      "physicalExamination.general_appreance.normal"
                    )}
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    // defaultChecked={
                    //   history
                    //     ? !history?.physicalExamination?.general_appreance
                    //         ?.normal
                    //     : ""
                    // }
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.general_appreance
                      )?.normal
                    }
                    type="radio"
                    //isInvalid={errors.physicalExamination?.general_appreance?.normal}
                    {...register(
                      "physicalExamination.general_appreance.normal"
                    )}
                    name="physicalExamination.general_appreance.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    // name="general_appreanceRemark"
                    type="text"
                    //errors={errors.physicalExamination?.general_appreance?.remark}
                    {...register(
                      "physicalExamination.general_appreance.remark"
                    )}
                    name="physicalExamination.general_appreance.remark"
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">HEENT</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.heent
                      )?.normal
                    }
                    type="radio"
                    //isInvalid={errors.physicalExamination?.HEENT?.normal}
                    {...register("physicalExamination.HEENT.normal")}
                    name="physicalExamination.HEENT.normal"
                  />
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    // name="HEENT"
                    type="radio"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.heent
                      )?.normal
                    }
                    isInvalid={errors.physicalExamination?.HEENT?.normal}
                    {...register("physicalExamination.HEENT.normal")}
                    name="physicalExamination.HEENT.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //name="HEENTRemark"
                    type="text"
                    errors={errors.physicalExamination?.HEENT?.remark}
                    {...register("physicalExamination.HEENT.remark")}
                    name="physicalExamination.HEENT.remark"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.heent
                      )?.remark
                    }
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">cardiovascular</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.cardiovascular
                      )?.normal
                    }
                    value="true"
                    //name="cardiovascular"
                    type="radio"
                    //isInvalid={errors.physicalExamination?.cardiovascular?.normal}
                    {...register("physicalExamination.cardiovascular.normal")}
                    name="physicalExamination.cardiovascular.normal"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.cardiovascular
                      )?.normal
                    }
                    type="radio"
                    //isInvalid={errors.physicalExamination?.cardiovascular?.normal}
                    {...register("physicalExamination.cardiovascular.normal")}
                    name="physicalExamination.cardiovascular.normal"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    type="text"
                    //isInvalid={errors.physicalExamination?.cardiovascular?.remark}
                    {...register("physicalExamination.cardiovascular.remark")}
                    name="physicalExamination.cardiovascular.remark"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.cardiovascular
                      )?.remark
                    }
                  />
                </Col>
              </Row>

              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">respiratory</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    // defaultChecked={history.physicalExamination?.respiratory?.normal}
                    //isInvalid={errors.physicalExamination?.respiratory?.normal}
                    {...register("physicalExamination.respiratory.normal")}
                    name="physicalExamination.respiratory.normal"
                    value="true"
                    type="radio"
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.respiratory
                      )?.normal
                    }
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //defaultChecked={!history.physicalExamination?.respiratory?.normal}
                    value="false"
                    //isInvalid={errors.physicalExamination?.respiratory?.normal}
                    {...register("physicalExamination.respiratory.normal")}
                    name="physicalExamination.respiratory.normal"
                    type="radio"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.respiratory
                      )?.normal
                    }
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //errors={errors.physicalExamination?.respiratory?.remark}
                    {...register("physicalExamination.respiratory.remark")}
                    name="physicalExamination.respiratory.remark"
                    type="text"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.respiratory
                      )?.remark
                    }
                  />
                </Col>
              </Row>

              {/* abdo */}
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">abdominal</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.abdominal
                      )?.normal
                    }
                    //isInvalid={errors.physicalExamination?.abdominal?.normal}
                    {...register("physicalExamination.abdominal.normal")}
                    name="physicalExamination.abdominal.normal"
                    type="radio"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    value="false"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.abdominal
                      )?.normal
                    }
                    //isInvalid={errors.physicalExamination?.abdominal?.normal}
                    {...register("physicalExamination.abdominal.normal")}
                    name="physicalExamination.abdominal.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    // //isInvalid={errors.physicalExamination?.abdominal?.remark}
                    {...register("physicalExamination.abdominal.remark")}
                    name="physicalExamination.abdominal.remark"
                    type="text"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.abdominal
                      )?.remark
                    }
                  />
                </Col>
              </Row>

              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">musculoskeletal</Form.Label>
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.musculoskeletal
                      )?.normal
                    }
                    //errors={errors.physicalExamination?.musculoskeletal?.normal}
                    {...register("physicalExamination.musculoskeletal.normal")}
                    name="physicalExamination.musculoskeletal.normal"
                    type="radio"
                  />
                </Col>

                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    //  label="Abnoraml"
                    value="false"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.musculoskeletal
                      )?.normal
                    }
                    {...register("physicalExamination.musculoskeletal.normal")}
                    name="physicalExamination.musculoskeletal.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0 "
                    //isInvalid={errors.physicalExamination?.musculoskeletal?.remark}
                    {...register("physicalExamination.musculoskeletal.remark")}
                    name="physicalExamination.musculoskeletal.remark"
                    type="text"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.musculoskeletal
                      )?.remark
                    }
                  />
                </Col>
              </Row>
              <Row className="border border-1 py-1">
                <Col xs={3} className="d-flex align-items-center">
                  <Form.Label className="fw-bold">neurological</Form.Label>
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-start border-end border-2  border-start-3  border-end-3"
                >
                  {" "}
                  <Form.Check
                    className="d-flex align-items-center"
                    inline
                    value="true"
                    defaultChecked={
                      parsePhysicsExamination(
                        history?.physicalExamination?.neurological
                      )?.normal
                    }
                    //isInvalid={errors.physicalExamination?.neurological?.normal}
                    {...register("physicalExamination.neurological.normal")}
                    name="physicalExamination.neurological.normal"
                    type="radio"
                  />
                </Col>
                <Col
                  xs={2}
                  className="d-flex align-items-center  justify-content-center border-end border-2 border-end-3"
                >
                  {" "}
                  <Form.Check
                    inline
                    value="false"
                    defaultChecked={
                      !parsePhysicsExamination(
                        history?.physicalExamination?.neurological
                      )?.normal
                    }
                    //isInvalid={errors.physicalExamination?.neurological?.normal}
                    {...register("physicalExamination.neurological.normal")}
                    name="physicalExamination.neurological.normal"
                    type="radio"
                  />
                </Col>
                <Col xs={5}>
                  <Form.Control
                    className="border border-0"
                    isInvalid={errors.physicalExamination?.neurological?.remark}
                    {...register("physicalExamination.neurological.remark")}
                    name="physicalExamination.neurological.remark"
                    type="text"
                    defaultValue={
                      parsePhysicsExamination(
                        history?.physicalExamination?.neurological
                      )?.remark
                    }
                  />
                </Col>
              </Row>

              <hr className="mt-0 mb-3" />

              <hr className="mt-0 mb-3" />
            </div>
          </>
        </div>
        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">plan :</Form.Label>
          <TextAreaInput
            errors={errors.plan}
            register={register}
            key="plan"
            name="plan"
            defaultValue={history?.plan}
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex align-items-center gap-3">
          <Form.Label className="text-nowrap fw-bold">assesement :</Form.Label>
          <TextAreaInput
            errors={errors.assesement}
            register={register}
            key="assesement"
            name="assesement"
            defaultValue={history?.assassement}
          />
        </Form.Group>
        <div className="d-flex justifyContentEnd">
          <Col>
            <Button
              disabled={history ? !history?.status : false || isPending}
              variant="success"
              className="w-100"
              type="submit"
            >
              {isPending && <Spinner animation="border" size="sm" />}
              {history ? "+ Update" : "+ Add"}
            </Button>
          </Col>
        </div>
      </Form>
      <hr />
    </Container>
  );
};

export default PatientNoteLogic;
