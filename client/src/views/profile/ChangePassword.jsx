import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword } from "./hooks/useChangePassword";

import { Spinner } from "react-bootstrap";
const schema = yup.object().shape({
  oldPassword: yup.string().required("old Password is required"),
  newPassword: yup
    .string()
    .required("new Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required("Confirm  Password is required"),
  // .oneOf([yup.ref("newPassword")], "passworn not match"),
});
const ChangePassword = () => {
  const { mutateAsync, isPending } = useChangePassword();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const submitHandler = async (data) => {
    console.log(data);
    // mutate(data);
    // return;
    mutateAsync(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setValue("oldPassword", "");
        setValue("newPassword", "");
        setValue("confirmPassword", "");
      }
    });

    //Change.
  };
  return (
    <>
      <div className="p-2">
        <div className=" bg-hrun-box p-3 border border-1 hrunboxshadow borderRadius7px ">
          <div className="bluewhite-bg p-2 mb-2">
            <h5 className="ms-md-4 ms-1 mb-0">Change your Password</h5>
          </div>
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                // id={name}
                {...register("oldPassword")}
                className="border-color"
                isInvalid={errors?.confirmPassword}
                placeholder="Enter..."
              />
              <Form.Control.Feedback type="invalid">
                {errors?.oldPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                // id={name}
                {...register("newPassword")}
                className="border-color"
                isInvalid={errors?.newPassword}
                placeholder="Enter..."
              />
              <Form.Control.Feedback type="invalid">
                {errors?.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                // id={name}
                {...register("confirmPassword")}
                className="border-color"
                isInvalid={errors?.confirmPassword}
                placeholder="Enter..."
              />
              <Form.Control.Feedback type="invalid">
                {errors?.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" disabled={isPending} type="submit">
              {isPending && <Spinner animation="border" size="sm" />}
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
