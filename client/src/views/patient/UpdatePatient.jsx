import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import TextInput from "../../components/inputs/TextInput";
import NumberInput from "../../components/inputs/NumberInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
import { useGetPatient } from "./hooks/patientHooks/useGetPatient";
import PatientForm from "./forms/PatientForm";
import { IoMdArrowRoundBack } from "react-icons/io";
const schema = yup.object().shape({
  firstName: yup.string().required("first Name is required"),
  middleName: yup.string().required("middle Name is required"),
  lastName: yup.string().required(" lastName is required"),
  phone: yup.string().required("phone Number is required"),
  gender: yup.string().required("gender is required"),
});
const UpdatePatient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const { data } = useGetPatient(state.id);
  // const { state } = useLocation();
  //console.log(id);
  // let name = state.name.split(" ");
  // console.log(name);

  const queryClient = useQueryClient();
  const UpdateMutation = useMutation({
    mutationFn: async (data) => {
      return Axiosinstance.put(`/patient/${id}`, data).then((res) => res.data);
    },
    onSuccess: async (response) => {
      const { data } = response;
      //console.log(data);

      toast.success("updated successfully");
      navigate("/patients/patientlist");
    },
    onError: async (err) => {
      // console.log(err.response);
      //  toast.error(err.response.data.message, {})
      toast.error(err.response.data.message);
    },
  });

  const handleUpdate = (data) => {
    UpdateMutation.mutate(data);
  };

  return (
    <Container className="p-3 mb-5">
      <div className="p-3  bg-hrun-box hrunboxshadow">
        <div className="mb-4 d-flex gap-3 align-items-center">
          <IoMdArrowRoundBack
            className="cursorpointer"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h4>Update Patient Information</h4>
        </div>

        <PatientForm patient={data} />
        {/* <Form onSubmit={handleSubmit(handleUpdate)}>
          <Row>
            <Col>
              <TextInput
                label="First Name"
                register={register}
                name="firstName"
                errors={errors.firstName}
              />
            </Col>

            <Col>
              <TextInput
                label="Middle Name"
                register={register}
                name="middleName"
                errors={errors.middleName}
              />
            </Col>

            <Col>
              <TextInput
                label="Last Name"
                register={register}
                name="lastName"
                errors={errors.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>sex</Form.Label>
                <Form.Select
                  {...register("gender")}
                  isInvalid={errors.gender}
                  aria-label="Default select example"
                >
                  <option value="">Select Sex</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Select>
                <Form.Control.Feedback type="inValid">
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <NumberInput
                label="Age"
                register={register}
                name="age"
                errors={errors.age}
              />
            </Col>
            <Col>
              <TextInput
                label="Phone"
                register={register}
                name="phone"
                errors={errors.phone}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextInput
                label="Woreda"
                register={register}
                name="woreda"
                errors={errors.woreda}
              />
            </Col>
            <Col>
              <TextInput
                label="Kebele"
                register={register}
                name="kebele"
                errors={errors.kebele}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <hr />
          <div className="d-flex justifyContentEnd">
            <Col>
              <Button
                variant="primary"
                disabled={UpdateMutation.isPending}
                className="w-100"
                type="submit"
              >
                {UpdateMutation.isPending && (
                  <Spinner animation="border" size="sm" />
                )}
                Update Patient
              </Button>
            </Col>
          </div>
        </Form> */}
      </div>
    </Container>
  );
};

export default UpdatePatient;
