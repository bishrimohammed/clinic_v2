import React, { useMemo } from "react";
import { useGetRoleById } from "./hooks/useGetRoleById";
import { useLocation, useParams } from "react-router-dom";

import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { useGetPermissions } from "./hooks/useGetPermissions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateRole } from "./hooks/useUpdateRole";
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
      permissionId: yup
        .number()
        .transform((value) => parseInt(value))
        .required("permissionId is required"),
    })
  ),
});
const UpdateRole = () => {
  const { roleId } = useParams();
  const { state } = useLocation();
  // console.log(state);
  const { data: permissions } = useGetPermissions();
  // const { data: role } = useGetRoleById(roleId);
  const { mutate, isPending } = useUpdateRole();
  // const dd = useMemo(() => role, [isPending]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      roleName: state?.name,
      // permissions: [],
    },
    resolver: yupResolver(roleSchema),
  });
  // console.log(errors);
  let watchPermissions = [];
  watchPermissions = useWatch({ control, name: "permissions" });

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
    console.log(" is read  " + isRead);
    console.log(" read  " + read);
  };

  const rolepermissions = useMemo(() =>
    state.permissions.map((p) => p.rolepermission, [])
  );
  // console.log(rolepermissions);
  const checkPermissionSet = (permissionId) => {
    const rolepermission = rolepermissions.find(
      (p) => p.permission_id === permissionId
    );
    return rolepermission;
  };

  const isDisabled = (permissionId, index) => {
    const permission = rolepermissions.filter(
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
      console.log("kjgkuyjfhjhcggfchgfx ");
      isDisabled =
        permission[0].create || permission[0].update || permission[0].delete;
      // console.log("kjgkuyjfhjhcggfchgfx    :  " + isDisabled);
    } else {
      isDisabled = true;
    }
    // if (permission?.length > 0 && !isDisabled && permission[0].read) {
    //   isDisabled = true;
    //   // console.log("jbkhgvhgv");
    // }
    // console.log("dis " + isDisabled);
    return watchPermissions ? isDisabled && watching : isDisabled;
  };
  const submitHandler = (data) => {
    // console.log(data);

    const selectedPermissions = data.permissions
      .filter((p) => p.create || p.read || p.update || p.delete)
      .map((p) => {
        return {
          role_id: state.id,
          permission_id: p.permissionId,
          create: p.create,
          read: p?.read,
          update: p.update,
          delete: p.delete,
        };
      });
    // console.log(selectedPermissions);
    // return;
    const role = {
      name: data.roleName,
      selectedPermission: selectedPermissions,
    };
    // return;
    // console.log(role);
    mutate({ role, roleId: state.id });
  };
  return (
    <div className="p-3">
      <h4>Update Role</h4>

      <Form onSubmit={handleSubmit(submitHandler)} className="mt-3">
        <Row>
          <Col md={6}>
            <Form.Group className="">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                // disabled={true}
                defaultValue={state?.name}
                name="roleName"
                placeholder="role"
                {...register("roleName")}
                isInvalid={errors.roleName}
              />
            </Form.Group>
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
                    defaultChecked={
                      // state.permissions[index]?.rolepermission?.create
                      checkPermissionSet(p.id)?.create
                    }
                    // defaultValue={checkPermissionSet(p.id)?.create}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="permissions[${index}].read"
                    {...register(`permissions[${index}].read`, {
                      // onChange: () => handleChangeRead(index),
                    })}
                    defaultChecked={checkPermissionSet(p.id)?.read}
                    // defaultValue={checkPermissionSet(p.id)?.read}
                    // disabled={
                    //   disableReadCheck(p.id) ||
                    //   (watchPermissions &&
                    //     (watchPermissions[index]?.admin ||
                    //       watchPermissions[index]?.create ||
                    //       watchPermissions[index]?.update ||
                    //       watchPermissions[index]?.delete))
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
                    defaultChecked={checkPermissionSet(p.id)?.update}
                    // defaultValue={checkPermissionSet(p.id)?.update}
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
                    defaultChecked={checkPermissionSet(p.id)?.delete}
                    // defaultValue={checkPermissionSet(p.id)?.delete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end align-items-center">
          <Button
            type="submit"
            className="btn btn-primary me-3 px-3 py-1"
            // onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateRole;
