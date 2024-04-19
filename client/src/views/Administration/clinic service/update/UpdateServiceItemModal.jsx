import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import { useGetServiceGroups } from "../hooks/useGetServiceGroups";
import { useGetServiceItems } from "../hooks/useGetServiceItems";
import { useUpdateServiceItem } from "../hooks/service item/useUpdateServiceItem";
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
      console.log(islab);
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
const UpdateServiceItemModal = ({ show, handleClose, serviceItem }) => {
  const { state } = useLocation();
  // console.log(serviceItem);
  const { data: groups } = useGetServiceGroups(state.id);
  const { data, isFetching } = useGetServiceItems(state.id, {
    status: "",
    groups: [],
  });
  const { mutateAsync } = useUpdateServiceItem();
  const {
    register,
    // formState = { errors },
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      service_name: serviceItem.service_name,
      serviceGroup: serviceItem.serviceCategory.id,
      price: serviceItem.price,
      unit: serviceItem.unit,
      // referenceRange: serviceItem.referenceRange,
      // allowgroup: serviceItem.allowgroup,
      // islab: serviceItem.islab,
      lab: {
        // childService: serviceItem?.labTestProfile?.underPanels?.map(
        //   (l) => l.underpanel_id
        // ),
        isPanel: serviceItem?.labTestProfile?.isPanel,
        isFixed: serviceItem?.labTestProfile?.isFixed,
        underPanel: !serviceItem?.labTestProfile?.isPanel,
      },
      islab: state.is_laboratory,
      allowgroup: state.is_laboratory || state.is_imaging,
    },
    resolver: yupResolver(serviceItemSchema),
  });
  console.log(state);
  const allowGroupingWatcher = watch("allowgroup");
  const isPanelWathcer = watch("lab.isPanel");
  const underPanelWatcher = watch("lab.underPanel");
  const isFixedWatcher = watch("lab.isFixed");
  // console.log(state);
  // console.log(groups);
  const submitHandler = (data) => {
    console.log(data);
    // return;
    const Data = {
      serviceItemData: data,
      serviceItemId: serviceItem.id,
    };
    mutateAsync(Data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        handleClose(false);
      }
    });
  };
  // const ss = serviceItem?.labTestProfile?.underPanels?.map(
  //   (l) => l.underpanel_id
  // );
  // const dd = data.filter((s) => {
  //   if (ss.includes(s.labTestProfile.id)) return s.labTestProfile.id;
  // });
  // console.log(ss);
  // console.log(dd);
  // const isServiceItemSelected = (serviceId) => {};
  // console.log(serviceItem);
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Service Item</Modal.Title>
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
                  disabled={underPanelWatcher || isFixedWatcher}
                  step="any"
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

            {state.is_laboratory && (
              <>
                <Col md={4} sm={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>is Fixed</Form.Label>
                    <Form.Check
                      {...register("lab.isFixed")}
                      type="checkbox"
                      disabled={underPanelWatcher}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} sm={12} className="mb-3">
                  <Form.Group>
                    <Form.Label>Under Panel</Form.Label>
                    <Form.Check
                      {...register("lab.underPanel", {
                        onChange: () => setValue("lab.isPanel", false),
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
                      <Form.Select
                        multiple
                        {...register("lab.childService")}
                        // defaultValue={serviceItem?.labTestProfile?.underPanels?.map(
                        //   (s) => s.underpanel_id
                        // )}
                      >
                        {/* <option value="">Please Select</option> */}
                        {data
                          ?.filter((s) => s.id !== serviceItem.id)
                          .map((item) => (
                            <option
                              key={item.id}
                              value={item.id}
                              selected={
                                serviceItem?.labTestProfile?.underPanels?.some(
                                  (x) =>
                                    x.underpanel_id === item.labTestProfile.id
                                )
                                  ? true
                                  : false
                              }
                            >
                              {item.service_name}
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
          {/* <div className="d-flex justify-content-end">
            {" "}
            <Button type="submit">Update</Button>
          </div> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateServiceItemModal;
