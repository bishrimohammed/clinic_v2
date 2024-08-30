import { yupResolver } from "@hookform/resolvers/yup";
import { endOfWeek, getISOWeek, differenceInDays, startOfWeek } from "date-fns";
import React, { useEffect } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAddWeekDutyProgram } from "../hooks/useAddWeekDutyProgram";
const dutyProgramSchema = yup.object().shape({
  start_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })

    .nullable()
    .required("Start date is required"),
  end_date: yup
    .date()
    .test(
      "is-greater",
      "End Date must be greater than start date",
      (value, context) => {
        return context.parent.start_date < value;
      }
    )
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })

    .nullable()
    .required("End Time is Required"),
  week: yup.string().required(),

  // doctorId: yup.number().required(),
});
const AddDutyProgramModal = ({ show, handleClose }) => {
  const { mutateAsync, isPending } = useAddWeekDutyProgram();
  const [errorState, setErrorState] = React.useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      start_date: new Date(startOfWeek(new Date(), { weekStartsOn: 2 }))
        .toISOString()
        .substring(0, 10),
      end_date: new Date(endOfWeek(new Date(), { weekStartsOn: 1 }))
        .toISOString()
        .substring(0, 10),
      week: "Week " + getISOWeek(new Date()),
    },
    resolver: yupResolver(dutyProgramSchema),
  });
  const startTimeWatcher = watch("start_date");
  const endTimeWatcher = watch("end_date");
  //   .toISOString().substring(0, 10)
  //   console.log(errors);
  useEffect(() => {
    if (errorState) {
      const timeOut = setTimeout(() => {
        setErrorState("");
      }, 2000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [errorState]);

  const submitHandler = (data) => {
    // console.log(data);
    const Data = {
      weekStartDate: data.start_date,
      weekEndDate: data.end_date,
      week: data.week,
    };
    mutateAsync(Data)
      .then((res) => {
        if (res.status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        // console.log(err);
        setErrorState(err?.response?.data?.message);
      });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Duty Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState && (
          <Alert variant="danger" dismissible>
            {errorState}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  {...register("start_date", {
                    onChange: (e) => {
                      //   console.log(e.target.value);
                      const day = new Date(e.target.value).getDay();
                      //   console.log(day);
                      if (day !== 1) {
                        setError("start_date", {
                          type: "manual",
                          message: "Start Date must be Monday",
                        });
                      }
                      //   console.log(
                      //     differenceInDays(endTimeWatcher, e.target.value)
                      //   );
                      if (
                        endTimeWatcher &&
                        differenceInDays(endTimeWatcher, e.target.value) === 6
                      ) {
                        clearErrors("end_date");
                      }

                      setValue("week", `Week ${getISOWeek(e.target.value)}`);
                      if (errors.start_date && day === 1) {
                        // console.log("sfsfs");
                        clearErrors("start_date");
                      }
                    },
                  })}
                  isInvalid={errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  {...register("end_date", {
                    onChange: (e) => {
                      //   console.log(e.target.value);
                      const day = new Date(e.target.value).getDay();
                      //   console.log(
                      //     differenceInDays(e.target.value, startTimeWatcher)
                      //   );
                      if (day !== 6) {
                        setError("end_date", {
                          type: "manual",
                          message: "End Date must be Sunday",
                        });
                      }
                      if (
                        differenceInDays(e.target.value, startTimeWatcher) > 6
                      ) {
                        setError("end_date", {
                          type: "manual",
                          message:
                            "End Date and start date must be in the same week",
                        });
                      }

                      //   console.log(day);
                      //   clearErrors("end_date");
                      if (errors.end_date && day == 0) {
                        // console.log("sfsfs");
                        clearErrors("end_date");
                      }
                    },
                  })}
                  isInvalid={errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Week Number</Form.Label>
                <Form.Control
                  type="text"
                  name="week"
                  disabled={true}
                  {...register("week")}
                  isInvalid={errors.week}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.week?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="pb-0 pe-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDutyProgramModal;
