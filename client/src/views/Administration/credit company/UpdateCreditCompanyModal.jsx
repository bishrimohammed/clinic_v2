import React from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { format } from "date-fns";
import { useUpdateCreditCompany } from "./hooks/useUpdateCreditCompany";
const companySchema = yup.object().shape({
  id: yup.number(),
  name: yup
    .string()
    .transform((value) => value.trim())
    .required("Company Name is required"),
  tin: yup

    .number()
    .integer()
    .typeError("TIN must be a number")
    .positive("TIN must be a positive number")
    .test(
      "is-ten-digits",
      "TIN must be a 10-digit number",
      (value) => value.toString().length === 10
    )

    .required("TIN is required"),
  representative_name: yup.string().required("Representative Name is required"),
  representative_phone: yup
    .string()
    .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    .required("Phone Number is required"),
  address: yup.object().shape({
    id: yup.number(),
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
    id: yup.number(),
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
      .when("start_date", ([start_date], schema) => {
        if (start_date) {
          return schema.min(start_date, "End date must be after start date");
        }
        return schema;
      })
      .nullable()
      .required("End date is required"),
    max_limit: yup
      .number()
      .typeError("Credit limit must be a valid number")
      .moreThan(0, "Credit limit must be greater than 0"),
  }),
  agreement_doc: yup
    .mixed()

    .nullable(),
});
const UpdateCreditCompanyModal = ({ show, handleClose, company }) => {
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();
  const { mutateAsync, isPending } = useUpdateCreditCompany();
  const {
    register,
    formState: { errors },
    watch,
    setError,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: company.id,
      name: company.name,
      tin: company.tin,
      representative_name: company.representative_name,
      representative_phone: company.representative_phone,
      address: {
        id: company.address.id,
        street: company.address.street_name,
        region_id: company.address.woreda.SubCity.city.region.id,
        city_id: company.address.woreda.SubCity.city.id,
        subcity_id: company.address.woreda.SubCity.id,
        woreda_id: company.address.woreda.id,
        house_number: company.address.house_number,
        email: company.address.email,
        phone_1: company.address.phone_1,
        phone_2: company.address.phone_2,
      },
      agreement: {
        id: company.agreements[0].id,
        start_date: format(company.agreements[0].start_date, "yyyy-MM-dd"),
        end_date: format(company.agreements[0].end_date, "yyyy-MM-dd"),
        max_limit: company.agreements[0].max_limit,
      },
    },
    resolver: yupResolver(companySchema),
  });
  // console.log(company);
  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWatcher = watch("address.woreda_id");
  // console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tin", data.tin);
    formData.append("representative_name", data.representative_name);
    formData.append("representative_email", data.representative_email);
    formData.append("representative_phone", data.representative_phone);
    formData.append("address", JSON.stringify(data.address));
    formData.append("agreement", JSON.stringify(data.agreement));
    formData.append("agreement_doc", data.agreement_doc[0]);
    // console.log(data);
    mutateAsync({ formData, companyId: company.id })
      .then((res) => {
        if (res.status === 200) {
          handleClose(false);
        }
      })
      .catch((err) => {
        // console.log(err);
        const errors = err.response.data.message;
        if (Array.isArray(errors)) {
          errors.map((err) => {
            const msg = err.message;
            console.log(err.message);
            // setError(err.path, msg.join(""));
            setError(
              err.path === "phone_1" ? "address.phone_1" : "address.email",
              {
                type: "server",
                message: err.message,
                shouldFocus: true,
              }
            );
          });
        }
      });
  };
  return (
    <Modal size="lg" show={show} onHide={() => handleClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Company Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                  type="number"
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
              disabled={isPending}
              //   onClick={() => handleClose(false)}
            >
              {isPending && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => handleClose(false)}>Close</Button>
        <Button onClick={() => handleClose(false)}>Update</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default UpdateCreditCompanyModal;
