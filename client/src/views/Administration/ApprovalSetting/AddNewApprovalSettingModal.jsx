import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo } from "react";
import { Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetActiveUsers } from "../../user/hooks/useGetActiveUsers";
import { useGetPermissions } from "../Role/hooks/useGetPermissions";
import { useAddApprovalSetting } from "./hooks/useAddApprovalSetting";
import { toast } from "react-toastify";

const approvalsettingSchema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Approval Name is required"),
  permissionId: yup
    .number()
    .transform((value) => {
      return isNaN(value) ? undefined : value;
    })
    .required("Approval Permission is required"),
  approvalLevel: yup
    .number()
    .transform((value) => {
      return isNaN(value) ? undefined : value;
    })
    .required("Approval Level is required"),
  action: yup.string().required("Permission  Action is required"),
  approvalUser: yup.array().of(
    yup
      .object()
      .shape({
        userId: yup
          .number()
          .transform((value) => {
            return isNaN(value) ? undefined : value;
          })
          .required("Approval Permission is required"),
        level: yup
          .number()
          .transform((value) => {
            return isNaN(value) ? undefined : value;
          })
          .required("Approval User Level is required"),
      })
      .required("Approval Usre is required")
  ),
});
const AddNewApprovalSettingModal = ({ show, handleClose }) => {
  const { data: users } = useGetActiveUsers();
  const { data: permissions } = useGetPermissions();
  const { mutateAsync, isPending } = useAddApprovalSetting();
  //   console.log(users);
  //   console.log(permissions);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(approvalsettingSchema),
  });
  const approvalLevel = watch("approvalLevel");
  const approvalUserWatcher = watch("approvalUser");
  //   console.log(numberToArray(approvalLevel));
  useEffect(() => {
    // const selectedUser = getValues("approvalUser");
    setValue(
      "approvalUser",
      Array.from({ length: parseInt(getValues("approvalLevel")) }, (_, i) => {
        return {
          userId: "",
          level: parseInt(i + 1),
        };
      })
    );
    //   reset({
    //     approvalUser: undefined,
    //   });
  }, [approvalLevel]);
  const submitHandler = (data) => {
    console.log(data);

    mutateAsync(data)
      .then((res) => {
        if (res.status === 201) {
          handleClose(false);
        }
      })
      .catch((err) => {
        console.log(err);
        const error = err.response.data.message;
        console.log(error);
        setError("action", {
          type: "error",
          message: error,
        });
        // console.log(err.response.data.message);
        // toast.error(error);
      });
  };
  //   console.log(approvalUserWatcher);
  const filteredUser = users?.filter(
    (user) =>
      !getValues("approvalUser")?.some(
        (selectedUser) => parseInt(selectedUser.userId) === user.id
      )
  );
  console.log(errors);
  const UserSelectFields = useMemo(
    () =>
      Array.from({ length: parseInt(approvalLevel) }, (_, i) => (
        <Col md={4} sm={12} key={i}>
          <Form.Group className="mb-3">
            <Form.Label>Level {i + 1} Approval</Form.Label>
            <Form.Select
              type="text"
              {...register(`approvalUser[${i}].userId`)}
              isInvalid={errors[`approvalUser[${i}].userId`]}
            >
              <option value="">Please Select</option>
              {users?.map((user, index) => (
                <option
                  key={user.id}
                  value={user.id}
                  disabled={getValues("approvalUser")?.some(
                    (u) => parseInt(u.userId) === user.id
                  )}
                >
                  {user.employee.firstName} {user.employee.middleName}
                </option>
              ))}
            </Form.Select>
            <input
              type="hidden"
              value={i + 1}
              {...register(`approvalUser[${i}].level`)}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            {errors[`approvalUser[${i}].userId`]?.message}
          </Form.Control.Feedback>
        </Col>
      )),
    [approvalLevel, approvalUserWatcher]
  );
  // approvalLevel !== undefined && approvalLevel !== ""
  // Array.from({ length: parseInt(approvalLevel) }, (_, i) => (
  //   <Col md={4} sm={12} key={i}>
  //     <Form.Group className="mb-3">
  //       <Form.Label>Level {i + 1} Approval</Form.Label>
  //       <Form.Select
  //         type="text"
  //         {...register(`approvalUser[${i}].userId`)}
  //         isInvalid={errors[`approvalUser[${i}].userId`]}
  //       >
  //         <option value="">Please Select</option>
  //         {filteredUser?.map((user, index) => (
  //           <option
  //             key={user.id}
  //             value={user.id}
  //             disabled={getValues("approvalUser")?.some(
  //               (u) => parseInt(u.userId) == user.id
  //             )}
  //           >
  //             {user.employee.firstName} {user.employee.middleName}
  //           </option>
  //         ))}
  //       </Form.Select>
  //       <input
  //         type="hidden"
  //         value={i + 1}
  //         {...register(`approvalUser[${i}].level`)}
  //       />
  //     </Form.Group>
  //     <Form.Control.Feedback type="invalid">
  //       {errors[`approvalUser[${i}].userId`]?.message}
  //     </Form.Control.Feedback>
  //   </Col>
  // ))

  //   console.log(filteredUser);
  //   console.log(approvalUserWatcher);
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Approval Setting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)} id="approvalSetting">
          <Row>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Approval Name</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Approval Name"
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Permission</Form.Label>
                <Form.Select
                  type="text"
                  {...register("permissionId")}
                  placeholder="Approval Name"
                  isInvalid={errors.permissionId}
                >
                  <option value="">Please Select</option>
                  {permissions?.map((permission, index) => (
                    <option
                      key={permission.id + permission.name}
                      value={permission.id}
                    >
                      {permission.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.permissionId?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Permission Action</Form.Label>
                <Form.Select
                  type="text"
                  {...register("action")}
                  isInvalid={errors.action}
                >
                  <option value="">Please Select</option>
                  <option value="read">Read</option>
                  <option value="create">Create</option>
                  <option value="delete">Delete</option>
                  <option value="update">Update</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.action?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Approval Level</Form.Label>
                <Form.Select
                  type="text"
                  {...register("approvalLevel")}
                  isInvalid={errors.approvalLevel}
                >
                  <option value="">Please Select</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                  <option value={4}>Level 4</option>
                  <option value={5}>Level 5</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.approvalLevel?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* {numberToArray(approvalLevel)?.map((field, index) => (
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Level {index + 1} Approval</Form.Label>
                  <Form.Select
                    type="text"
                    {...register(`approvalUser[${index}].userId`)}
                    isInvalid={errors[`approvalUser[${index}].userId`]}
                  >
                    <option value="">Please Select</option>
                    {filteredUser?.map((user, index) => (
                      <option key={user.id} value={user.id}>
                        {user.employee.firstName} {user.employee.middleName}
                      </option>
                    ))}
                  </Form.Select>{" "}
                  <input
                    type="hidden"
                    value={index + 1}
                    {...register(`approvalUser[${index}].level`)}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  {errors[`approvalUser[${index}].userId`]?.message}
                </Form.Control.Feedback>
              </Col>
            ))} */}
            {UserSelectFields}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="submit"
          disabled={isPending}
          form="approvalSetting"
          className="btn btn-primary"
          //   onClick={handleClose}
        >
          {isPending && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewApprovalSettingModal;
