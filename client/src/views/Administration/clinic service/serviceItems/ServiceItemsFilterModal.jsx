import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";
// import { useGetEmployeePositions } from "./hooks/useGetEmployeePositions";
import { useGetServiceGroups } from "../hooks/useGetServiceGroups";
const FilterSchema = yup.object().shape({
  status: yup.string(),
  groups: yup.array().of(yup.string()),
  // gender: yup.string(),
});

const ServiceItemsFilterModal = ({
  show,
  handleClose,
  setFilter,
  serviceId,
}) => {
  const { data: groups } = useGetServiceGroups(serviceId);
  // console.log(positions);
  console.log("ServiceItemsFilterModal");
  console.log(groups);
  const status = [
    {
      value: "",
      label: "All",
    },

    {
      value: "true",
      label: "Active",
    },
    {
      value: "false",
      label: "Inactive",
    },
  ];
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: "",
      groups: [],
      // gender: "",
    },
    resolver: yupResolver(FilterSchema),
  });
  // const positions = ["Doctor", "Nurse", "Receptionist", "Admin", "Cashier"];
  const submitHamder = (data) => {
    console.log(data);
    const groups = data.groups.filter((item) => {
      if (item !== "false" && item !== "true") {
        return parseInt(item);
      }
    });
    console.log(groups);
    // return;
    setFilter({
      status: data.status,
      groups: groups,
      // gender: data.gender,
    });
    handleClose(false);
  };
  return (
    <Modal size="md" show={show} onHide={() => handleClose(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Employees</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHamder)}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>

            <Form.Control as="select" {...register("status")}>
              {status.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Groups</Form.Label>
            {groups?.map((item, index) => (
              <Form.Check
                key={item.id}
                type="checkbox"
                id={item.id}
                {...register(`groups.[${index}]`)}
                label={item.name}
                value={item.id}
                // defaultValue=""
              />
            ))}
          </Form.Group>

          <div className="d-flex justify-content-end gap-3 ">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button
              // variant="danger"
              type="submit"
              // disabled={deleteMutation.isPending || deactiveMutation.isPending}
              // onClick={clickHandler}
            >
              {/* {(deleteMutation.isPending || deactiveMutation.isPending) && (
            <Spinner animation="border" size="sm" />
          )} */}
              {/* {action === "delete" ? "Delete" : "Deactivate"} */}
              Ok
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceItemsFilterModal;
