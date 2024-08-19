import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetVisitSeenPerDoctor } from "./hooks/useGetVisitSeenPerDoctor";
const FilterReportSchema = yup.object().shape({
  report_type: yup.string().required("Report type is required"),
  // report_target: yup.string().required("Report target is required"),
});
const DoctorPatientVisitReport = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FilterReportSchema),
  });
  const [formData, setFormData] = useState({
    report_type: "",
  });
  const [triggerFetch, setTriggerFetch] = useState(false);

  const submitHandler = (data) => {
    setFormData(data);
    setTriggerFetch(true); // Trigger the fetch
  };
  // const successRef = useRef(0);
  const { data, isLoading, error, isSuccess, isPending, isFetching } =
    useGetVisitSeenPerDoctor(formData, triggerFetch, setTriggerFetch);
  console.log(data);
  return (
    <div>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col md={4} className="mb-3">
            <Form.Group controlId="financialReport">
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
          {/* 
          {watch("report_type") === "custom" && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Date Range:</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Group>
                    <Form.Control type="date" {...register("start_date")} />
                    <Form.Text>Start Date</Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control type="date" {...register("end_date")} />
                    <Form.Text>End Date</Form.Text>
                  </Form.Group>
                </div>
              </Form.Group>
            </Col>
          )}{" "}
           */}
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

        {/* <Form.Group className="mb-3">
          <Form.Label>Select Date Range:</Form.Label>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" {...register("start_date")} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" {...register("end_date")} />
            </Form.Group>
          </Row>
        </Form.Group> */}
      </Form>
    </div>
  );
};

export default DoctorPatientVisitReport;
