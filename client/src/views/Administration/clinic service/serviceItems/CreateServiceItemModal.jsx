import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { useGetServiceGroups } from "../hooks/useGetServiceGroups";
import { useLocation } from "react-router-dom";
import { useGetServiceItems } from "../hooks/useGetServiceItems";
import { useAddServiceItem } from "../hooks/service item/useAddServiceItem";
const serviceItemSchema = yup.object().shape({
  service_name: yup.string().required("Service Name is required"),
  allowgroup: yup.boolean(),
  islab: yup.boolean(),
  isFixed: yup.boolean(),
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

const CreateServiceItemModal = ({ show, handleClose, state }) => {
  //   const { state } = useLocation();
  //   console.log("kjbhvjchfxgdszxcgvhbbhgfcd");
  const { mutateAsync, isPending } = useAddServiceItem();
  const {
    register,
    // formState = { errors },
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      islab: state.is_laboratory,
      allowgroup: state.is_laboratory,
    },
    resolver: yupResolver(serviceItemSchema),
  });

  const { data: groups } = useGetServiceGroups(state.id);
  const { data, isFetching } = useGetServiceItems(state.id, {
    status: "",
    groups: [],
  });
  // console.log(data);
  const allowGroupingWatcher = watch("allowgroup");
  const isPanelWathcer = watch("lab.isPanel");
  const underPanelWatcher = watch("lab.underPanel");
  const isFixedWatcher = watch("lab.isFixed");
  // console.log(state);
  // console.log(groups);
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    mutateAsync(data).then((res) => {
      // console.log(res);
      if (res.status === 201) {
        handleClose(false);
      }
    });
  };
  console.log(errors);
  console.log(data);
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Service Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  {...register("service_name")}
                  placeholder="service name"
                  isInvalid={errors.service_name}
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Allow Group</Form.Label>
                <Form.Check
                  {...register("allowgroup")}
                  type="checkbox"
                  disabled={state.is_laboratory}
                  isInvalid={errors.allowgroup}
                />
              </Form.Group>
            </Col>
            {allowGroupingWatcher && allowGroupingWatcher === true ? (
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Service Group</Form.Label>
                  <Form.Select
                    {...register("serviceGroup")}
                    placeholder="service group"
                    isInvalid={errors.serviceGroup}
                  >
                    <option value="">Please Select</option>
                    {groups?.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            ) : null}
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Price </Form.Label>
                <Form.Control
                  {...register("price")}
                  placeholder="price"
                  type="number"
                  disabled={underPanelWatcher}
                  step="0.01"
                  min={0}
                  isInvalid={errors.price}
                >
                  {/* <option value="">Please Select</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))} */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-3">
              <Form.Group>
                <Form.Label>is Fixed</Form.Label>
                <Form.Check
                  {...register("isFixed")}
                  type="checkbox"
                  disabled={underPanelWatcher}
                />
              </Form.Group>
            </Col>
            {state.is_laboratory && (
              <>
                {/* <Col md={4} sm={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>is Fixed</Form.Label>
                    <Form.Check
                      {...register("lab.isFixed")}
                      type="checkbox"
                      disabled={underPanelWatcher}
                    />
                  </Form.Group>
                </Col> */}
                <Col md={4} sm={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Under Panel</Form.Label>
                    <Form.Check
                      {...register("lab.underPanel", {
                        onChange: () => {
                          isPanelWathcer && setValue("lab.isPanel", false);
                          //   isFixedWatcher && setValue("lab.isFixed", false);
                        },
                      })}
                      type="checkbox"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} sm={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Is Panel</Form.Label>
                    <Form.Check
                      {...register("lab.isPanel")}
                      type="checkbox"
                      disabled={underPanelWatcher}
                    />
                  </Form.Group>
                </Col>
                {isPanelWathcer && (
                  <Col md={4} sm={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Child Service</Form.Label>
                      <Form.Select multiple {...register("lab.childService")}>
                        <option value="">Please Select</option>
                        {/* {data
                          ?.filter((t) => !t.labTestProfile.isPanel)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.service_name}
                            </option>
                          ))} */}
                        {data
                          ?.filter((t) => !t.labTestProfile.isPanel)
                          ?.map((item, index, array) => (
                            <option
                              className="mb-1"
                              key={item.id}
                              value={item.id}
                            >
                              {item.service_name}
                              {index !== array.length - 1 ? ", " : ""}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </>
            )}

            <Col md={4} sm={12} className="mb-3">
              <Form.Group>
                <Form.Label>Unit</Form.Label>
                <Form.Control {...register("unit")} />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-3">
              <Form.Group>
                <Form.Label>Reference Range</Form.Label>
                <Form.Control {...register("referenceRange")} />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            {" "}
            <Button disabled={isPending} type="submit">
              {isPending && <Spinner size="sm" />}
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateServiceItemModal;
