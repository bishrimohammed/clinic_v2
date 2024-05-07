import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateClinicService } from "../hooks/useUpdateClinicService";

const serviceItemSchema = yup.object().shape({
  id: yup.number(),
  service_name: yup.string().required("Service Name is required"),
  allowgroup: yup.boolean(),
  islab: yup.boolean(),
  serviceGroup: yup.string().when("allowgroup", ([allowgroup], schema) => {
    if (allowgroup) {
      return schema.required("Service Group is required");
    }
    return schema.nullable();
  }),
  // .required("Service Group is required"),
  unit: yup.string(),
  referenceRange: yup.string(),
  lab: yup
    .object()
    .shape({
      isFixed: yup.boolean(),
      underPanel: yup.boolean(),
      isPanel: yup.boolean(),
      childService: yup.array().of(yup.number()),
    })
    .when("islab", ([islab], schema) => {
      // console.log(islab);
      if (islab) {
        return schema.required("rew is required");
      }
      return schema.nullable();
    }),
  price: yup
    .number()
    .transform((value) => {
      if (isNaN(value)) {
        return 0;
      }
      return parseInt(value);
    })
    .min(0)
    // .positive()
    // .round(1)
    // .typeError("Invalid price")
    .when("lab.underPanel", ([underPanel], schema) => {
      console.log(underPanel);
      if (!underPanel) {
        return schema.required("Price is required");
      }
      return schema.nullable();
    }),
});
const UpdateServiceModal = ({ show, handleClose, data }) => {
  console.log(data);
  const updateMutation = useUpdateClinicService();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      service_name: data.service_name,
      status: data.status,
      // price: data.price,
    },
    resolver: yupResolver(serviceItemSchema),
  });
  const submitHnadler = (Data) => {
    console.log(Data);

    updateMutation
      .mutateAsync({ Data, serviceId: data.id })
      .then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          handleClose(false);
        }
      });
  };

  return (
    // react bootstrap modal
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHnadler)}>
          <Form.Group controlId="service_name">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              name="service_name"
              {...register("service_name")}
              placeholder="Enter Service Name"
              isInvalid={errors.service_name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.service_name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Select
              type="text"
              name="state"
              {...register("status")}
              placeholder="Enter State"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Form.Select>
          </Form.Group>
          {/* <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Enter Price"
              />
            </Form.Group> */}
          <div className="mt-3 d-flex justify-content-end gap-3 py-1">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateServiceModal;
