import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../components/inputs/TextInput";
// import NumberInput from "../../components/inputs/NumberInput";
import { useAddPatient } from "./hooks/useAddPatient";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
import { patientSchema } from "../../utils/Schemas";
const NewPatient = () => {
  const { mutateAsync, isPending } = useAddPatient();
  const [isbirthdateknown, setIsbirthdateknown] = useState(true);
  const woredas = useQuery({
    queryKey: ["woredas"],
    queryFn: async () => Axiosinstance.get("/woreda").then((res) => res.data),
    staleTime: 5 * 1000 * 1000,
  });
  // console.log(woredas.data);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: "",
      gender: "",
      address: {
        street: "",
        woreda_id: "",
        house_number: "",
        email: "",
        phone_1: "",
        phone_2: null,
      },
      birth_date: new Date().toISOString().substring(0, 10),
      is_dependent: false,
      is_new: true,
      manual_card_id: null,
      is_credit: false,
      credit_company_id: null,
    },
    resolver: yupResolver(patientSchema),
  });
  console.log(errors);
  // setValue("birth_date", new Date().toISOString().substring(0, 10));
  const AgeWacher = watch("age");
  const isCredit = watch("is_credit");
  const isNewPatient = watch("is_new");
  console.log(typeof isNewPatient);
  console.log(errors);
  const dc = new Date().toISOString().substring(0, 10);
  // console.log(AgeWacher);
  if (!isbirthdateknown) {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - AgeWacher);
    setValue("birth_date", date.toISOString().substring(0, 10));
  }
  const calulateBirthDatefromAge = (age) => {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - age);
    // setValue("birth_date", date.toISOString().substring(0, 10));
    return date.toISOString().substring(0, 10);
  };
  // const age = calulateBirthDatefromAge(20);
  // console.log(age);
  const submitHandler = async (data) => {
    console.log(data);
    const { age, ...rest } = data;
    //e.preventDefault();
    mutateAsync(rest).then((res) => {
      console.log(res);
    });
    return;
  };

  const CompanyAgreementList = isCredit ? (
    <Form.Group className="">
      <Form.Label className="text-nowrap">company agreement</Form.Label>
      <Form.Select
        {...register("credit_company_id")}
        isInvalid={errors.credit_company_id}
      >
        <option value="">Select company</option>
        <option value="1">softnet solution</option>
        <option value="2">addis sw</option>
      </Form.Select>

      <Form.Control.Feedback type="invalid" className="small text-danger">
        {errors.credit_company_id?.message}
      </Form.Control.Feedback>
    </Form.Group>
  ) : null;
  return (
    <Container className="p-3 mb-4">
      <div className="p-3 bg-hrun-box hrunboxshadow">
        <div className="mb-2">
          <h4> Patient Information</h4>
        </div>
        <hr className="mt-1" />
        <Form onSubmit={handleSubmit(submitHandler)}>
          <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
            Basic Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="First Name"
                register={register}
                name="firstName"
                errors={errors.firstName}
              />
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="Middle Name"
                register={register}
                name="middleName"
                errors={errors.middleName}
              />
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="Last Name"
                register={register}
                name="lastName"
                errors={errors.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  {...register("gender")}
                  isInvalid={errors.gender}
                  aria-label="Default select example"
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Select>
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <div className="d-flex gap-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Check
                    type="switch"
                    size="sm"
                    checked={isbirthdateknown}
                    label="is known"
                    // value={isbirthdateknown}
                    onChange={(e) => {
                      // console.log(e.target.checked);
                      setIsbirthdateknown(e.target.checked);
                    }}
                  />
                </div>
                <Form.Control
                  type="date"
                  name="birth_date"
                  {...register("birth_date")}
                  disabled={!isbirthdateknown}
                  // value={calulateBirthDatefromAge(AgeWacher)}
                  isInvalid={errors.birth_date}
                />
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors.birth_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex gap-3">
                  <Form.Label>Age</Form.Label>
                  {/* <Form.Check
                    type="switch"
                    size="sm"
                    checked={isbirthdateknown}
                    label="is known"
                    // value={isbirthdateknown}
                    onChange={(e) => {
                      // console.log(e.target.checked);
                      setIsbirthdateknown(e.target.checked);
                    }}
                  /> */}
                </div>

                <Form.Control
                  type="number"
                  required={!isbirthdateknown}
                  disabled={isbirthdateknown}
                  {...register("age", {
                    required: [isbirthdateknown === "true" ? true : false],
                    min: 18,
                    max: 100,
                  })}
                  isInvalid={errors.age}
                  placeholder="Enter age"
                />
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors?.age?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* <Col>
              <TextInput
                label="Phone"
                register={register}
                name="phone"
                errors={errors.phone}
              />
            </Col> */}
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Address Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Check
                type="checkbox"
                label="Is Dependent"
                {...register("is_dependent")}
              />
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("address.phone_1")}
                  isInvalid={errors.address?.phone_1}
                />
              </Form.Group>
              <Form.Control.Feedback
                type="inValid"
                className="small text-danger"
              >
                {errors?.address?.phone_1?.message}
              </Form.Control.Feedback>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              {/* <TextInput
                label="Alternative Phone"
                register={register}
                name="phone_2"
                errors={errors.phone_2}
              /> */}
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("address.email", {})}
                  placeholder="example@example.com"
                  isInvalid={errors.address?.email}
                />
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors?.address?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Woreda</Form.Label>
                {/* <Form.Control type="text" {...register("address.street")} /> */}
                <Form.Select {...register("address.woreda_id")}>
                  <option value="">Select Woreda</option>
                  {woredas?.data?.map((woreda, index) => (
                    <option key={index} value={woreda.id}>
                      {woreda.name} {woreda.SubCity?.Subcity_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" {...register("address.street")} />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              {/* <TextInput
                  label="House Number"
                  register={register}
                  name="house_number"
                  errors={errors.house_number}
                /> */}
              <Form.Group>
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="number"
                  {...register("address.house_number")}
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Alternative Phone</Form.Label>
                <Form.Control
                  type="number"
                  {...register("address.phone_2", {
                    pattern: {
                      value: /^(09|07)?\d{8}$/,
                      message: "phone number is invalid",
                    },
                  })}
                  placeholder="09/07********"
                  isInvalid={errors.address?.phone_2}
                />
                <Form.Control.Feedback
                  type="inValid"
                  className="small tetx-danger"
                >
                  {errors?.address?.phone_2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
            Patient Type
          </h6> */}
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Patient Type
          </h6>
          <Row>
            <Col md={4} sm={12}>
              <Form.Group className="">
                <Form.Label className="text-nowrap">Patient Type</Form.Label>
                <Form.Select {...register("is_new")} isInvalid={errors.is_new}>
                  {/* <option value={null}>Select Patient Type</option> */}

                  <option value="true">New</option>
                  <option value="false">Existing</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              {isNewPatient === "false" ? (
                <Form.Group className="">
                  <Form.Label className="text-nowrap">
                    Manual Card Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...register("manual_card_id", {
                      required: [isNewPatient === "true" ? true : false],
                    })}
                    isInvalid={errors.manual_card_id}
                  />
                  <Form.Control.Feedback
                    type="inValid"
                    className="small text-danger"
                  >
                    {errors?.manual_card_id?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : null}
            </Col>
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 my-3 fw-bold">
            Patient payment way
          </h6>

          <Row>
            <Col md={4} sm={12}>
              <Form.Group className="">
                <Form.Label className="text-nowrap">Payment way</Form.Label>
                <Form.Select {...register("is_credit")}>
                  {/* <option value="">Select Payment way</option> */}

                  <option value="false">self payer</option>
                  <option value="true">credit</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {/* // select company that have agrement with the clinics */}
            <Col md={4} sm={12}>
              {/* {isCredit ? (
                <Form.Group className="">
                  <Form.Label className="text-nowrap">
                    company agreement
                  </Form.Label>
                  <Form.Select {...register("credit_company_id")}>
                    <option value="">Select company</option>
                    <option value="1">softnet solution</option>
                    <option value="2">addis sw</option>
                  </Form.Select>
                </Form.Group>
              ) : null} */}
              {isCredit === "true" && CompanyAgreementList}
            </Col>
            <Col></Col>
          </Row>
          <hr />
          <div className="d-flex justifyContentEnd">
            <Col>
              <Button
                variant="primary"
                disabled={isPending}
                className="w-100"
                type="submit"
              >
                {isPending && <Spinner animation="border" size="sm" />}
                Register Patient
              </Button>
            </Col>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default NewPatient;
