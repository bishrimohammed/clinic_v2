import React from "react";

import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetRoles } from "../hooks/useGetRoles";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPermissions } from "../Administration/Role/hooks/useGetPermissions";
import { generatePassword } from "./utils/generatePassword";
import { IoMdArrowRoundBack } from "react-icons/io";
const schema = yup.object().shape({
  employeeId: yup.string().required("Employee is required"),
  // email: yup.string().email("invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string(),
  role: yup
    .number()
    .transform((value) => parseInt(value))
    .required("role is required"),
  wantToUpdatePassword: yup.boolean().transform((value) => Boolean(value)),
  permissions: yup.array().of(
    yup.object().shape({
      create: yup.boolean().transform((value) => Boolean(value)),
      read: yup.boolean().transform((value) => Boolean(value)),
      update: yup.boolean().transform((value) => Boolean(value)),
      delete: yup.boolean().transform((value) => Boolean(value)),
      admin: yup.boolean().transform((value) => Boolean(value)),
      permissionId: yup.string().required("permissionId is required"),
    })
  ),
});
const UpdateUser = () => {
  const { state: user } = useLocation();
  const { data: roles, isPending: ispending } = useGetRoles();
  const { mutateAsync, isPending } = useUpdateUser();
  const { state } = useLocation();
  const { data: permissions } = useGetPermissions();
  // console.log(user);
  // return;
  // console.log(roles);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      employeeId:
        user.employee.firstName +
        " " +
        user.employee.middleName +
        " " +
        user.employee.lastName,
      role: parseInt(user.role_id),
      username: user.username,
      wantToUpdatePassword: false,
      // email: user.email,
      // password: "",
      //   confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const watchPermissions = useWatch({ control, name: "permissions" });
  // const watchUpdatePassword = useWatch({
  //   control,
  //   name: "wantToUpdatePassword",
  // });

  const handleAdminCheck = (index, permissionId) => {
    let isAdmin = watchPermissions && watchPermissions[index].admin;
    // isAdmin = isAdmin === undefined ? true : isAdmin;
    // console.log(isAdmin);
    let p = {};
    if (isAdmin) {
      // console.log("def");
      p = {
        create: !isAdmin,
        read: !isAdmin,
        delete: !isAdmin,
        update: !isAdmin,
        admin: !isAdmin,
        permissionId: permissionId,
      };
    } else {
      p = {
        create: true,
        read: true,
        delete: true,
        update: true,
        admin: true,
        permissionId: permissionId,
      };
    }

    // console.log(p);
    setValue(`permissions.${index}`, p);
    // console.log(index);
  };

  const handleChangeRead = (index) => {
    let isRead = watchPermissions && watchPermissions[index].read;
    // isRead = isRead !== undefined ? !isRead : true;
    const some =
      watchPermissions &&
      (watchPermissions[index].read ||
        watchPermissions[index].create ||
        watchPermissions[index].delete ||
        watchPermissions[index].update);
    let read;
    if (isRead) {
      read = false;
    }
    if (some) {
      read = true;
    } else {
      read = !isRead;
    }
    setValue(`permissions.${index}.read`, read);
    // console.log(" is read  " + isRead);
    // console.log(" read  " + read);
  };
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    const selectedPermissions = data.permissions
      .filter((p) => p.create || p.read || p.update || p.delete)
      .map((p) => {
        return {
          user_id: state.id,
          permission_id: p.permissionId,
          create: p.create,
          read: p.create || p.read || p.update || p.delete || p.read,
          update: p.update,
          delete: p.delete,
        };
      });
    // console.log(selectedPermissions);
    // return;
    const userData = {
      username: data.username,
      password: data.password,
      isUpdatePasswordNeeded: data.wantToUpdatePassword,
      // email: data.email,
      employeeId: data.employeeId,
      role: data.role,
      permissions: selectedPermissions,
    };
    mutateAsync({ user: userData, userId: user.id })
      .then(async (res) => {
        if (res.status === 200) {
          // await refetch();
          navigate("/administrations/user");
        }
      })
      .catch((err) => {
        console.log(err);
        const errors = err.response.data.message;
        errors.map((err) => {
          const msg = err.message;
          console.log(err.message);
          // setError(err.path, msg.join(""));
          setError(err.path, {
            type: "server",
            message: err.message,
            shouldFocus: true,
          });
        });
        // errors.map((err) => setError(err.path, err.message));
      });
  };
  // console.log(errors);
  const userpermissions = user?.userPermissions?.map((p) => p.userpermission);
  // console.log(userpermissions);
  const checkPermissionset = (permissionId) => {
    const p = userpermissions.find((p) => p.permission_id === permissionId);
    // console.log(p);
    return p;
  };
  const isDisabled = (permissionId, index) => {
    const permission = userpermissions.filter(
      (p) => p.permission_id === permissionId
    );

    let isDisabled = false;
    let watching = false;
    if (watchPermissions) {
      watching =
        watchPermissions[index]?.admin ||
        watchPermissions[index]?.create ||
        watchPermissions[index]?.update ||
        watchPermissions[index]?.delete;
    }
    // console.log(watching + "  watching");
    if (permission.length > 0) {
      // console.log("kjgkuyjfhjhcggfchgfx ");
      isDisabled =
        permission[0].create || permission[0].update || permission[0].delete;
      // console.log("kjgkuyjfhjhcggfchgfx    :  " + isDisabled);
    } else {
      isDisabled = true;
    }
    // if (!isDisabled && permission.length > 0) {
    //   isDisabled = true;
    //   // console.log("jbkhgvhgv");
    // }
    // console.log("dis " + isDisabled);
    return Boolean(watchPermissions ? isDisabled && watching : isDisabled);
  };
  // checkPermissionset();
  // console.log(errors);
  return (
    <Container className="p-3">
      <div className="p-2 d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5 className="mb-0"> Update User Account</h5>
      </div>
      {/* <div className="mb-4">
        <h4>Update User</h4>
      </div> */}
      <hr className="mt-1" />
      <Form onSubmit={handleSubmit(submitHandler)} className="px-2">
        <Row>
          <Col md={4} sm={6} className="mb-2">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("employeeId")}
                isInvalid={errors.employeeId}
                disabled={true}
                defaultValue={
                  user.employee.firstName +
                  " " +
                  user.employee.middleName +
                  " " +
                  user.employee.lastName
                }
              >
                {/* <option value="">Please Select</option>
                {employees?.map((e, index) => (
                  <option key={index} value={e.id}>
                    {e.firstName} {e.middleName} {e.lastName}
                  </option>
                ))} */}
              </Form.Control>
              {/* <Form.Control.Feedback type="invalid">
                {errors.employeeId?.message}
              </Form.Control.Feedback> */}
            </Form.Group>
          </Col>

          <Col md={4} sm={6} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                errors={errors.username}
                name="email"
                {...register("username")}
                type="text"
                placeholder="user-****"
                isInvalid={errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Want to Update Password</Form.Label>
              <Form.Check
                {...register("wantToUpdatePassword", {
                  onChange: (e) => {
                    console.log(e.target.checked);
                    if (e.target.checked) {
                      setValue("password", generatePassword(8));
                      // setValue("confirmPassword", "");
                    } else {
                      setValue("password", "");
                    }
                  },
                })}
                type="checkbox"
                // placeholder="password"
                isInvalid={errors.wantToUpdatePassword}
                // disabled={true}
              />
              <Form.Control.Feedback type="invalid">
                {errors.wantToUpdatePassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4} sm={12} className="mb-2">
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="Text"
                // placeholder="password"
                isInvalid={errors.password}
                disabled={true}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4} sm={6} className="mb-2">
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                // ref={roleref}
                {...register("role")}
                name="role"
                defaultValue={user.role_id}
                aria-label="Default select example"
                isInvalid={errors.role}
              >
                <option value="">Select Role</option>
                {roles?.map((r, index) => (
                  <option key={index} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.role?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <p className="fs-5 fw-bold ">
          {" "}
          <span className="border-bottom pb-1">Permissions</span>{" "}
        </p>
        <Table striped bordered hover responsive className="mt-1">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Admin</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {permissions?.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].admin"
                    {...register(`permissions[${index}].admin`, {
                      onChange: () => handleAdminCheck(index, p.id),
                    })}
                  />
                  <input
                    type="hidden"
                    name="permissions[${index}].permissionId"
                    {...register(`permissions[${index}].permissionId`)}
                    value={p.id}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].create"
                    {...register(`permissions[${index}].create`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={watchPermissions && watchPermissions[index].admin}
                    defaultChecked={
                      checkPermissionset(p.id)?.create
                      // state.userPermissions[index]?.userpermission
                      //   .permission_id === p.id
                      //   ? state.userPermissions[index]?.userpermission?.create
                      //   : false
                    }
                    // defaultValue={
                    //   state.userPermissions[index]?.userpermission
                    //     .permission_id === p.id &&
                    //   state.userPermissions[index]?.userpermission?.create
                    // }
                    defaultValue={checkPermissionset(p.id)?.create}
                  />
                </td>

                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].read"
                    {...register(`permissions[${index}].read`, {
                      // onChange: () => handleChangeRead(index),
                    })}
                    defaultChecked={checkPermissionset(p.id)?.read}
                    // defaultValue={checkPermissionset(p.id)?.read}
                    // disabled={
                    //   watchPermissions &&
                    //   (watchPermissions[index].admin ||
                    //     watchPermissions[index].create ||
                    //     watchPermissions[index].update ||
                    //     watchPermissions[index].delete)
                    // }
                    disabled={isDisabled(p.id, index)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].update"
                    {...register(`permissions[${index}].update`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={watchPermissions && watchPermissions[index].admin}
                    defaultChecked={checkPermissionset(p.id)?.update}
                    // defaultValue={checkPermissionset(p.id)?.update}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].delete"
                    {...register(`permissions[${index}].delete`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={watchPermissions && watchPermissions[index].admin}
                    defaultChecked={checkPermissionset(p.id)?.delete}
                    // defaultValue={checkPermissionset(p.id)?.delete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <hr /> */}
        <div className="d-flex justify-content-end ">
          <Button
            style={{ backgroundColor: "#9007b6" }}
            className="border-0 me-4"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Spinner animation="border" size="sm" />} Update
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdateUser;
