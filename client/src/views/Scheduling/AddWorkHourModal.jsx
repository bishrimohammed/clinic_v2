import { yupResolver } from "@hookform/resolvers/yup";
import { add, format, getHours, getMinutes } from "date-fns";
import React, { useEffect } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useAddWorkHour } from "./hooks/useAddWorkHour";
import { toast } from "react-toastify";
const workHourSchema = yup.object().shape({
  start_time: yup.string().required(),
  end_time: yup
    .string()
    .test(
      "is-greater",
      "End time must be greater than start time",
      (value, context) => {
        return context.parent.start_time < value;
      }
    )
    .required("End Time is Required"),
  day_of_week: yup.string().required(),

  doctorId: yup.number().required(),
});
const AddWorkHourModal = ({ show, handleClose, start }) => {
  //   console.log(format(start, "EEEE"));
  const [errorState, setErrorState] = React.useState({
    isShow: false,
    error: "",
  });
  const { mutateAsync, isPending } = useAddWorkHour();
  const { state } = useLocation();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const defaultHour = getHours(new Date(start));
  const defaultMinute = getMinutes(new Date(start));

  // Format the hour and minute components as strings with leading zeros if necessary
  const formattedHour = String(defaultHour).padStart(2, "0");
  const formattedMinute = String(defaultMinute).padStart(2, "0");
  const start_time = `${formattedHour}:${formattedMinute}`;
  useEffect(() => {
    if (errorState.isShow) {
      // Display error toast
      // toast.error(errorState.error);

      // Reset error state after 5 seconds
      const timeoutId = setTimeout(() => {
        setErrorState({ isShow: false, error: "" });
      }, 5000);

      // Clean up the timeout when the effect is re-run or unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [errorState]);

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      start_time: start_time,
      //   end_time: format(add(start_time, { hours: 1 }), "hh:mm"),
      day_of_week: format(start, "EEEE"),
      doctorId: state.id,
    },

    resolver: yupResolver(workHourSchema),
  });
  // console.log(new Date(start));
  const submitHandler = (data) => {
    // console.log(data);
    mutateAsync(data)
      .then((res) => {
        if (res.status === 201) {
          handleClose(false);
        }
      })
      .catch((err) => {
        // console.log(err);
        const errors = err.response.data.message;
        console.log(err);
        if (Array.isArray(errors)) {
          errors.map((err) => {
            const msg = err.message;
            // console.log(err.path);
            // console.log(err.message);
            // setError(err.path, msg.join(""));
            toast.error(err.message);
            setError(err.path, {
              type: "server",
              message: err.message,
              shouldFocus: true,
            });
          });
        } else {
          setErrorState({ isShow: true, error: errors });
        }
      });
  };
  // console.log(errors);
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Work Hour</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorState.isShow && (
          // <div className="alert alert-danger" role="alert">
          //   {errorState.error}
          // </div>
          <Alert variant="danger" dismissible>
            {" "}
            {errorState.error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              {...register("start_time")}
              isInvalid={errors.start_time}
            />

            <Form.Control.Feedback type="invalid">
              {errors.start_time?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              {...register("end_time")}
              isInvalid={errors.end_time}
            />
            <Form.Control.Feedback type="invalid">
              {errors.end_time?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Day of Week</Form.Label>
            <Form.Select
              disabled={true}
              type="text"
              {...register("day_of_week")}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.day_of_week?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer className="pb-0">
            <Button variant="secondary">Close</Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending && <Spinner animation="border" size="sm" />}
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkHourModal;
