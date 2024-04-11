import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const FilterSchema = yup.object().shape({
  status: yup.string(),
});

const FilterModal = ({ show, handleClose, setFilter }) => {
  // const { data: positions } = useGetEmployeePositions();
  // console.log(positions);
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
      // position: [],
      // gender: "",
    },
    resolver: yupResolver(FilterSchema),
  });
  // const positions = ["Doctor", "Nurse", "Receptionist", "Admin", "Cashier"];
  const submitHamder = (data) => {
    console.log(data);
    // const position = data.position.filter((item) => {
    //   if (item !== "false" && item !== "true") {
    //     return item;
    //   }
    // });
    // console.log(position);
    setFilter({
      status: data.status,
      // position: position,
      // gender: data.gender,
    });
    handleClose(false);
  };
  return (
    <Modal size="md" show={show} onHide={() => handleClose(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Filter Roles</Modal.Title>
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

export default FilterModal;
