import { Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPatient } from "./hooks/patientHooks/useGetPatient";
import PatientForm from "./forms/PatientForm";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetWoredas } from "../../hooks/useGetWoredas";
import { useGetRegions } from "../../hooks/useGetRegions";
import { useGetCities } from "../../hooks/useGetCities";
import { useGetSubCities } from "../../hooks/useGetSubCities";

const UpdatePatient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data, isPending } = useGetPatient(state.id);

  const { isPending: wp } = useGetWoredas();
  const { isPending: rp } = useGetRegions();
  const { isPending: cp } = useGetCities();
  const { isPending: sp } = useGetSubCities();
  // const { state } = useLocation();
  //console.log(id);
  // let name = state.name.split(" ");
  // console.log(name);
  if (isPending || wp || rp || cp || sp) return <Spinner animation="border" />;

  return (
    <Container className="p-3 mb-5">
      <div className="p-3  bg-hrun-box hrunboxshadow">
        <div className=" p-2  d-flex gap-3 align-items-center">
          <IoMdArrowRoundBack
            className="cursorpointer"
            size={22}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <h5>Update Patient Information</h5>
        </div>
        <hr className="mt-1" />
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
