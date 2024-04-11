import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { useGetPermissions } from "./hooks/useGetPermissions";
import { useAddRole } from "./hooks/useAddRole";
const roleSchema = yup.object().shape({
  roleName: yup
    .string()
    .transform((value) => value.trim())
    .required("Name is required"),
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
const CreateRole = () => {
  const { data: permissions } = useGetPermissions();
  const { mutate, isPending } = useAddRole();
  // console.log(permissions);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      // name: "",
      // permissions: [],
    },
    resolver: yupResolver(roleSchema),
  });
  // const watchPermissions = watch("permissions");
  const watchPermissions = useWatch({ control, name: "permissions" });
  // console.log(watchPermissions);
  // console.log(errors);
  // const PermissionList = permissions?.map((p, index) => {
  //   let pName = p.name.split(" ")[1];
  //   // console.log(pName);
  //   return {
  //     group: pName + " Management",
  //     name: p.name,
  //     id: p.id,
  //   };
  // });
  // const groupPermissions = Object.groupBy(
  //   PermissionList || [],
  //   ({ group }) => group
  // );
  // console.log(groupPermissions["User Management"]);
  // if (isPending) return "load";
  // console.log(errors);

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
  // console.log(groupPermissions);
  const submitHandler = (data) => {
    // console.log(data);

    console.log(data);
    const selectedPermissions = data.permissions.filter(
      (p) => p.create || p.read || p.update || p.delete
    );
    console.log(selectedPermissions);
    // return;
    // const selectedPermission = data.permissions
    //   .filter((p) => p.value === true)
    //   .map((p) => p.permissionId);
    // console.log("selected" + selectedPermission);
    // return;
    const role = {
      name: data.roleName,
      permissions: selectedPermissions,
    };
    // console.log(role);
    mutate(role);
  };
  return (
    <div className="p-3">
      <h4>Create Role</h4>
      <Form onSubmit={handleSubmit(submitHandler)} className="mt-3">
        <Row>
          <Col md={6}>
            <Form.Group className="">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                // disabled={true}
                // className="w-50"
                name="roleName"
                placeholder="role"
                {...register("roleName")}
                isInvalid={errors.roleName}
              />
            </Form.Group>{" "}
          </Col>
        </Row>

        <p className="my-3 fs-5">Permissions</p>

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
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].create"
                    {...register(`permissions[${index}].create`, {
                      onChange: () => handleChangeRead(index),
                    })}
                    disabled={watchPermissions && watchPermissions[index].admin}
                    // defaultChecked={
                    //   watchPermissions && watchPermissions[index].admin
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
                    disabled={
                      watchPermissions &&
                      (watchPermissions[index].admin ||
                        watchPermissions[index].create ||
                        watchPermissions[index].update ||
                        watchPermissions[index].delete)
                    }
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
                    disabled={watchPermissions && watchPermissions[index].admin}
                    // defaultChecked={
                    //   watchPermissions && watchPermissions[index].admin
                    // }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Row></Row>
        <div className="d-flex justify-content-end align-items-center">
          <Button
            type="submit"
            className="btn btn-primary px-3 me-3 py-1"
            // onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateRole;
