import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { useAddCreditCompany } from "./hooks/useAddCreditCompany";
const companySchema = yup.object().shape({
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Company Name is required"),
  //   email: yup.string().email("Invalid Email").required("Email is required"),
  //   phone: yup
  //     .string()
  //     .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
  //     .required("Phone Number is required"),
  tin: yup
    .string()
    .matches(/^\d{9}$/, "TIN number must be a 9-digit number")
    .required("TIN is required"),
  representative_name: yup.string().required("Representative Name is required"),
  // representative_email : yup.string().email("Invalid Email").required("Email is required"),
  representative_phone: yup
    .string()
    .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    .required("Phone Number is required"),
  // representative_tin : yup.string().matches(/^\d{9}$/,"TIN number must be a 9-digit number").required("TIN is required"),
  address: yup.object().shape({
    street: yup.string(),
    region_id: yup.string().required("Region is required"),
    city_id: yup.string().required("City is required"),
    subcity_id: yup.string().required("Subcity is required"),
    woreda_id: yup.string().required("Woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid Email").required("Email is required"),
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
  agreement: yup.object().shape({
    start_date: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return undefined; // Return undefined for empty string
        }
        return value;
      })

      .nullable()
      .required("Start date is required"),
    end_date: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue === "") {
          return undefined; // Return undefined for empty string
        }
        return value;
      })

      .nullable()
      .required("End date is required"),
    // agreement_doc: yup.mixed().required("Agreement Document is required"),

    //   .required("File is required"),
    max_limit: yup
      .number()
      .typeError("Credit limit must be a valid number")
      .moreThan(0, "Credit limit must be greater than 0"),
  }),
  agreement_doc: yup
    .mixed()
    .test(
      "conditionalRequired",
      "Agreement Document is required",
      function (value) {
        console.log(value.length);
        //   if (Array.isArray(value) && value.length > 0 && value[0] === "") {
        if (value.length == 0) {
          return this.createError({
            path: "agreement.agreement_doc",
            message: "Agreement Document is required",
          });
        }
        return true;
      }
    )
    .nullable(),
});
const CreateCreditCompanyModal = ({ show, handleClose }) => {
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(companySchema),
  });
  console.log(errors);
  const { mutateAsync, isPending } = useAddCreditCompany();
  //   const [previewImage, setPreviewImage] = useState(null);
  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWatcher = watch("address.woreda_id");

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tin", data.tin);
    formData.append("representative_name", data.representative_name);
    formData.append("representative_email", data.representative_email);
    formData.append("representative_phone", data.representative_phone);
    formData.append("address", JSON.stringify(data.address));
    formData.append("agreement", JSON.stringify(data.agreement));
    formData.append("agreement_doc", data.agreement_doc[0]);
    console.log(data);
    mutateAsync(formData).then((res) => {
      if (res.status === 201) {
        handleClose(false);
      }
    });
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Credit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
          Company Information
        </h6>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company Name"
                  {...register("name")}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.name?.message}
                </Form.Control.Feedback>
              </Form.Group>{" "}
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example@example.com"
                  {...register("address.email")}
                  isInvalid={errors.address?.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("address.phone_1")}
                  isInvalid={errors.address?.phone_1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.phone_1?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone")}
                  isInvalid={errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.phone?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>TIN Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="TIN Number"
                  {...register("tin")}
                  isInvalid={errors.tin}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.tin?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Representative Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Representative Name"
                  {...register("representative_name")}
                  isInvalid={errors.representative_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.representative_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-3">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Representative Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="09/07********"
                  {...register("representative_phone")}
                  isInvalid={errors.representative_phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.representative_phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* <Col md={4} sm={12} className="mb-2"></Col>
            <Col md={4} sm={12} className="mb-2"></Col> */}
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Company Address Information
          </h6>
          <Row>
            {/* <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("address.phone_1")}
                  isInvalid={errors.address?.phone_1}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                {errors?.address?.phone_1?.message}
              </Form.Control.Feedback>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("address.email")}
                  placeholder="example@example.com"
                  isInvalid={errors.address?.email}
                />
                <Form.Control.Feedback type="inVvalid">
                  {errors?.address?.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col> */}
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Region</Form.Label>
                <Form.Select
                  {...register("address.region_id", {
                    onChange: () => {
                      // setValue("address.city_id",null);
                      SubCityAddressWatcher &&
                        setValue("address.subcity_id", "");
                      AddressWoredaWatcher && setValue("address.woreda_id", "");
                    },
                  })}
                  aria-label="Default select example"
                  isInvalid={errors.address?.region_id}
                >
                  <option value="">Please Select</option>
                  {regions?.map((region, index) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}

                  {/* <option value="Oromia">Oromia</option>
                <option value="Afar">Afar</option> */}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.region_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>City</Form.Label>
                <Form.Select
                  // ref={roleref}
                  {...register("address.city_id", {
                    onChange: () => {
                      SubCityAddressWatcher &&
                        setValue("address.subcity_id", "");
                      AddressWoredaWatcher && setValue("address.woreda_id", "");
                    },
                  })}
                  aria-label="Default select example"
                  isInvalid={errors.address?.city_id}
                >
                  <option value="">Please Select</option>
                  {cities
                    ?.filter((city) => city.region_id == AddressregionWatcher)
                    .map((c, index) => (
                      <option key={c.name} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors?.address?.city_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Subcity</Form.Label>
                <Form.Select
                  // ref={roleref}
                  {...register("address.subcity_id", {
                    onChange: () => {
                      AddressWoredaWatcher && setValue("address.woreda_id", "");
                    },
                  })}
                  aria-label="Default select example"
                  isInvalid={errors.address?.subcity_id}
                  // defaultValue="1"
                >
                  <option value="">Please Select</option>
                  {subcities
                    ?.filter((subcity) => subcity.city_id == AddresscityWatcher)
                    .map((sc, index) => (
                      <option key={sc.Subcity_name + sc.id} value={sc.id}>
                        {sc.Subcity_name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.subcity_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Woreda</Form.Label>

                <Form.Select
                  {...register("address.woreda_id")}
                  isInvalid={errors.address?.woreda_id}
                >
                  <option value="">Please Select</option>
                  {woredas
                    ?.filter((w) => w.subCity_id == SubCityAddressWatcher)
                    ?.map((woreda, index) => (
                      <option key={index} value={woreda.id}>
                        {woreda.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.woreda_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>House Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address.house_number")}
                  isInvalid={errors.address?.house_number}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.house_number?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address.street_name")}
                  isInvalid={errors.address?.street_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.street_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Alternative Phone</Form.Label>
                <Form.Control
                  type="number"
                  {...register("address.phone_2")}
                  isInvalid={errors.address?.phone_2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.phone_2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Agreement Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  {...register("agreement.start_date")}
                  isInvalid={errors.agreement?.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.agreement?.start_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  {...register("agreement.end_date")}
                  isInvalid={errors.agreement?.end_date}
                  min={new Date().toISOString().substring(0, 10)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.agreement?.end_date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Agreement Doc</Form.Label>
                <Form.Control
                  {...register("agreement_doc")}
                  type="file"
                  name="agreement_doc"
                  accept=".pdf,.doc,.docx"
                  //   required={true}
                  isInvalid={errors.agreement_doc}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.agreement_doc?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-md-3 mb-1">
                <Form.Label>Maximum Credit Limit</Form.Label>
                <Form.Control
                  {...register("agreement.max_limit")}
                  type="number"
                  step="0.01"
                  min={0}
                  isInvalid={errors.agreement?.max_limit}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.agreement?.max_limit?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer className="mb-0 pb-0">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              //   disabled={isPending}
              //   onClick={() => handleClose(false)}
            >
              {/* {isPending && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )} */}
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCreditCompanyModal;
