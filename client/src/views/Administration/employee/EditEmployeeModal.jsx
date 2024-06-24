import React, { useState } from "react";
// import { Button,  } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import "./employee.css";
// import React from "react";
import {
  Button,
  Modal,
  Col,
  Spinner,
  Row,
  Form,
  Image,
  Alert,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextInput from "../../../components/inputs/TextInput";
import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { Employeeschema, EditEmployeeschema } from "./utils/schema";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { useEditEmployee } from "./hooks/useEditEmployee";
import { Host_URL } from "../../../utils/getHost_URL";
const EditEmployeeModal = ({ empoyeeData, show, handleClose }) => {
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();
  const { mutateAsync, isPending, error } = useEditEmployee();
  const [showImage, setShowImage] = useState("");
  console.log(empoyeeData);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      firstName: empoyeeData.firstName,
      lastName: empoyeeData.lastName,
      middleName: empoyeeData.middleName,
      position: empoyeeData.position,
      other_position: empoyeeData?.other_position
        ? empoyeeData.other_position
        : "",

      gender: empoyeeData.gender,
      date_of_birth: empoyeeData.date_of_birth,
      date_of_hire: empoyeeData.date_of_hire,
      addressId: empoyeeData.address_id,
      address: {
        id: empoyeeData.address.id,
        phone_1: empoyeeData.address.phone_1,
        phone_2: empoyeeData.address.phone_2,
        region_id: empoyeeData.address?.woreda?.SubCity?.city?.region?.id,
        city_id: empoyeeData.address?.woreda?.SubCity?.city?.id,
        subcity_id: empoyeeData.address?.woreda?.SubCity?.id,
        woreda_id: empoyeeData.address?.woreda?.id,
        email: empoyeeData.address?.email || "",
        house_number: empoyeeData.address?.house_number || "",
      },
      Emergency: {
        id: empoyeeData.emergencyContact.id,
        phone: empoyeeData.emergencyContact.phone,
        addressId: empoyeeData.emergencyContact?.address_id,
        firstName: empoyeeData.emergencyContact?.firstName,
        lastName: empoyeeData.emergencyContact?.lastName,
        middleName: empoyeeData.emergencyContact?.middleName,
        relation: empoyeeData.emergencyContact.relationship,
        other_relation: empoyeeData.emergencyContact?.other_relationship || "",

        the_same_address_as_employee:
          empoyeeData.emergencyContact?.address_id === empoyeeData.address_id,
        // phone_1: empoyeeData.emergencyContact.address.phone_1,
        // phone_2: empoyeeData.emergencyContact.address.phone_2,
        region_id:
          empoyeeData.emergencyContact.address?.woreda?.SubCity?.city?.region
            ?.id,
        city_id:
          empoyeeData.emergencyContact.address?.woreda?.SubCity?.city?.id,
        subcity_id: empoyeeData.emergencyContact.address?.woreda?.SubCity?.id,
        woreda_id: empoyeeData.emergencyContact.address?.woreda?.id,
        house_number: empoyeeData.emergencyContact.address?.house_number || "",
      },
    },
    resolver: yupResolver(EditEmployeeschema),
  });
  // const [showImage, setShowImage] = useState(null);
  // console.log(errors);
  const submitHandler = (data) => {
    // console.log(data);
    // return;
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);
    // formData.append("position", data.position);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("date_of_hire", data.date_of_hire);
    formData.append("position", data.position);
    formData.append(
      "other_position",
      data.position === "Other" ? data.other_position : ""
    );
    formData.append("photo", data.photo[0]);
    formData.append("digital_signature", data.digital_signature[0]);
    formData.append("address", JSON.stringify(data.address));
    formData.append("Emergency", JSON.stringify(data.Emergency));
    // console.log(formData);
    mutateAsync({ formData, id: empoyeeData.id }).then((res) => {
      if (res.status === 200) {
        handleClose();
      }
    });
  };
  console.log(errors);
  const getMaxYear = (value) => {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - value);
    return date.toISOString().substring(0, 10);
  };
  const positionWatcher = watch("position");
  const theSameAddressASEmpl = watch("Emergency.the_same_address_as_employee");
  const realationwacher = watch("Emergency.relation");
  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWacher = watch("address.woreda_id");
  const AddressHouseNumberWatcher = watch("address.house_number");
  // console.log(AddressHouseNumberWatcher);
  // console.log(woredas.filter((w) => w.id === AddressWoredaWacher)[0]?.name);
  const EmergencyregionWatcher = watch("Emergency.region_id");
  const EmergencycityWatcher = watch("Emergency.city_id");
  const EmergencySubCityWatcher = watch("Emergency.subcity_id");
  let EmergencySection;
  let EmergenceNewAddress;
  if (theSameAddressASEmpl) {
    EmergencySection = (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.region_id")}
              aria-label="Default select example"
              value={
                regions.filter((r) => r.id === AddressregionWatcher)[0]?.name
              }
            >
              {/* <option value="">please select</option>
              {regions?.map((region, index) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))} */}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.city_id")}
              aria-label="Default select example"
              value={
                cities.filter((city) => city.id == AddresscityWatcher)[0]?.name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Subcity</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.subcity_id")}
              name="role"
              aria-label="Default select example"
              value={
                subcities.filter(
                  (subcity) => subcity.id == SubCityAddressWatcher
                )[0]?.Subcity_name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Woreda</Form.Label>

            <Form.Control
              disabled={true}
              // {...register("address.woreda_id")}
              // isInvalid={errors.address?.woreda_id}
              value={
                woredas.filter((w) => w.id === AddressWoredaWacher)[0]?.name
              }
            >
              {/* <option value="">Select Woreda</option>
              {woredas?.map((woreda, index) => (
                <option key={index} value={woreda.id}>
                  {woreda.name} {woreda.SubCity?.Subcity_name}
                </option>
              ))} */}
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              // {...register("address.house_number")}
              value={AddressHouseNumberWatcher}
              // isInvalid={errors.address?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  } else {
    EmergenceNewAddress = (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("Emergency.region_id")}
              isInvalid={errors.Emergency?.region_id}
              aria-label="Default select example"
            >
              <option value="">Please Select</option>
              {regions?.map((region, index) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.Emergency?.region_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("Emergency.city_id")}
              aria-label="Default select example"
              isInvalid={errors.Emergency?.city_id}
            >
              <option value="">Please Select</option>
              {cities
                ?.filter((city) => city.region_id == EmergencyregionWatcher)
                .map((c, index) => (
                  <option key={c.name} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.Emergency?.city_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Subcity</Form.Label>
            <Form.Select
              {...register("Emergency.subcity_id")}
              aria-label="Default select example"
              isInvalid={errors.Emergency?.subcity_id}
            >
              <option value="">Please Select</option>
              {subcities
                ?.filter((subcity) =>
                  AddresscityWatcher
                    ? subcity.city_id == EmergencycityWatcher
                    : subcity
                )
                .map((sc, index) => (
                  <option key={sc.Subcity_name + sc.id} value={sc.id}>
                    {sc.Subcity_name}
                  </option>
                ))}
              {/* <option>Select role</option> */}
              {/* <option value="Bole">Bole</option>
              <option value="lideta">lideta</option>
              <option value="kirkos">kirkos</option>
              <option value="aba_gada">Aba Gada</option>
              <option value="lugo">Lugo</option>
              <option value="bole">Bole</option>
              <option value="boku">Boku</option>
              <option value="dabe">Dabe</option>
              <option value="dembala">Dembala</option>
              <option value="tana">Tana</option>
              <option value="facilo">Facilo</option>
              <option value="gish_abay">Gish Abay</option>
              <option value="atse_tewodros">Atse Tewodros</option>
              <option value="dagmawi_menelek">Dagmawi Menelek</option>
              <option value="belayzelk">Belayzelk </option> */}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors?.Emergency?.subcity_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Woreda</Form.Label>

            <Form.Select
              {...register("Emergency.woreda_id")}
              isInvalid={errors.Emergency?.woreda_id}
            >
              <option value="">Please Select</option>
              {woredas
                ?.filter((w) => w.subCity_id == EmergencySubCityWatcher)
                ?.map((woreda, index) => (
                  <option key={index} value={woreda.id}>
                    {woreda.name} {woreda.SubCity?.Subcity_name}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.Emergency?.woreda_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              {...register("Emergency.house_number")}
              isInvalid={errors.Emergency?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  }
  const changeImageHandler = (img_url) => {
    if (img_url == showImage) {
      setShowImage("");
    } else {
      setShowImage(String(img_url));
    }
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {/* <h4 className="mb-3 p-2"></h4> */}
          {showImage && (
            <div className="diplay-image d-flex justify-content-center mb-2 ">
              <div className="image-container  ">
                <img
                  src={Host_URL + showImage}
                  alt=""
                  fluid
                  className="image img-fluid thumbnail"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  // width="1000"
                  height={200}
                  width="300"
                />
                <span onClick={() => setShowImage("")}>X</span>
              </div>
            </div>
          )}

          <Form
            onSubmit={handleSubmit(submitHandler)}
            encType="multipart/form-data"
          >
            <Row>
              <Col md={4} sm={12}>
                <TextInput
                  errors={errors.firstName}
                  name="firstName"
                  register={register}
                  label="Name"
                />
              </Col>

              <Col md={4} sm={12}>
                <TextInput
                  errors={errors.middleName}
                  name="middleName"
                  register={register}
                  label="Father's Name"
                />
              </Col>

              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Grandfather's Name</Form.Label>
                  <Form.Control
                    {...register("lastName")}
                    name="lastName"
                    id="lastName"
                    type="text"
                    placeholder="Enter..."
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    // ref={genderref}
                    {...register("gender")}
                    name="gender"
                    aria-label="Default select example"
                    isInvalid={errors.gender}
                  >
                    <option value="">Please Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.gender?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <div className="d-flex align-items-center justify-content-between gap-2 ">
                    <Form.Control
                      {...register("photo")}
                      type="file"
                      name="photo"
                      accept="image/*"
                      placeholder="Enter..."
                      className="flex-grow-1"
                    />
                    {empoyeeData.photo && (
                      <div
                        onClick={() => changeImageHandler(empoyeeData?.photo)}
                      >
                        <Image
                          src={Host_URL + empoyeeData?.photo}
                          /* {previewImage} */ width={30}
                          height={30}
                          roundedCircle
                          // fluid
                          // className="object-fit"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Employee Signature</Form.Label>
                  <div className="d-flex align-items-center justify-content-between gap-2 ">
                    <Form.Control
                      {...register("digital_signature")}
                      type="file"
                      accept="image/*"
                      name="digital_signature"
                    />
                    {empoyeeData.digital_signature && (
                      <div
                        onClick={() =>
                          changeImageHandler(empoyeeData?.digital_signature)
                        }
                      >
                        <Image
                          src={Host_URL + empoyeeData?.digital_signature}
                          /* {previewImage} */ width={30}
                          height={30}
                          roundedCircle
                          // fluid
                          // className="object-fit"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group>
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("date_of_birth")}
                    // defaultValue={getMaxYear(18)}
                    // min={getMaxYear(18)}
                    // max={new Date().toISOString().substring(0, 10)}
                    max={getMaxYear(18)}
                    isInvalid={errors.date_of_birth}
                  />
                </Form.Group>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group>
                  <Form.Label>Date of Hire</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("date_of_hire")}
                    max={new Date().toISOString().substring(0, 10)}
                    isInvalid={errors.date_of_hire}
                  />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  {errors?.date_of_hire?.message}
                </Form.Control.Feedback>
              </Col>
              <Col md={4} sm={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Position</Form.Label>
                  <Form.Select
                    // ref={genderref}
                    // type="text"
                    {...register("position")}
                    name="position"
                    aria-label="Default select example"
                    isInvalid={errors.position}
                  >
                    <option value="">Please Select</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Laboratorian">Laboratorian</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.position?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {positionWatcher === "Other" && (
                <Col md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Position</Form.Label>
                    <Form.Control
                      {...register("other_position")}
                      name="other_position"
                      id="other_position"
                      type="text"
                      placeholder="Enter..."
                    />
                    <Form.Control.Feedback type="invalid" className="small">
                      {errors.other_position?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              {/* <Col md={4} sm={12}></Col> */}
            </Row>

            <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
              Home Address Information
            </h6>
            <Row>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="test"
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
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("address.email")}
                    placeholder="example@example.com"
                    isInvalid={errors.address?.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.address?.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    {...register("address.region_id")}
                    aria-label="Default select example"
                    isInvalid={errors.address?.region_id}
                  >
                    <option value="">Please Select</option>
                    {regions?.map((region, index) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.address?.region_id?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    // ref={roleref}
                    {...register("address.city_id")}
                    aria-label="Default select example"
                    isInvalid={errors.address?.city_id}
                  >
                    <option value="">please select</option>
                    {cities
                      ?.filter((city) => city.region_id == AddressregionWatcher)
                      .map((c, index) => (
                        <option key={c.name} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.address?.city_id?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Subcity</Form.Label>
                  <Form.Select
                    // ref={roleref}
                    {...register("address.subcity_id")}
                    aria-label="Default select example"
                    isInvalid={errors.address?.subcity_id}
                    // defaultValue="1"
                  >
                    <option value="">please select</option>
                    {subcities
                      ?.filter(
                        (subcity) => subcity.city_id == AddresscityWatcher
                      )
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
                <Form.Group>
                  <Form.Label>Woreda</Form.Label>

                  <Form.Select
                    {...register("address.woreda_id")}
                    isInvalid={errors.address?.woreda_id}
                  >
                    <option value="">Select Woreda</option>
                    {woredas
                      ?.filter((w) => w.subCity_id == SubCityAddressWatcher)
                      ?.map((woreda, index) => (
                        <option key={index} value={woreda.id}>
                          {woreda.name} {woreda.SubCity?.Subcity_name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
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
            </Row>

            <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
              Emergency Contact Information
            </h6>
            <Row>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("Emergency.firstName")}
                    isInvalid={errors.Emergency?.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Emergency?.firstName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("Emergency.middleName")}
                    isInvalid={errors.Emergency?.middleName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Emergency?.middleName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Grandfather Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("Emergency.lastName")}
                    isInvalid={errors.Emergency?.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Emergency?.lastName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Relationship</Form.Label>
                  <Form.Select
                    // type="text"
                    {...register("Emergency.relation")}
                    aria-label="Default select example"
                    isInvalid={errors.Emergency?.relation}
                  >
                    {/* <option>Select role</option> */}
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.Emergency?.relation?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {realationwacher === "Other" && (
                <Col md={4} sm={12} className="mb-2">
                  <Form.Group className="mb-3">
                    <Form.Label>Relationship Type</Form.Label>
                    <Form.Control
                      {...register("Emergency.other_relation")}
                      aria-label="Default select example"
                      isInvalid={errors.Emergency?.other_relation}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors?.Emergency?.other_relation?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("Emergency.phone")}
                    placeholder="09/07********"
                    isInvalid={errors.Emergency?.phone}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.Emergency?.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4} sm={12} className="mb-2">
                <Form.Group>
                  <Form.Label>Same Address as Employee</Form.Label>
                  <Form.Check
                    type="checkbox"
                    // placeholder="09/07********"
                    {...register("Emergency.the_same_address_as_employee")}
                    // isInvalid={errors.address?.phone_1}
                  />
                </Form.Group>
                {/* <Form.Control.Feedback type="inValid" className="small text-danger">
              {errors?.address?.phone_1?.message}
            </Form.Control.Feedback> */}
              </Col>
              {theSameAddressASEmpl ? EmergencySection : EmergenceNewAddress}
            </Row>
            {error && (
              <div className="error mt-2 ">
                <Alert variant="danger" dismissible={true}>
                  {error?.response?.data?.message}
                </Alert>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-end gap-3">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" disabled={isPending} type="submit">
                {isPending && <Spinner animation="border" size="sm" />}
                Update
              </Button>
            </div>
          </Form>
        </>
      </Modal.Body>
    </Modal>
  );
};

export default EditEmployeeModal;
