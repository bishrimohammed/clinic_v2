//import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

import { useLabCategory } from "../../../patient/hooks/useLabCategory";
import { useAddLabService } from "../hooks/useLabService";
import { useLaboratoryTestPricing } from "../../../patient/hooks/useGetLaboratoryTests";
import { useGetUnits } from "../hooks/useGetUnits";

const schema = yup.object().shape({
  test_name: yup.string().required("lab test name is required"),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .moreThan(0)
    .required("price is required"),
  // isPanel: yup.boolean(),
  // panelGroup: yup.array(),
  lab_category: yup.string().required("laboratory category is required"),
  unit: yup.string(),
  // unit: yup.string(),
  // referenceRange: yup.string(),
});
const CreateLabService = () => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const { data } = useLabCategory();
  const { mutate, isPending } = useAddLabService();
  const { data: units } = useGetUnits();
  const navigate = useNavigate();
  // const { data: Labtests } = useLaboratoryTestPricing();
  //const labOptions = useLaboratoryTests();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      test_name: "",
      price: null,

      lab_category: "",
    },
    resolver: yupResolver(schema),
  });
  // let labCategory = watch("lab_category");
  // let isPanel = watch("isPanel");
  // console.log(Labtests);
  const submitHandler = (data) => {
    //console.log(panelGroupValues);
    console.log(data);
    // return;
    mutate(data);
  };
  console.log(units);
  return (
    <Container className="p-0">
      <div className=" boxshadow borderRadius7px">
        <h5 className="p-2 px-3 mt-1 mb-3 bluewhite-bg">
          Add New Laboratory Service
        </h5>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
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
                  //isValid={touchedFields.test_name && !errors.test_name}
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
                  <option value={""}>Open this select menu</option>
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

          {/*
           <Form.Group className="mb-3">
            <Form.Label htmlFor="panelGroup" className="me-2">
              panelGroup :
            </Form.Label>
            <Form.Control
              as="select"
              multiple
              {...register("panelGroup")}
              disabled={!isPanel}
            >
              
              {Labtests?.filter(
                (lab) => lab.lab_category._id === labCategory
              ).map((labb, index) => (
                <option key={index} value={labb._id}>
                  {labb.test_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> 
          */}
          {/* <Row>
            <Col>
              <Form.Group className="mb-1">
                <Form.Label>reference Range:</Form.Label>
                <Form.Control
                  placeholder="reference Range"
                  {...register("referenceRange")}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>unit:</Form.Label>
                <Form.Control
                  placeholder="unit of test"
                  {...register("unit")}
                />
              </Form.Group>
            </Col>
          </Row> */}
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
            {isPending && <Spinner animation="border" size="sm" />}+ Add Service
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default CreateLabService;
