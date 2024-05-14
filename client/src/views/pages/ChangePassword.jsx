import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePassword } from "./changePassword/useChangePassword";
import { useLocation, useNavigate } from "react-router-dom";
import { setlogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { AxiosHeaders } from "../../api/useAxiosHeaders";
import Axiosinstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
const schema = yup.object().shape({
  Password: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm  Password is required")
    .oneOf([yup.ref("newPassword")], "Password not match"),
});
const ChangePassword = () => {
  const { mutateAsync, isPending } = useChangePassword();
  const { headers } = AxiosHeaders();
  const { state } = useLocation();

  console.log(state);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      Password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const [errorState, setErrorState] = useState("");
  // console.log(errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (errorState) {
      const timeoutId = setTimeout(() => {
        setErrorState("");
      }, 5000);

      // Clean up the timeout when the effect is re-run or unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [errorState]);
  useEffect(() => {
    // Disable forward and backward navigation
    window.history.pushState(null, null, window.location.href);
  }, []);

  const changePasswordMutation = useMutation({
    mutationFn: async (data) => {
      return await Axiosinstance.patch(
        `/user/${state.id}/changepassword`,
        data,
        {
          headers,
        }
      );
    },
    onSuccess: (data) => {
      toast.success("Password updated successfully");
      dispatch(setlogin(data));
      navigate("/");
    },
    onError: (error) => {
      // console.log(error);
      setErrorState(error?.response?.data?.message);
    },
  });
  const submitHandler = async (data) => {
    console.log(data);
    // mutate(data);
    // return;
    changePasswordMutation.mutate({
      password: data.Password,
      newPassword: data.newPassword,
    });
    // mutateAsync(data)
    //   .then((res) => {
    //     console.log(res);
    //     const user = res.data;
    //     if (res.status === 200) {
    //       dispatch(setlogin(data));
    //       navigate("/");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setErrorState(err?.response?.data?.message);
    //   });

    //Change.
  };
  return (
    <div
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ maxWidth: 600 }} className=" p-2  w-100">
        <div className=" bg-hrun-box p-3 border border-1 hrunboxshadow borderRadius7px ">
          <div className="bluewhite-bg py-2 px-3 mb-2">
            <h5 className=" fw-5 mb-0">Please Change your Password</h5>
          </div>
          {errorState && (
            <Alert variant="danger" dismissible>
              {errorState}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                // id={name}
                {...register("Password")}
                // className="border-color"
                isInvalid={errors?.Password}
                placeholder="Enter..."
              />
              <Form.Control.Feedback type="invalid">
                {errors?.Password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                // id={name}
                {...register("newPassword")}
                // className="border-color"
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
                // className="border-color"
                isInvalid={errors?.confirmPassword}
                placeholder="Enter..."
              />
              <Form.Control.Feedback type="invalid">
                {errors?.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                {/* {isPending && <Spinner animation="border" size="sm" />} */}
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
