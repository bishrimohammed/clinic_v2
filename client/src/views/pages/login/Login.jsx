import { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setlogin } from "../../../store/authSlice";
import doctorImage from "../../../assets/Doctors-amico.png";
//import { login } from "../store/authSlice";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Axiosinstance from "../../../api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { CiLock, CiUser } from "react-icons/ci";
const LoginSchema = yup.object().shape({
  // email: yup.string().email("invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const Login = () => {
  const passwordref = useRef();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    // defaultValues: {
    //   username: "",
    //   password: "",
    // },
  });
  // const roleref = useRef();
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.post("/user/login", data).then((res) => res.data);
    },
    onSuccess: async (data) => {
      // console.log(data);
      if (data.is_new) {
        dispatch(setlogin(data));
        toast.success("success");
        // window.location.replace("/changePassword");
        // <Navigate to="/changepassword" replace="true" />;
        navigate("/changepassword", { state: data, replace: true });
        // window.history.pushState(null, null, window.location.href);
      } else {
        // console.log("not new");
        dispatch(setlogin(data));
        toast.success("success");
        navigate("/", { replace: true });
      }
    },
    onError: async (err) => {
      //console.log(err.response);
      toast.error(err?.response?.data.message);
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sumbitHandler = (data) => {
    //e.preventDefault();
    // console.log(data);
    loginMutation.mutate(data);
  };
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit(sumbitHandler)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        {/* <CIcon icon={cilUser} /> */}
                        <CiUser />
                        {/* <span>User-</span> */}
                      </InputGroup.Text>

                      <Form.Control
                        // ref={emailref}
                        type="text"
                        {...register("username")}
                        isInvalid={errors.username}
                        id="exampleFormControlInput1"
                        placeholder="username"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroup.Text>
                        {/* <CIcon icon={cilLockLocked} /> */}
                        <CiLock />
                      </InputGroup.Text>
                      <Form.Control
                        ref={passwordref}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password")}
                        isInvalid={errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <Row>
                      <Col xs={6}>
                        <Button
                          type="submit"
                          disabled={loginMutation.isPending}
                          // color="#9007b6"
                          style={{ backgroundColor: "#9007b6" }}
                          className="px-4 border-0"
                        >
                          {loginMutation.isPending && (
                            <Spinner animation="border" size="sm" />
                          )}
                          Login
                        </Button>
                      </Col>
                      <Col xs={6} className="text-right"></Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white  "
                style={{ width: "100%", backgroundColor: "#9007b6" }}
              >
                <CardBody className="">
                  <div>
                    {/* <h4>Sofnet Clinic System</h4> */}
                    <Image src={doctorImage} fluid alt="" />
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
