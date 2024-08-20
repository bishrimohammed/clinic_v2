import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetFinancialReport } from "./hooks/useGetFinancialReport";
import WeeklyReport from "./financial/WeeklyReport";
import MonthlyReport from "./financial/MonthlyReport";
import YearlyReport from "./financial/YearlyReport";
import CustomRangeReport from "./financial/CustomRangeReport";
const financialReportSchema = yup.object().shape({
  report_type: yup.string().required("Report type is required"),
  start_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .when("report_type", ([report_type], schema) => {
      if (report_type === "custom") {
        return schema.required("Start date is required");
      }
      return schema.nullable();
    }),
  end_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .when("report_type", ([report_type], schema) => {
      if (report_type === "custom") {
        return schema
          .required("End date is required")
          .min(
            yup.ref("start_date"),
            "End date must be greater than or equal to start date"
          );
      }
      return schema.nullable();
    }),
});
const FinancialReport = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(financialReportSchema),
  });
  const [formData, setFormData] = useState({
    report_type: "",
    start_date: null,
    end_date: null,
  });
  const [triggerFetch, setTriggerFetch] = useState(false);

  const submitHandler = (data) => {
    setFormData(data);
    setTriggerFetch(true); // Trigger the fetch
  };
  const successRef = useRef(0);
  const { data, isLoading, error, isSuccess, isPending, isFetching } =
    useGetFinancialReport(formData, triggerFetch, setTriggerFetch);
  //   if (isSuccess) {
  // //   successRef.current.value ===0 ?setTriggerFetch(false) :successRef.current.value = 0
  //   setTriggerFetch(false)
  //   }
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
                <option value="custom">Custom</option>

                {/* <option value="quarterly">Quarterly</option> */}
              </Form.Select>
            </Form.Group>
          </Col>
          {watch("report_type") === "custom" && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Date Range:</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Group>
                    <Form.Control
                      type="date"
                      {...register("start_date")}
                      isInvalid={errors.start_date}
                      max={new Date().toISOString().substring(0, 10)}
                    />
                    <Form.Text>Start Date</Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.start_date?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="date"
                      {...register("end_date")}
                      isInvalid={errors.end_date}
                      max={new Date().toISOString().substring(0, 10)}
                    />
                    <Form.Text>End Date</Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.end_date?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Form.Group>
            </Col>
          )}
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
      {isFetching && <Spinner />}
      {formData.report_type === "weekly" && (
        <WeeklyReport weeklyPayments={data} />
      )}
      {formData.report_type === "monthly" && (
        <MonthlyReport monthlyPayments={data} />
      )}
      {formData.report_type === "yearly" && (
        <YearlyReport yearlyPayments={data} />
      )}
      {formData.report_type === "custom" && (
        <CustomRangeReport customRangePayments={data} />
      )}
    </div>
  );
};

export default FinancialReport;
