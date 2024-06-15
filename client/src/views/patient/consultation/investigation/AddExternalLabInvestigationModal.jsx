import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
// import { chiefComplaintOptions } from "../utils/chiefComplaintOptions";
import * as yup from "yup";
import { medicalLabTestsOptions } from "../utils/externalLabTestOptions";
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
const AddExternalLabInvestigationModal = ({ show, handleClose }) => {
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
      //   chief_complaint: chiefs,
      // HPI: "",
      // note: "",
    },
  });
  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add External Lab Investigation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="px-3" onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Lab Tests</Form.Label>

                <Controller
                  control={control}
                  name="chief_complaint"
                  render={({ field }) => (
                    <CreatableSelect
                      {...field}
                      isMulti
                      placeholder="Type to select or create options..."
                      // formatCreateLabel={handleCreateOption}
                      options={medicalLabTestsOptions}
                      //   defaultValue={chiefs}
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
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  //   defaultValue={data?.notes}
                  {...register("note")}
                  //   type="text"
                  as="textarea"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className=" d-flex justify-content-end gap-2">
            <Button
              // form="traigeForm"
              // formTarget="traigeForm"
              type="submit"
              variant="success"
              // disabled={isPending}
            >
              {/* {isPending && <Spinner size="sm" animation="border" />} */}
              {/* {data ? "Update" : "Save"} */}
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExternalLabInvestigationModal;
