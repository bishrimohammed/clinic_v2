import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Container,
  Spinner,
  Table,
} from "react-bootstrap";
import { useAddUser } from "./hooks/useAddUser";
import { set, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEmplooyeDoesNotHaveAccount } from "./hooks/useGetEmplooyeDoesNotHaveAccount";
import { useGetRoles } from "../hooks/useGetRoles";
import { generatePassword } from "./utils/generatePassword";
import { useGetPermissions } from "../Administration/Role/hooks/useGetPermissions";
const schema = yup.object().shape({
  employeeId: yup.string().required("Employee is required"),
  // email: yup.string().email("invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("role is required"),
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
const AddUser = () => {
  const { mutate, mutateAsync, isPending } = useAddUser();
  const { data: employees } = useGetEmplooyeDoesNotHaveAccount();
  const { data: roles, isPending: ispending } = useGetRoles();

  const { data: permissions, isPending: permissionPending } =
    useGetPermissions();
  // console.log(roles);
  // console.log(permissions);
  // return;
  const password = useMemo(() => generatePassword(8), []);
  // console.log(p);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
  } = useForm({
    defaultValues: {
      employeeId: "",
      role: "",
      username: "",
      password: password,
    },
    resolver: yupResolver(schema),
  });
  const watchPermissions = useWatch({ control, name: "permissions" });
  const roleWatcher = useWatch({ control, name: "role" });
  // useEffect(() => {
  //   setValue("permissions", []);
  // }, [roleWatcher]);
  // console.log(watchPermissions);
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
    // console.log(watchPermissions);
    let isRead = watchPermissions && watchPermissions[index]?.read;
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
  // console.log(errors);    p?.rolepermission
  // const roleWatcher = watch("role");
  const rolepermissions = useMemo(
    () =>
      // .map((p) => console.log(p)),
      roles
        ?.filter((r) => r.id === parseInt(roleWatcher))
        ?.map((item) =>
          item.permissions.map((permission) => permission.rolepermission)
        )
        .flat(),
    [roleWatcher]
  );
  // const rolepermissions = roles
  //   // ?.filter((r) => r.id === parseInt(roleWatcher))
  //   ?.map((item) =>
  //     item.permissions.map((permission) => permission.rolepermission)
  //   )
  //   .flat();

  // console.log(roleWatcher);
  // console.log(rolepermissions);

  console.log(rolepermissions);
  const isDisabled = (permissionId, index) => {
    const permission = rolepermissions?.filter(
      (p) => p.permission_id == permissionId
    );
    // console.log(permission);
    let isDisabled = false;
    let watching = false;
    if (watchPermissions) {
      watching =
        watchPermissions[index]?.admin ||
        watchPermissions[index]?.create ||
        watchPermissions[index]?.update ||
        watchPermissions[index]?.delete;
      // watchPermissions[index]?.read;
    }
    // console.log(watching + "  watching");
    if (permission?.length > 0) {
      // console.log(isDisabled);
      isDisabled =
        permission[0].create || permission[0].update || permission[0].delete;
    } else {
      isDisabled = true;
    }
    // if (!isDisabled && permission?.length === 0) {
    //   console.log("bishri");
    //   isDisabled = false;
    //   // console.log("jbkhgvhgv");
    // }
    // console.log("dis " + isDisabled);
    return Boolean(watchPermissions ? isDisabled && watching : isDisabled);
  };
  // setValue("permissions", [{}]);
  const submitHandler = (data) => {
    // console.log(data);
    const selectedPermissions = data.permissions.filter(
      (p) => p.create || p.read || p.update || p.delete
    );
    const user = {
      username: data.username,
      password: data.password,
      // email: data.email,
      employeeId: data.employeeId,
      role: data.role,
      permissions: selectedPermissions,
    };
    // console.log(user);
    // // return;
    // // mutate(user);
    // return;
    mutateAsync(user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          handleClose();
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
      })
      .finally(() => {
        console.log("jhvkhgckvgh");
      });
  };
  if (ispending || permissionPending) {
    return <Spinner animation="border" variant="primary" />;
  }
  // const getGetEmployeeName = (id) => {
  //   console.log(id);
  //   const employee = employees?.find((e) => e.id === parseInt(id));
  //   console.log(employee);
  //   const result = employee
  //     ? {
  //         firstName: employee?.firstName,
  //         lastName: employee?.lastName,
  //         middleName: employee?.middleName,
  //       }
  //     : null;
  //   return result;
  // };
  const setUserName = (id) => {
    // console.log(id);
    // const employee = getGetEmployeeName(id);
    const employee = employees?.find((e) => e.id === parseInt(id));
    const randomNumber = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const username = employee
      ? `${employee?.firstName
          ?.slice(0, 4)
          .toLowerCase()}_${employee.middleName.toLowerCase()}_${randomNumber}`
      : "";
    setValue("username", username);
    console.log(employee);
    // return employee?.username;
  };
  // console.log(employees);
  // console.log(getGetEmployeeName(7));

  return (
    <Container className="p-3">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Row>
          <Col md={4} sm={6} className="mb-2">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Select
                {...register("employeeId", {
                  onChange: (e) => setUserName(e.target.value),
                })}
                isInvalid={errors.employeeId}
              >
                <option value="">Please Select</option>
                {employees?.map((e, index) => (
                  <option key={index} value={e.id}>
                    {e.firstName} {e.middleName} {e.lastName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.employeeId?.message}
              </Form.Control.Feedback>
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
                {...register("role", {
                  // onChange: () =>
                  //   setValue(
                  //     "permissions",
                  //     watchPermissions?.map((p, index) => {})
                  //   ),
                })}
                name="role"
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
        <Table striped bordered hover responsive className="mt-3">
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
                {/* {permissionList(index, p.id)} */}
                <td>
                  {/* <p>{typeof checkPermissionSet(p.id, "create")}</p> */}
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].create"
                    {...register(`permissions[${index}].create`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={
                      watchPermissions && watchPermissions[index]?.admin
                    }
                    // defaultChecked={checkPermissionSet(p.id, "create")}
                    // defaultChecked={rolepermissions?.find((pp) => {
                    //   let exist = false;
                    //   // console.log(pp.create);
                    //   if (pp.permission_id === p.id) {
                    //     exist = pp.create;
                    //   }
                    //   return exist;
                    // })}
                    // defaultValue={
                    //   rolepermissions?.find((pp) => {
                    //     return pp.permission_id === p.id;
                    //   })?.create
                    // }
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].read"
                    {...register(`permissions[${index}].read`, {
                      // onChange: () => handleChangeRead(index),
                    })}
                    // defaultChecked={checkPermissionSet(p.id, "read")}
                    // defaultChecked={rolepermissions?.find((pp) => {
                    //   let exist = false;
                    //   if (pp.permission_id === p.id) {
                    //     exist = pp.read;
                    //   } else {
                    //     exist = false;
                    //   }
                    //   return exist;
                    // })}
                    // defaultChecked={checkPermissionSet(p.id)?.read}
                    // defaultChecked={
                    //   checkPermissionSet(p.id)?.read
                    //     ? checkPermissionSet(p.id)?.read
                    //     : false
                    // }
                    // disabled={
                    //   watchPermissions &&
                    //   (watchPermissions[index]?.admin ||
                    //     watchPermissions[index]?.create ||
                    //     watchPermissions[index]?.update ||
                    //     watchPermissions[index]?.delete)
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
                    disabled={
                      watchPermissions && watchPermissions[index]?.admin
                    }
                    // defaultChecked={checkPermissionSet(p.id, "update")}4
                    // defaultChecked={

                    //   rolepermissions?.find((pp) => {
                    //     let exist = false;
                    //     if (pp.permission_id == p.id) {
                    //       exist = pp.update;
                    //     } else {
                    //       exist = false;
                    //     }
                    //     return exist;
                    //   })
                    // }
                    // defaultChecked={checkPermissionSet(p.id)?.update}
                    // defaultChecked={
                    //   checkPermissionSet(p.id)
                    //     ? checkPermissionSet(p.id).update
                    //     : false
                    // }
                    // defaultChecked={
                    //   watchPermissions && watchPermissions[index].admin
                    // }
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].delete"
                    {...register(`permissions[${index}].delete`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={
                      watchPermissions && watchPermissions[index]?.admin
                    }
                    // defaultChecked={rolepermissions?.find((pp) => {
                    //   let exist = false;
                    //   if (pp.permission_id === p.id) {
                    //     exist = pp.delete;
                    //   }
                    //   return exist;
                    // })}
                    // defaultChecked={checkPermissionSet(p.id)?.delete}
                    // defaultChecked={
                    //   checkPermissionSet(p.id)
                    //     ? checkPermissionSet(p.id).delete
                    //     : false
                    // }
                    // defaultChecked={
                    //   watchPermissions && watchPermissions[index].admin
                    // }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Row>
        <Col md={4} sm={6} className="mb-2">
           
           </Col>
           
          </Col>
        </Row> */}

        {/* <hr /> */}
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            disabled={isPending}
            style={{ backgroundColor: "#9007b6" }}
            className="border-0"
            type="submit"
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddUser;
