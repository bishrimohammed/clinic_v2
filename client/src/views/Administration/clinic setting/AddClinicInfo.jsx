import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  Button,
  Image,
  Spinner,
  Row,
  Col,
  Container,
  FloatingLabel,
} from "react-bootstrap";
import { useState } from "react";

import { useAddClinicInfo } from "./hooks/useAddClinicInfo";

import { useGetWoredas } from "../../../hooks/useGetWoredas";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  logo: yup.mixed().required("Please select an image file"),
  card_valid_date: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Convert empty string to undefined
      }
      return value;
    })
    .transform((value) => Math.abs(value))
    .positive()
    .required("Card is valid date is required"),
  website_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Invalid url!"
    ),
  has_triage: yup.boolean(),
  address: yup.object().shape({
    street: yup.string().required("street is required"),
    woreda_id: yup.string().required("woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
  motto: yup.string(),
  clinicType: yup.string(),
  number_of_branch: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Convert empty string to undefined
      }
      return value;
    })
    .transform((value) => Math.abs(value))

    .nullable()
    .typeError("Number of branches must be a number")
    .min(1, "Number of branches must be greater than or equal to 1")
    .required("Number of branches is required"),
  branch_list: yup.array(),
  brand_color: yup.string(),
  clinc_working_hours: yup.array().of(
    yup.object().shape({
      day_of_week: yup.string(),
      start_time: yup
        .string()
        .test("valid-time", "Invalid start time", (value) => {
          const regex24Hour = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // 24-hour format
          const regex12Hour = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i; // 12-hour format
          return regex24Hour.test(value) || regex12Hour.test(value);
        })
        .required("Start time is required"),
      end_time: yup
        .string()
        .test("valid-time", "Invalid end time", (value) => {
          const regex24Hour = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // 24-hour format
          const regex12Hour = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i; // 12-hour format

          return regex24Hour.test(value) || regex12Hour.test(value);
        })
        .test(
          "is-greater",
          "end time must be greater than start time",
          (value, context) => {
            return context.parent.start_time < value;
          }
        ),
      // .max(yup.ref("start_time")),
    })
  ),
});

const AddClinicInfo = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate, isPending } = useAddClinicInfo();
  const { data: woredas } = useGetWoredas();
  const {
    register,
    handleSubmit,
    getValues,

    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      logo: "",
      card_valid_date: "",
      website_url: "",
      address: {
        street: "",
        woreda_id: "",
        house_number: "",
        email: "",
        phone_1: "",
        phone_2: "",
      },
      motto: "",
      clinicType: "",
      number_of_branch: 1,
      branch_list: [],
      clinc_working_hours: [],
    },
    resolver: yupResolver(schema),
  });
  const DateOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  console.log(errors);
  const onSubmit = async (data) => {
    console.log(data);
    return;
    const branch_address = data.branch_list
      .map((b, index) => `address of brach ${index + 2} : ${b}\n`)
      .join(",");
    // console.log(branch_address);
    // return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    formData.append("card_valid_date", data.card_valid_date);
    formData.append("website_url", data.website_url);
    formData.append("address", JSON.stringify(data.address));
    formData.append("motto", data.motto);
    formData.append("clinicType", data.clinicType);
    formData.append("number_of_branch", data.number_of_branch);
    formData.append("branch_address", branch_address);
    formData.append("brand_color", data.brand_color);
    formData.append("has_triage", data.has_triage);
    formData.append(
      "clinc_working_hours",
      JSON.stringify(data.clinc_working_hours)
    );

    mutate(formData);
  };

  const number_of_branch = watch("number_of_branch");
  const timeFormat = watch("time_format");
  console.log(typeof timeFormat);
  function numberToArray(n) {
    return Array(Math.abs(n)).fill(n);
  }
  const arrayBranch = numberToArray(Number(number_of_branch));

  return (
    <Container className="p-3  mb-5">
      <div className=" bg-hrun-box hrunboxshadow">
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Basic Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group controlId="name">
                <Form.Label>Clinic Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  isInvalid={errors.name}
                />

                <Form.Control.Feedback type="invalid" className="text-small">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Logo</Form.Label>
                <div className="d-flex align-items-center justify-content-between gap-4 p-1">
                  <Form.Control
                    type="file"
                    className="border-1"
                    accept="image/png, image/jpeg"
                    // onChange={handleImageChange}
                    id="logo"
                    name="logo"
                    // {...register("logo")}
                    //ref={ref}
                    {...register("logo", {
                      onChange: (e) =>
                        setPreviewImage(URL.createObjectURL(e.target.files[0])),
                    })}
                    isInvalid={errors.logo}
                  />
                  <Form.Control.Feedback type="invalid" className="text-small">
                    {errors.logo?.message}
                  </Form.Control.Feedback>
                  <div>
                    {getValues("logo")?.length === 1 && (
                      <Image
                        src={previewImage}
                        /* {previewImage} */ width={30}
                        height={10}
                        fluid
                      />
                    )}
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>Clinic Type</Form.Label>
                <Form.Select
                  {...register("clinicType")}
                  isInvalid={errors.clinicType}
                >
                  <option value="">select type</option>
                  <option value="general">General</option>
                  <option value="eye">Eye</option>
                  <option value="medium">Medium</option>
                </Form.Select>

                <Form.Text className="text-danger">
                  {errors.clinicType?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  {...register("website_url")}
                  isInvalid={errors.website_url}
                />
                {errors.website_url && (
                  <Form.Text className="text-danger">
                    {errors.website_url?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={2} sm={6} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>Brand Color</Form.Label>
                <Form.Control
                  type="color"
                  className="w-100"
                  {...register("brand_color")}
                  isInvalid={errors.brand_color}
                  defaultValue="#000000"
                />

                <Form.Text className="text-danger">
                  {errors.brand_color?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={2} sm={6} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>has trainge</Form.Label>
                <Form.Check
                  type="checkbox"
                  // label="has trainge"
                  className="w-100"
                  {...register("has_triage")}
                  isInvalid={errors.has_triage}
                  // defaultValue="#000000"
                />

                <Form.Text className="text-danger">
                  {errors.has_triage?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>Motto</Form.Label>
                <Form.Control
                  type="text"
                  className="w-100"
                  {...register("motto")}
                  isInvalid={errors.motto}
                />

                <Form.Text className="text-danger">
                  {errors.motto?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="phone">
                <Form.Label>card_valid_date</Form.Label>
                <Form.Control
                  type="number"
                  {...register("card_valid_date")}
                  isInvalid={errors.card_valid_date}
                />
                {errors.card_valid_date && (
                  <Form.Text className="text-danger">
                    {errors.card_valid_date?.message}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Number of Brach</Form.Label>
                <Form.Control
                  type="number"
                  className="w-100"
                  {...register("number_of_branch")}
                  isInvalid={errors.number_of_branch}
                  min="1"
                />

                <Form.Text className="text-danger">
                  {errors.number_of_branch?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            {arrayBranch.length > 1 &&
              arrayBranch.splice(1).map((field, index) => {
                return (
                  <Col key={index} md={4} sm={12} className="mb-2">
                    <Form.Group>
                      <Form.Label>Branch {index + 2} Address</Form.Label>
                      <Form.Control
                        type="text"
                        className="w-100"
                        key={field.id} // important to include key with field's id
                        {...register(`branch_list.${index}`)}
                        // isInvalid={errors.number_of_branch}
                      />
                    </Form.Group>
                  </Col>
                );
              })}
          </Row>

          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Address Information
          </h6>
          <Row>
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

                <Form.Select
                  {...register("address.woreda_id")}
                  isInvalid={errors.address?.woreda_id}
                >
                  <option value="">Select Woreda</option>
                  {woredas?.map((woreda, index) => (
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
                <Form.Control
                  type="text"
                  {...register("address.street")}
                  isInvalid={errors.address?.street}
                />
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="number"
                  {...register("address.house_number")}
                  isInvalid={errors.address?.house_number}
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
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Clinic Working Hour
          </h6>
          <Row>
            {DateOfWeek.map((d, index) => (
              <Col key={index} md={6} sm={12} className="mb-2">
                <Form.Label className="fw-bold">{d}</Form.Label>
                <Row>
                  <input
                    type="text"
                    hidden
                    {...register(`clinc_working_hours[${index}].date_of_week`)}
                    value={d}
                  />
                  <Col>
                    <Form.Group

                    // className="mb-3 d-flex align-items-center gap-2"
                    >
                      <Form.Label style={{ fontSize: 13 }}>
                        Start Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        {...register(
                          `clinc_working_hours[${index}].start_time`,
                          {}
                        )}
                        isInvalid={
                          errors?.clinc_working_hours?.[index]?.start_time
                        }
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ fontSize: 10 }}
                      >
                        {
                          errors?.clinc_working_hours?.[index]?.start_time
                            ?.message
                        }
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                    // controlId="floatingInput"
                    // className="mb-3 d-flex align-items-center gap-2"
                    >
                      <Form.Label
                        style={{ fontSize: 13 }}
                        className="text-nowrap"
                      >
                        End Time
                      </Form.Label>
                      <Form.Control
                        type="time"
                        {...register(`clinc_working_hours[${index}].end_time`)}
                        isInvalid={
                          errors?.clinc_working_hours?.[index]?.end_time
                        }
                        // defaultValue="08:00:00"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        style={{ fontSize: 10 }}
                        // className="small"
                      >
                        {
                          errors?.clinc_working_hours?.[index]?.end_time
                            ?.message
                        }
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* <Form.Group>
                      <Form.Control
                        type="text"
                        {...register(`clinc_working_hours[${index}].end_time`)}
                        isInvalid={
                          errors?.clinc_working_hours?.[index]?.end_time
                        }
                        placeholder="end time"
                      />
                    </Form.Group> */}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>

          <Button disabled={isPending} type="submit">
            {isPending && <Spinner animation="border" size="sm" />}{" "}
            <span className="fw-bold fs-lg">+</span> SAVE
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AddClinicInfo;
