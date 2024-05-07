import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAddPatient } from "../hooks/useAddPatient";

import { patientSchema } from "../utils/patientSchema";

import TextInput from "../../../components/inputs/TextInput";
import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { FaPlus } from "react-icons/fa6";
import CalculateBirthDateModal from "../components/CalculateBirthDateModal";

import { useGetActiveCreditCompanys } from "../hooks/companyHooks/useGetActiveCreditCompanys";
import { useUpdatePatient } from "../hooks/patientHooks/useUpdatePatient";
const PatientForm = ({ patient }) => {
  console.log(patient?.id);
  // console.log(woredas.data);
  const { mutateAsync, isPending } = useAddPatient();
  const updateMutation = useUpdatePatient();
  const { data: companies } = useGetActiveCreditCompanys();

  const [showCalculateBD, setShowCalculateBD] = useState(false);
  const [showNextForm, setShowNextForm] = useState(false);
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: patient
      ? {
          firstName: patient ? patient.firstName : "",
          middleName: patient ? patient.middleName : "",
          lastName: patient ? patient.lastName : "",
          gender: patient ? patient.gender : "",
          birth_date: patient ? patient.birth_date : "",
          has_phone: patient ? patient.has_phone : true,
          phone: patient ? (patient.phone ? patient.phone : "") : "",
          occupation: patient.occupation,
          marital_status: patient.marital_status,
          guardian_name: patient.guardian_name,

          address: {
            id: patient.address_id,
            street: patient?.address?.street ? patient?.address?.street : "",

            region_id: patient?.address?.woreda?.SubCity?.city?.region?.id,
            city_id: patient?.address?.woreda?.SubCity?.city?.id,
            subcity_id: patient?.address?.woreda?.SubCity?.id,
            woreda_id: patient?.address?.woreda?.id,
            house_number: patient?.address?.house_number
              ? patient?.address?.house_number
              : "",
            email: patient?.address?.email ? patient?.address?.email : "",
            phone_1: patient?.address?.phone_1,
            phone_2: patient
              ? patient?.address?.phone_2
                ? patient?.address?.phone_2
                : ""
              : "",
          },
          //   birth_date: new Date().toISOString().substring(0, 10),

          is_new: patient.is_new,
          // manual_card_id: null,
          is_credit: patient ? patient.is_credit : false,
          isUpdate: true,
          // has_phone: true,

          emergency: {
            id: patient ? patient.emergencyContact?.id : undefined,
            firstName: patient ? patient?.emergencyContact?.firstName : "",
            middleName: patient ? patient?.emergencyContact?.middleName : "",
            lastName: patient ? patient?.emergencyContact?.lastName : "",
            relation: patient
              ? ["Spouse", "Father", "Mother"].includes(
                  patient?.emergencyContact?.relationship
                )
                ? patient?.emergencyContact?.relationship
                : "Other"
              : "",
            phone: patient ? patient?.emergencyContact?.phone : "",
            the_same_address_as_patient:
              patient &&
              patient.address_id === patient.emergencyContact?.address?.id,
            other_relation: patient
              ? patient?.emergencyContact?.relationship
              : "",
            region_id: patient
              ? patient?.emergencyContact?.address?.woreda?.SubCity?.city
                  ?.region?.id
              : "",
            city_id: patient
              ? patient?.emergencyContact?.address?.woreda?.SubCity?.city?.id
              : "",
            subcity_id: patient
              ? patient?.emergencyContact?.address?.woreda?.SubCity?.id
              : "",
            woreda_id: patient
              ? patient?.emergencyContact?.address?.woreda?.id
              : "",
          },
          company_id: patient.is_credit ? patient.creditCompany.id : undefined,
          employeeId: patient.is_credit ? patient.employeeId : undefined,
        }
      : undefined,
    resolver: yupResolver(patientSchema),
  });

  console.log(getValues("is_credit"));

  // setValue("birth_date", new Date().toISOString().substring(0, 10));

  const isCredit = watch("is_credit");
  const isNewPatient = watch("is_new");
  const isNewBornWatcher = watch("is_new_born");
  const hasPhoneWatcher = watch("has_phone");
  // const marital_statusWatcher = watch("marital_status");
  console.log("is credit " + isCredit);
  const theSameAddressASPatient = watch(
    "emergency.the_same_address_as_patient"
  );
  const realationwacher = watch("emergency.relation");
  const AddressregionWatcher = watch("address.region_id");
  const AddresscityWatcher = watch("address.city_id");
  const SubCityAddressWatcher = watch("address.subcity_id");
  const AddressWoredaWacher = watch("address.woreda_id");
  const EmergencyregionWatcher = watch("emergency.region_id");
  const EmergencycityWatcher = watch("emergency.city_id");
  const EmergencySubCityWatcher = watch("emergency.subcity_id");

  const companyIdWatcher = watch("company_id");
  const employeeSelectWatcher = watch("employeeId");

  const employees = useMemo(() => {
    return (
      companies?.find((c) => c.id === parseInt(companyIdWatcher))
        ?.companyEmployees || []
    );
  }, [companyIdWatcher]);
  // console.log(employees);
  //   useEffect(() => {
  //     setShowNextForm(isCredit);
  //   }, [isCredit]);
  //   console.log(typeof isNewPatient);
  //   console.log(errors);

  // const age = calulateBirthDatefromAge(20);
  // console.log(age);
  const submitHandler = async (data) => {
    // console.log(data);
    // return;
    const patientData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      gender: data.gender,
      birth_date: data.birth_date,
      has_phone: data.has_phone,
      phone: data.phone,
      marital_status: data.marital_status,
      occupation: data.occupation,
      guardian_name: data.guardian_name,
      is_credit: data.is_credit,
      is_new: data.is_new,
      manual_card_id: data.manual_card_id,
    };
    console.log(patientData);
    const formData = new FormData();
    formData.append("patient", JSON.stringify(patientData));
    formData.append("address", JSON.stringify(data.address));
    formData.append("emergency", JSON.stringify(data.emergency));
    formData.append("company_id", data.company_id);
    formData.append("employeeId", data.employeeId);
    if (data.is_credit) {
      formData.append("employeeId_doc", data.employeeId_doc[0]);
      formData.append("letter_doc", data.letter_doc[0]);
    }
    if (patient) {
      console.log(patient.id);
      const Data = {
        formData,
        patientId: patient.id,
      };
      updateMutation.mutate(Data);
    } else {
      mutateAsync(formData).then((res) => {
        console.log(res);
      });
    }
    // return;
    //e.preventDefault();

    return;
  };
  // console.log(companies);
  const CompanyAgreementList = isCredit ? (
    <Form.Group className="">
      <Form.Label className="text-nowrap">company agreement</Form.Label>
      <Form.Select
        {...register("company_id", {
          onChange: (e) => {
            setValue("employeeId", "");
          },
        })}
        isInvalid={errors?.company_id}
      >
        <option value="">Select Company</option>
        {companies?.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </Form.Select>

      <Form.Control.Feedback type="invalid">
        {errors?.company_id?.message}
      </Form.Control.Feedback>
    </Form.Group>
  ) : null;

  let EmergencySection;
  if (theSameAddressASPatient) {
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
                regions?.filter(
                  (region) => region.id == AddressregionWatcher
                )[0]?.name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              disabled={true}
              aria-label="Default select example"
              value={
                cities?.filter((city) => city.id == AddresscityWatcher)[0]?.name
              }
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Subcity</Form.Label>
            <Form.Control
              disabled={true}
              name="role"
              aria-label="Default select example"
              value={
                subcities?.filter(
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
              value={
                woredas?.filter((w) => w.id == AddressWoredaWacher)[0]?.name
              }
            ></Form.Control>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              disabled={true}
              {...register("address.house_number")}
              isInvalid={errors.address?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  } else {
    EmergencySection = (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("emergency.region_id", {
                onChange: () => {
                  if (EmergencySubCityWatcher) {
                    setValue("emergency.subcity_id", "");
                  }
                  if (EmergencycityWatcher) {
                    setValue("emergency.city_id", "");
                  }
                  setValue("emergency.woreda_id", "");
                },
              })}
              isInvalid={errors.emergency?.region_id}
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
              {errors?.emergency?.region_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="">
            <Form.Label>City</Form.Label>
            <Form.Select
              // ref={roleref}
              {...register("emergency.city_id", {
                onChange: () => {
                  if (EmergencySubCityWatcher) {
                    setValue("emergency.subcity_id", "");
                  }
                  setValue("emergency.woreda_id", "");
                },
              })}
              aria-label="Default select example"
              isInvalid={errors.emergency?.city_id}
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
              {errors?.emergency?.city_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="">
            <Form.Label>Subcity</Form.Label>
            <Form.Select
              {...register("emergency.subcity_id", {
                onChange: () => {
                  setValue("emergency.woreda_id", "");
                },
              })}
              aria-label="Default select example"
              isInvalid={errors.emergency?.subcity_id}
            >
              <option value="">Please Select</option>
              {subcities
                ?.filter(
                  (subcity) => subcity.city_id == EmergencycityWatcher
                  // : subcity
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
              {errors?.emergency?.subcity_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>Woreda</Form.Label>

            <Form.Select
              {...register("emergency.woreda_id")}
              isInvalid={errors.emergency?.woreda_id}
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
              {errors?.emergency?.woreda_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4} sm={12} className="mb-2">
          <Form.Group>
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              {...register("emergency.house_number")}
              isInvalid={errors.emergency?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  }

  const showCreditCompanyFormsLogic = () => {
    let show;
    if (patient) {
      if (!isCredit) {
        show = patient.is_credit;
      } else {
        show = isCredit;
      }
    } else {
      show = isCredit;
    }
    return show;
  };
  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        {/* {!showNextForm ? ( */}
        <div>
          <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
            Patient Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="Name"
                register={register}
                name="firstName"
                errors={errors.firstName}
              />
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="Father Name"
                register={register}
                name="middleName"
                errors={errors.middleName}
              />
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <TextInput
                label="Grandfather Name"
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("phone")}
                  isInvalid={errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>has Phone</Form.Label>
                <Form.Check
                  type="switch"
                  {...register("has_phone", {
                    onChange: (e) => {
                      if (!e.target.checked) {
                        setValue("emergency.the_same_address_as_patient", true);
                      }
                      // console.log(e);
                    },
                  })}
                ></Form.Check>
              </Form.Group>
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
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <div className="d-flex  gap-1">
                  <div className="w-100">
                    <Form.Control
                      type="date"
                      name="birth_date"
                      className="w-100"
                      disabled={isNewBornWatcher}
                      {...register("birth_date")}
                      //   disabled={!isbirthdateknown}
                      max={new Date().toISOString().substring(0, 10)}
                      // value={calulateBirthDatefromAge(AgeWacher)}
                      isInvalid={errors.birth_date}
                    />

                    <Form.Control.Feedback
                      type="invalid"
                      // style={{ display: "block" }}
                      // className="d-block"
                    >
                      {errors.birth_date?.message}
                    </Form.Control.Feedback>
                  </div>
                  <button
                    className="border-0 bg-transparent curserpointer  align-self-start"
                    disabled={isNewBornWatcher}
                  >
                    <FaPlus onClick={() => setShowCalculateBD(true)} />
                  </button>
                </div>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>is New Born</Form.Label>
                <Form.Check
                  type="switch"
                  {...register("is_new_born", {
                    onChange: (e) => {
                      if (e.target.checked) {
                        setValue(
                          "birth_date",
                          new Date().toISOString().substring(0, 10)
                        );
                      }
                      // console.log(e);
                    },
                  })}
                ></Form.Check>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label className="text-nowrap">Patient Type</Form.Label>
                <Form.Select {...register("is_new")} isInvalid={errors.is_new}>
                  {/* <option value={null}>Select Patient Type</option> */}

                  <option value="true">New</option>
                  <option value="false">Existing</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {isNewPatient === "false" ? (
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
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
                  <Form.Control.Feedback type="invalid">
                    {errors?.manual_card_id?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            ) : null}

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label className="text-nowrap">Payment way</Form.Label>
                <Form.Select {...register("is_credit")}>
                  {/* <option value="">Select Payment way</option> */}

                  <option value={false}>Self Payer</option>
                  <option value={true}>Credit</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Marital Status</Form.Label>
                <Form.Select {...register("marital_status")}>
                  <option value="">Select Marital Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  {/* <option value="Separated">Other</option> */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Occupation</Form.Label>
                <Form.Control
                  type="text"
                  {...register("occupation")}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Guardian name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("guardian_name")}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Address Information
          </h6>
          <Row>
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
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Emergency Contact Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("emergency.firstName")}
                  isInvalid={errors.emergency?.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.emergency?.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Father Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("emergency.middleName")}
                  isInvalid={errors.emergency?.middleName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.emergency?.middleName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Grandfather Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("emergency.lastName")}
                  isInvalid={errors.emergency?.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.emergency?.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Relationship</Form.Label>
                <Form.Select
                  {...register("emergency.relation")}
                  aria-label="Default select example"
                >
                  {/* <option>Select role</option> */}
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.emergency?.relation?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {realationwacher === "Other" && (
              <Col md={4} sm={12} className="mb-2">
                <Form.Group className="mb-3">
                  <Form.Label>Relationship Type</Form.Label>
                  <Form.Control
                    {...register("emergency.other_relation")}
                    aria-label="Default select example"
                    isInvalid={errors.emergency?.other_relation}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors?.emergency?.other_relation?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {/* phone */}
            {/* {theSameAddressASEmpl ? ( */}
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  {...register("emergency.phone")}
                  placeholder="09/07********"
                  isInvalid={errors.emergency?.phone}
                />

                <Form.Control.Feedback type="invalid">
                  {errors?.emergency?.phone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* ) : null} */}

            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <Form.Label>Same Address as Employee</Form.Label>
                <Form.Check
                  type="checkbox"
                  // placeholder="09/07********"
                  disabled={!hasPhoneWatcher}
                  // defaultChecked={!hasPhoneWatcher}
                  // defaultValue={!hasPhoneWatcher}
                  {...register("emergency.the_same_address_as_patient")}
                  // isInvalid={errors.address?.phone_1}
                />
              </Form.Group>
              {/* <Form.Control.Feedback type="inValid" className="small text-danger">
              {errors?.address?.phone_1?.message}
            </Form.Control.Feedback> */}
            </Col>
            {EmergencySection}
          </Row>
          {/* <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
      Patient Type
    </h6> 
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Patient Type
          </h6>*/}
          {/* <Row>
            <Col md={4} sm={12}>
              <Form.Group className="">
                <Form.Label className="text-nowrap">Patient Type</Form.Label>
                <Form.Select {...register("is_new")} isInvalid={errors.is_new}>
                 
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
          </h6>*/}

          {/* <Row>
            <Col md={4} sm={12}>
              <Form.Group className="">
                <Form.Label className="text-nowrap">Payment way</Form.Label>
                <Form.Select {...register("is_credit")}>
                 

                  <option value={false}>Self Payer</option>
                  <option value={true}>Credit</option>
                </Form.Select>
              </Form.Group>
            </Col>
           
            <Col md={4} sm={12}>
         
            </Col>
            <Col></Col>
          </Row> */}
        </div>
        {/* ) : ( */}
        <>
          {(getValues("is_credit") === true ||
            getValues("is_credit") === "true") && (
            <>
              {" "}
              <h6 className="border-bottom border-1 border-black mt-2 py-2 mb-3 fw-bold">
                Credit Service Information
              </h6>
              <Row>
                <Col md={4} sm={12}>
                  {isCredit && CompanyAgreementList}
                </Col>
                {companyIdWatcher && (
                  <Col md={4} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-nowrap">Employee</Form.Label>
                      <Form.Select
                        {...register("employeeId")}
                        isInvalid={errors.employeeId}
                        // disabled={patient}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.middleName}{" "}
                            {employee.lastName}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.employeeId?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                )}
                {employeeSelectWatcher && (
                  <Col md={4} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-nowrap">
                        Employee Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          employees?.find(
                            (e) => e.id === parseInt(employeeSelectWatcher)
                          )?.empl_id || ""
                        }
                        disabled={true}
                      />
                    </Form.Group>
                  </Col>
                )}
                <Col md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-nowrap">Employee Id</Form.Label>
                    <Form.Control
                      type="file"
                      {...register("employeeId_doc")}
                      accept="image/*"
                      name="employeeId_doc"
                      isInvalid={errors.employeeId_doc}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.employeeId_doc?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-nowrap">Letter</Form.Label>
                    <Form.Control
                      type="file"
                      {...register("letter_doc")}
                      name="letter_doc"
                      accept="image/* ,.pdf,.doc,.docx"
                      isInvalid={errors.letter_doc}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.letter_doc?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </>
        {/* )} */}
        <hr />
        <div className="d-flex gap-2 justify-content-end">
          {/* {showNextForm ? (
            <Button type="button" onClick={() => setShowNextForm(false)}>
              Prev
            </Button>
          ) : null}
          {patient ? (
            (patient?.is_credit || isCredit === "true") && !showNextForm ? (
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNextForm(true);
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                // disabled={isPending}
                //   className="w-100"
                type="submit"
                // onClick={(e)=> e.stopPropagation()}
              >
                {(isPending || updateMutation.isPending) && (
                  <Spinner animation="border" size="sm" />
                )}
                {patient ? "Update" : "Save"}
              </Button>
            )
          ) : (
            <Button
              variant="primary"
              // disabled={isPending}
              //   className="w-100"
              type="submit"
              // onClick={(e)=> e.stopPropagation()}
            >
              {(isPending || updateMutation.isPending) && (
                <Spinner animation="border" size="sm" />
              )}
              {patient ? "Update" : "Save"}
            </Button>
          )} */}
          <Button
            variant="primary"
            // disabled={isPending}
            //   className="w-100"
            type="submit"
            // onClick={(e)=> e.stopPropagation()}
          >
            {(isPending || updateMutation.isPending) && (
              <Spinner animation="border" size="sm" />
            )}
            {patient ? "Update" : "Save"}
          </Button>
        </div>
      </Form>
      {showCalculateBD ? (
        <CalculateBirthDateModal
          show={showCalculateBD}
          handleClose={setShowCalculateBD}
          setValue={setValue}
        />
      ) : null}
    </>
  );
};

export default PatientForm;
