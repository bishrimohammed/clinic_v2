import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
//import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateLabService } from "../hooks/useLabService";
import { useLaboratoryTestPricing } from "../../../patient/hooks/useGetLaboratoryTests";
import { useLabCategory } from "../../../patient/hooks/useLabCategory";
import { useGetUnits } from "../hooks/useGetUnits";
const schema = yup.object().shape({
  test_name: yup.string().required("lab test name is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(0)
    .required("price is required"),

  lab_category: yup.string().required("lab category is required"),
  unit: yup.string(),
});

const UpdateLabService = () => {
  const { state } = useLocation();
  // console.log(state);
  const { mutate, isPending } = useUpdateLabService();
  const { data } = useLabCategory();
  const { data: units } = useGetUnits();
  // const { data: Labtests } = useLaboratoryTestPricing();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      test_name: state.service_name,
      price: state.price,

      lab_category: state.serviceCategory_id,
      unit: state.unit_id,
    },
    resolver: yupResolver(schema),
  });
  //console.log(errors);
  const submitHandler = (data) => {
    console.log(data);
    // return;
    mutate(data);
  };

  return (
    <Container className="p-0">
      <div className="boxshadow borderRadius7px">
        <h5 className="p-2 mt-1 mb-3 bluewhite-bg">
          Edit Laboratory Pricing Item{" "}
        </h5>
        <Form onSubmit={handleSubmit(submitHandler)} noValidate className="p-3">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="test_name">Name : </Form.Label>
                <Form.Control
                  type="text"
                  name="test_name"
                  id="test_name"
                  {...register("test_name")}
                  placeholder="Enter Test Name"
                  isInvalid={errors.test_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.test_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="price">Price : </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  id="price"
                  {...register("price")}
                  placeholder="enter price"
                  isInvalid={errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 ">
                <Form.Label htmlFor="lab_category">Lab Category : </Form.Label>
                <Form.Select
                  id="lab_category"
                  {...register("lab_category")}
                  aria-label="Default select example"
                  isInvalid={errors.lab_category}
                >
                  {/* <option value="">Open this select menu</option> */}
                  {data?.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.lab_category?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 ">
                <Form.Label htmlFor="lab_category"> unit </Form.Label>
                <Form.Select
                  id="unit"
                  {...register("unit")}
                  aria-label="Default select example"
                  isInvalid={errors.unit}
                >
                  <option value={""}>Select unit</option>
                  {units?.map((unit, index) => (
                    <option key={index} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.unit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <hr />
          <Button
            variant="danger"
            type="button"
            className="me-3"
            onClick={() => navigate(-1)}
          >
            Return
          </Button>
          <Button variant="primary" disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}
            Update
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateLabService;
