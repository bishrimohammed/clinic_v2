import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetPatientReport } from "./hooks/useGetPatientReport";
import PatientAppoinmentReport from "./patientReport/PatientAppoinmentReport";
import PatientVisitReport from "./patientReport/PatientVisitReport";
import PatientAdmittedReport from "./patientReport/PatientAdmittedReport";
const patientReportSchema = yup.object().shape({
  report_type: yup.string().required("Report type is required"),
  report_target: yup.string().required("Report target is required"),
});
const PatientDataReport = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(patientReportSchema),
  });
  const [formData, setFormData] = useState({
    report_type: "",
    report_target: "",
  });
  const [triggerFetch, setTriggerFetch] = useState(false);

  const submitHandler = (data) => {
    setFormData(data);
    setTriggerFetch(true); // Trigger the fetch
  };
  // const successRef = useRef(0);
  const { data, isLoading, error, isSuccess, isPending, isFetching } =
    useGetPatientReport(formData, triggerFetch, setTriggerFetch);
  // console.log(data);
  return (
    <div>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>
                Report Time:
                {/* <span className="text-muted">(optional)</span>{" "} */}
              </Form.Label>
              <Form.Select {...register("report_type")}>
                <option value="">Select Report</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                {/* <option value="custom">Custom</option> */}

                {/* <option value="quarterly">Quarterly</option> */}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Group>
              <Form.Label>
                Report Target: <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Select {...register("report_target")}>
                <option value="">Select Report</option>
                <option value="appointed">Appointed</option>
                <option value="visited">Visited</option>
                <option value="admitted">Admitted</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col
            md={2}
            className="d-flex justify-content-center align-items-center "
          >
            <Form.Group>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={Object.values(errors).length > 0}
              >
                Generate Report
              </button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {isFetching && <Spinner />}
      {formData.report_target === "appointed" && data && (
        <PatientAppoinmentReport appointmentReport={data} />
      )}
      {formData.report_target === "visited" && data && (
        <PatientVisitReport visitedReport={data} />
      )}
      {formData.report_target === "admitted" && (
        <PatientAdmittedReport admittedReport={data} />
      )}
    </div>
  );
};

export default PatientDataReport;
