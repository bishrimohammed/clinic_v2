import React, { useMemo } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { chiefComplaintOptions } from "../utils/chiefComplaintOptions";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useAddChiefComplaint } from "../hooks/consultationHooks/useAddChiefComplaint";
import { useGetChiefComplaint } from "../hooks/consultationHooks/useGetChiefComplaint";
import { toast } from "react-toastify";
const ChiefComplaintSchema = yup.object().shape({
  chief_complaint: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      })
    )
    .min(1, "At least one Chief Complaint is required")
    .required("Chief Complaint is required"),
  HPI: yup
    .string()
    .transform((value) => value.trim())
    .required("History of Present Illness is required"),
  note: yup.string().transform((value) => value.trim()),
});
const ChiefComplaint = React.forwardRef((props, ref) => {
  const { state } = useLocation();
  // console.log(state);
  const { data, isPending: fetchingCheifComplaint } = useGetChiefComplaint(
    state.medicalRecord_id
  );
  // console.log(data);
  const chiefs = useMemo(
    () =>
      data?.chief_complaint.split(", ").map((chief) => {
        return { label: chief, value: chief };
      }),
    [data]
  );
  // data?.chief_complaint.split(", ").map((chief) => {
  //   return { label: chief, value: chief };
  // }) || [];
  // console.log(chiefs);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    reset,
  } = useForm({
    resolver: yupResolver(ChiefComplaintSchema),
    defaultValues: {
      chief_complaint: chiefs,
      // HPI: "",
      // note: "",
    },
  });
  const { mutateAsync, isPending } = useAddChiefComplaint();
  const submitHandler = (Data) => {
    // console.log(Data);
    const chiefComplaint = Data.chief_complaint
      .map((item) => item.value)
      .join(", ");
    // console.log(chiefComplaint);
    const formData = {
      chief_complaint: chiefComplaint,
      HPI: Data.HPI,
      note: Data.note,
    };
    // console.log(formData);
    // return;
    mutateAsync({ formData, medicalRecordId: state.medicalRecord_id }).then(
      (res) => {
        // console.log(res);
        if (res.status === 200 && data) {
          toast.success("Chief Complaint added successfully");
        } else {
          toast.success("Chief Complaint updated successfully");
        }
      }
    );
    // join chiefComplaint array into a string ,
    // const chiefComplaint = data.chief_complaint.join(", ");
  };

  React.useImperativeHandle(ref, () => ({
    getSaveForLaterData: () => getValues(),
    resetData: () => reset(),
  }));
  // console.log(errors);
  // const handleCreateOption = (inputValue) => {
  //   return {
  //     value: inputValue,
  //     label: inputValue,
  //   };
  // };
  if (fetchingCheifComplaint) return <Spinner animation="border" />;
  return (
    <div className="mt-4">
      <Form className="px-3" onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Chief Complaint</Form.Label>

              <Controller
                control={control}
                name="chief_complaint"
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    placeholder="Type to select or create options..."
                    // formatCreateLabel={handleCreateOption}
                    options={chiefComplaintOptions}
                    defaultValue={chiefs}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: errors.chief_complaint
                          ? "red"
                          : state.isFocused
                          ? "white"
                          : "grey",
                      }),
                    }}
                  />
                )}
              />

              {errors.chief_complaint && (
                <span className="small text-danger">
                  {errors.chief_complaint.message}
                </span>
              )}
            </Form.Group>
          </Col>
          {/* <Col md={6} sm={12}></Col> */}
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>History of Present Illness</Form.Label>
              <Form.Control
                {...register("HPI")}
                defaultValue={data?.hpi}
                as="textarea"
                isInvalid={errors.HPI}
                style={{ minHeight: "100px" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.HPI?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            {/* <Form.Group className="mb-3">
              <Form.Label>Additional notes</Form.Label>
              <Form.Control
                defaultValue={data?.notes}
                {...register("note")}
                type="text"
              />
            </Form.Group> */}
          </Col>
        </Row>
        <div className=" d-flex justify-content-end gap-2 mt-2">
          {/* <Button
            variant="danger"
            // disabled={
            //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
            //   isPending
            // }
            onClick={() => setShowCancelTriageModal(true)}
          >
            Cancel
          </Button> */}
          {/* <Button
            // disabled={isPending}
            // onClick={saveForLaterHandler}
            variant="warning"
          >
            Save for Later
          </Button> */}
          <Button
            // form="traigeForm"
            // formTarget="traigeForm"
            type="submit"
            variant="success"
            // disabled={isPending}
          >
            {/* {isPending && <Spinner size="sm" animation="border" />} */}
            {data ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
});

export default ChiefComplaint;
