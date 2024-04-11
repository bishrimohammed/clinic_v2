import { Button, Col, Form, Image, Row } from "react-bootstrap";
import img from "../../assets/Newteammembersamico.png";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GrFormLock } from "react-icons/gr";
import { PiLockBold } from "react-icons/pi";
import "./login.css";
import { Link } from "react-router-dom";
const Login2 = () => {
  return (
    <div
      //   className="w-100 h-100"
      style={{
        backgroundColor: "rgb(245, 245, 245)",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="py-lg-3 py-2 px-md-5 px-1 hrunboxshadow"
        style={{ backgroundColor: "white" }}
      >
        <p
          className="mb-0 fw-bold headtext"
          style={{ color: "rgb(148, 78, 245)" }}
        >
          SOFTNET HEALTHCARE SYSTEM
        </p>
      </div>
      <div className="wrapper mx-sm-2 h-100">
        <div className="content">
          <div
            className="fromcontainer px-4 py-4 hrunboxshadow formCardBorderRadius"
            style={{ backgroundColor: "white" }}
          >
            <h5 className="text-center mb-4 mt-2 fw-bold">
              <span
                style={{
                  color: "rgb(85, 77, 112), ",
                  fontFamily: "revert-layer",
                }}
              >
                Welcome To{" "}
              </span>{" "}
              <span style={{ color: "rgb(143, 35, 245)" }}>SHCS</span>
            </h5>
            <Form className="mt-2">
              <Form.Group className="mb-4" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <div className="d-flex gap-2 align-items-center border border-1 px-2 inputborderRadious">
                  <input
                    className="p-2 w-100 form-control border-0 "
                    style={{ outline: "none" }}
                    type="email"
                    placeholder="Email ID"
                  />
                  <MdOutlineEmail size={25} />
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <div className="d-flex gap-2 align-items-center border border-1 px-2">
                  <input
                    className="p-2 w-100 form-control border-0 "
                    style={{ outline: "none" }}
                    type="password"
                    placeholder="*********"
                  />
                  <PiLockBold size={25} />
                </div>
              </Form.Group>
              <div className="ms-3 px-2">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
              <Button
                style={{ backgroundColor: "rgb(83, 77, 125)" }}
                className="w-100 mt-4 mb-3 border-0 fw-bold"
              >
                Sign In
              </Button>
              {/* <Link>Forgot Password</Link> */}
            </Form>
          </div>
        </div>
        {/* <Row className="w-100 h-100">
          <Col md={7} sm={0} md-offset></Col>
          <Col md={5}>
            {" "}
            <div className="h-100 w-100 ">
              <div className=" w-100 h-100 d-flex justify-content-end  align-items-center">
                <div
                  className="w-75 px-4 py-5 formCardBorderRadius"
                  style={{ backgroundColor: "white" }}
                >
                  <h5 className="text-center mb-4 fw-bold">
                    <span style={{ color: "rgb(85, 77, 112)" }}>
                      Welcome To{" "}
                    </span>{" "}
                    <span style={{ color: "rgb(143, 35, 245)" }}>SHCS</span>
                  </h5>
                  <Form className="mt-2">
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      
                      <div className="d-flex gap-2 align-items-center border border-1 px-2 inputborderRadious">
                        <input
                          className="p-2 w-100 form-control border-0 "
                          style={{ outline: "none" }}
                          type="email"
                          placeholder="Email ID"
                        />
                        <MdOutlineEmail size={25} />
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                     
                      <div className="d-flex gap-2 align-items-center border border-1 px-2">
                        <input
                          className="p-2 w-100 form-control border-0 "
                          style={{ outline: "none" }}
                          type="password"
                          placeholder="*********"
                        />
                        <PiLockBold size={25} />
                      </div>
                    </Form.Group>
                    <div className="ms-3 px-2">
                      <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                    <Button
                      style={{ backgroundColor: "rgb(83, 77, 125)" }}
                      className="w-100 mt-4 border-0 fw-bold"
                    >
                      Sign In
                    </Button>
                   
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row> */}
      </div>
    </div>
  );
};

export default Login2;
