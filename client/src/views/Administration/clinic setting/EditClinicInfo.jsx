import { useForm } from "react-hook-form";
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
} from "react-bootstrap";
import { useState } from "react";

// import { useAddClinicInfo } from "./hooks/useAddClinicInfo";

import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { useLocation } from "react-router-dom";
import { useUpdateClinicProfile } from "./hooks/useUpdateClinicProfile";
import { Host_URL } from "../../../utils/getHost_URL";
import { useGetClinicInformation } from "./hooks/useGetClinicInformation";

const schema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Name is required"),
  // has_triage: yup.boolean().required(""),
  logo: yup.mixed().required("Please select an image file"),
  card_valid_date: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("Card validity date is required"),
  website_url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Invalid url!"
    ),
  has_triage: yup.boolean(),
  address: yup.object().shape({
    id: yup.number(),
    street: yup.string().required("street is required"),
    woreda_id: yup
      .string()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("woreda is required"),
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

  motto: yup.string().transform((value) => value.trim()),
  clinicType: yup.string(),
  number_of_branch: yup
    .number()
    .max(20, "Branch Number Must be less than 20")
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
      id: yup.number(),
      day_of_week: yup.string(),
      start_time: yup.string().required("Start time is required"),
      end_time: yup
        .string()
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
const EditClinicInfo = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate, isPending } = useUpdateClinicProfile();
  const {
    data: state,
    isPending: ispending,
    error,
  } = useGetClinicInformation();
  // console.log(state);
  const { data: woredas } = useGetWoredas();
  // const { state } = useLocation();
  // console.log(state);
  const convertStringToArray = (value) => {
    // const string =
    //   "address of branch 2: adama, address of branch 3: jamo, address of branch 4: mex";
    if (!value) {
      return [];
    }
    const regex = /:\s([^,]+)/g;
    const matches = value?.match(regex);
    const addressArray = matches.map((match) => match.split(": ")[1]);
    return addressArray;
  };
  // console.log(state);
  // return;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number_of_branch: state?.number_of_branch,
      branch_list: convertStringToArray(state?.branch_addresses),
      has_triage: state?.has_triage,
      address: {
        woreda_id: state?.address.woreda_id,
      },
    },
    resolver: yupResolver(schema),
  });
  // console.log("state?.has_triage : " + state?.has_triage);
  // console.log(watch("has_triage"));
  function numberToArray(n) {
    return n && Array(Math.abs(n)).fill(n);
  }

  if (ispending) return <div>loading....</div>;
  const number_of_branch = watch("number_of_branch");
  // console.log(number_of_branch);
  const arrayBranch = numberToArray(Number(number_of_branch));

  // console.log(state);

  const onSubmitHandler = async (data) => {
    // console.log(data.branch_list);

    const branch_address = data.branch_list
      .map((b, index) => `address of brach ${index + 2} : ${b}\n`)
      .join(",");
    // console.log(data);
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
    // formData.append("branch_address", branch_address);
    formData.append("brand_color", data.brand_color);
    formData.append("has_triage", data.has_triage);
    formData.append(
      "clinc_working_hours",
      JSON.stringify(data.clinc_working_hours)
    );
    // console.log(data);
    mutate({ formData, id: state?.id });
  };
  if (isPending) return null;
  console.log(errors);
  const ApplyToAllHandler = () => {
    const { clinc_working_hours } = getValues();
    const startTime = clinc_working_hours[0].start_time;
    const endTime = clinc_working_hours[0].end_time;
    clinc_working_hours.forEach((work_hour, index) => {
      if (index !== 0) {
        setValue(`clinc_working_hours[${index}].start_time`, startTime);
        setValue(`clinc_working_hours[${index}].end_time`, endTime);
      }
    });
    // console.log(clinc_working_hours);
  };
  return (
    <Container className="p-3  mb-5">
      {/* <h1>Edit Clinic Profile</h1> */}
      <div className=" bg-hrun-box hrunboxshadow">
        <Form
          onSubmit={handleSubmit(onSubmitHandler)}
          encType="multipart/form-data"
        >
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Basic Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              {" "}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name")}
                  isInvalid={errors.name}
                  defaultValue={state?.name}
                />

                <Form.Control.Feedback type="invalid" className="text-small">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Logo</Form.Label>
                <div className="d-flex align-items-center justify-content-between gap-2 p-1">
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

                  <div className="flex-grow-1 bg-dark">
                    {getValues("logo")?.length === 1 ? (
                      <Image
                        src={previewImage}
                        /* {previewImage} */ width={30}
                        height={30}
                        // thumbnail
                        fluid
                      />
                    ) : (
                      <Image
                        src={Host_URL + state?.logo}
                        /* {previewImage} */
                        width={30}
                        height={30}
                        style={{ objectFit: "cover", objectPosition: "center" }}
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
                  defaultValue={state?.clinic_type}
                  isInvalid={errors.clinicType}
                >
                  <option value="">select type</option>
                  <option value="General">General</option>
                  <option value="Eye">Eye</option>
                  <option value="Medium">Medium</option>
                  <option value="MCH">MCH</option>
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
                  defaultValue={state?.website_url}
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
                  // defaultValue="#000000"
                  defaultValue={state?.brand_color}
                />

                <Form.Text className="text-danger">
                  {errors.brand_color?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={2} sm={6} className="mb-2">
              <Form.Group controlId="website">
                <Form.Label>has Traige</Form.Label>
                <Form.Check
                  type="checkbox"
                  // label="has trainge"
                  defaultChecked={state?.has_triage}
                  className="w-100"
                  {...register("has_triage")}
                  isInvalid={errors.has_triage}
                  // defaultValue={state?.has_triage}
                />
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
                  defaultValue={state?.motto}
                />

                <Form.Text className="text-danger">
                  {errors.motto?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group controlId="phone">
                <Form.Label> Card Validity Days</Form.Label>
                <Form.Control
                  type="number"
                  {...register("card_valid_date")}
                  isInvalid={errors.card_valid_date}
                  defaultValue={state?.card_valid_date}
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
                <Form.Label>Number of Branch</Form.Label>
                <Form.Control
                  type="number"
                  className="w-100"
                  // max={20}
                  {...register("number_of_branch")}
                  isInvalid={errors.number_of_branch}
                  defaultValue={state?.number_of_branch}
                  min="1"
                  // max="20"
                />

                <Form.Text className="text-danger">
                  {errors.number_of_branch?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            {number_of_branch <= 20 &&
              arrayBranch.length > 1 &&
              arrayBranch.splice(1).map((field, index) => {
                return (
                  <Col key={index} md={4} sm={12} className="mb-2">
                    <Form.Group>
                      <Form.Label>Address of Branch {index + 2}</Form.Label>
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
              <input
                type="hidden"
                name=""
                {...register("address.id")}
                defaultValue={Number(state?.address_id)}
              />
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("address.phone_1")}
                  isInvalid={errors.address?.phone_1}
                  defaultValue={state?.address?.phone_1}
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
                  defaultValue={state?.address?.email}
                />
                <Form.Control.Feedback type="invalid">
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
                  defaultValue={state?.address?.woreda_id}
                >
                  <option value="">Select Woreda</option>
                  {woredas?.map((woreda, index) => (
                    <option
                      key={index}
                      value={woreda.id}
                      selected={woreda.id === state?.address?.woreda_id}
                    >
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
                  defaultValue={state?.address?.street}
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
                  defaultValue={state?.address?.house_number}
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
                  defaultValue={state?.address?.phone_2}
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
          <h6 className="border-bottom border-1 border-black py-2 mt-1 mb-3 fw-bold">
            Clinic Working Hour
          </h6>
          <Row>
            {state?.clinicWorkingHours?.map((d, index) => (
              <Col key={index} md={6} sm={12} className="mb-2">
                <div className="d-flex align-items-center gap-3">
                  {" "}
                  <Form.Label className="fw-bold">{d.day_of_week}</Form.Label>
                  {d.day_of_week === "Monday" && (
                    <Form.Check
                      type="switch"
                      label="Apply To All"
                      onChange={(e) => {
                        if (e.target.checked) {
                          ApplyToAllHandler();
                        }
                      }}
                    />
                  )}
                </div>

                <Row>
                  <input
                    type="text"
                    hidden
                    {...register(`clinc_working_hours[${index}].date_of_week`)}
                    value={d.day_of_week}
                  />
                  <input
                    type="number"
                    hidden
                    {...register(`clinc_working_hours[${index}].id`)}
                    value={d.id}
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
                        defaultValue={d.start_time}
                      />
                    </Form.Group>

                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontSize: 10 }}
                    >
                      {
                        errors?.clinc_working_hours?.[index]?.start_time
                          ?.message
                      }
                    </Form.Control.Feedback>
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
                        defaultValue={d.end_time}
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
          <div className="d-flex justify-content-end mt-2">
            <Button variant="primary" disabled={isPending} type="submit">
              {isPending && <Spinner animation="border" size="sm" />}
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditClinicInfo;
