import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useGetWoredas } from "../../../../hooks/useGetWoredas";
import { useGetRegions } from "../../../../hooks/useGetRegions";
import { useGetCities } from "../../../../hooks/useGetCities";
import { useGetSubCities } from "../../../../hooks/useGetSubCities";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyEmployeeschema } from "../utils/schema";
import TextInput from "../../../../components/inputs/TextInput";
import { useLocation } from "react-router-dom";
// import { Employeeschema } from "../utils/schema";
import { useAddCompanyEmployee } from "../hooks/useAddCompanyEmployee";
const AddCompanyEmployeeModal = ({ show, handleClose }) => {
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();

  const { mutateAsync, isPending } = useAddCompanyEmployee();
  const { state } = useLocation();
  console.log(state);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(CompanyEmployeeschema),
  });

  const getMaxYear = (value) => {
    const today = new Date().toISOString().substring(0, 10);
    const date = new Date(today);
    date.setFullYear(date.getFullYear() - value);
    return date.toISOString().substring(0, 10);
  };

  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWacher = watch("address.woreda_id");

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("company_id", state.id);
    formData.append("firstName", data.firstName);
    formData.append("middleName", data.middleName);
    formData.append("lastName", data.lastName);
    formData.append("gender", data.gender);

    formData.append("date_of_birth", data.date_of_birth);
    formData.append("date_of_hire", data.date_of_hire);
    formData.append("position", data.position);

    formData.append("photo", data.photo[0]);
    formData.append("address", JSON.stringify(data.address));
    mutateAsync(formData).then((res) => {
      if (res.status === 201) {
        handleClose();
      }
    });
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Company Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                label=" Father Name"
              />
            </Col>

            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Grandfather Name</Form.Label>
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
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control
                  {...register("photo")}
                  type="file"
                  accept="image/*"
                  name="photo"
                  placeholder="Enter..."
                />
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
                <Form.Control.Feedback type="invalid">
                  {errors.date_of_birth?.message}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.date_of_hire?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  // ref={genderref}
                  {...register("position")}
                  name="position"
                  type="text"
                  aria-label="Default select example"
                  isInvalid={errors.position}
                >
                  {/* <option value="">Please Select</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Nurse">Nurse</option>
                
                  <option value="Laboratorian">Laboratorian</option>
                  <option value="Other">Other</option> */}
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="small">
                  {errors.position?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Employee Address Information
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

                  {/* <option value="Oromia">Oromia</option>
                <option value="Afar">Afar</option> */}
                </Form.Select>
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
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
              <Form.Group className="mb-3">
                <Form.Label>Subcity</Form.Label>
                <Form.Select
                  // ref={roleref}
                  {...register("address.subcity_id")}
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
              <Form.Group>
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
                <Form.Control.Feedback
                  type="inValid"
                  className="small text-danger"
                >
                  {errors?.address?.woreda_id?.message}
                </Form.Control.Feedback>
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
              </Form.Group>
            </Col>
          </Row>

          <Modal.Footer className="pb-0">
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCompanyEmployeeModal;
