import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAddPatient } from "../hooks/useAddPatient";
import { patientSchema } from "../utils/patientSchema";

import { useGetWoredas } from "../../../hooks/useGetWoredas";
import { useGetRegions } from "../../../hooks/useGetRegions";
import { useGetCities } from "../../../hooks/useGetCities";
import { useGetSubCities } from "../../../hooks/useGetSubCities";
import { FaPlus } from "react-icons/fa6";
import CalculateBirthDateModal from "../components/CalculateBirthDateModal";

import { useGetActiveCreditCompanys } from "../hooks/companyHooks/useGetActiveCreditCompanys";
import { useUpdatePatient } from "../hooks/patientHooks/useUpdatePatient";
import Axiosinstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { nationalityList } from "../utils/Nationality";

// import { generatePatientID } from "../utils/generatePatientID";
// const getPatientId = await generatePatientID();
const PatientForm = ({ patient }) => {
  // console.log(patient);
  // const PateintUniqueId = useCallback(
  //   () => generatePatientID().then((res) => res),
  //   []
  // );
  const [patientID, setPatientID] = useState("");
  // const PateintUniqueId = generatePatientID().then((res) => {
  //   console.log(res);
  //   return res;
  // });
  useEffect(() => {
    // generate patient id
    const generatePatientID = async () => {
      // Retrieve the last used patient ID from your data store (e.g., local storage, database)
      // let lastID = localStorage.getItem("LastPatientID");
      // console.log(lastID);
      // Extract the numeric part of the last ID and increment it
      let nextNumber;
      // if (lastID) {
      // nextNumber = String(parseInt(lastID?.split("-")[1]) + 1).padStart(
      //   5,
      //   "0"
      // );

      // return `P-${nextNumber}`;
      // } else {
      if (!patient) {
        const res = await Axiosinstance.get("patient/lastPatientID");
        //  .then((res) => {
        //   console.log(res.data);

        // });
        if (!res.data) {
          // localStorage.setItem("LastPatientID", "P-00001");
          setValue("patientId", "P-00001");
        } else {
          nextNumber = String(parseInt(res.data?.split("-")[1]) + 1).padStart(
            5,
            "0"
          );
          setValue("patientId", `P-${nextNumber}`);
        }
      } else {
        setValue("patientId", patient.card_number);
      }

      // localStorage.setItem(
      //   "LastPatientID",
      //   "P-" + String(parseInt(res.data?.split("-")[1])).padStart(5, "0")
      // );
      return `P-${nextNumber}`;
    };
    generatePatientID();
    // .then((res) => {
    //   console.log(res);
    //   setPatientID(res);
    // });
  }, []);
  // console.log(PateintUniqueId);
  const { mutateAsync, isPending } = useAddPatient();
  const updateMutation = useUpdatePatient();
  const { data: companies } = useGetActiveCreditCompanys();

  const [showCalculateBD, setShowCalculateBD] = useState(false);
  // const [showNextForm, setShowNextForm] = useState(false);
  const { data: woredas } = useGetWoredas();
  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities();
  const { data: subcities } = useGetSubCities();
  // console.log(patient);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: patient
      ? {
          firstName: patient ? patient.firstName : "",
          middleName: patient ? patient.middleName : "",
          lastName: patient.lastName ? patient.lastName : "",
          gender: patient ? patient.gender : "",
          birth_date: patient ? patient.birth_date : "",
          has_phone: patient ? patient.has_phone : true,
          phone: patient ? (patient.phone ? patient.phone : "") : "",
          occupation: patient.occupation ? patient.occupation : "",
          marital_status: patient.marital_status,
          guardian_name: patient.guardian_name ? patient.guardian_name : "",
          guardian_relationship: patient.guardian_relationship
            ? patient.guardian_relationship
            : "",
          blood_type: patient.blood_type ? patient.blood_type : "",
          nationality: patient.nationality ? patient.nationality : "",

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
            relation: [
              "Spouse",
              "Father",
              "Mother",
              "Brother",
              "Sister",
            ].includes(patient?.emergencyContact?.relationship)
              ? patient?.emergencyContact?.relationship
              : "Other",
            phone: patient ? patient?.emergencyContact?.phone : "",
            the_same_address_as_patient:
              patient &&
              patient.address_id === patient.emergencyContact?.address?.id,
            other_relation: [
              "Spouse",
              "Father",
              "Mother",
              "Brother",
              "Sister",
            ].includes(patient?.emergencyContact?.relationship)
              ? ""
              : patient?.emergencyContact?.relationship,
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

  useEffect(() => {
    // generate patient id
    const generatePatientID = async () => {
      // Retrieve the last used patient ID from your data store (e.g., local storage, database)
      if (patient) {
        setValue("patientId", patient.card_number);
      } else {
        let lastID = localStorage.getItem("LastPatientID");
        // console.log(lastID);
        // Extract the numeric part of the last ID and increment it
        let nextNumber;
        if (lastID) {
          nextNumber = String(parseInt(lastID?.split("-")[1]) + 1).padStart(
            5,
            "0"
          );

          setValue("patientId", `P-${nextNumber}`);
        } else {
          const res = await Axiosinstance.get("patient/lastPatientID");
          //  .then((res) => {
          //   console.log(res.data);
          // console.log(res);
          nextNumber = String(parseInt(res.data?.split("-")[1]) + 1).padStart(
            5,
            "0"
          );
          // console.log(nextNumber);
          // });
          if (!res.data) {
            localStorage.setItem("LastPatientID", "P-00000");
            // return "P-00001";
            setValue("patientId", "P-00001");
          } else {
            localStorage.setItem(
              "LastPatientID",
              "P-" + String(parseInt(res.data?.split("-")[1])).padStart(5, "0")
            );
            console.log(`P-${nextNumber}`);
            setValue("patientId", `P-${nextNumber}`);
          }

          // console.log(nextNumber);
        }
      }

      // Combine the prefix and the new number
      // let newID = `P-${nextNumber}`;

      // Store the new last used patient ID
      // localStorage.setItem('LastPatientID', newID);

      // return newID;
      // setValue("patientId", newID);
    };
    generatePatientID();
    // .then((res) => {
    //   console.log(res);
    //   setPatientID(res);
    // });
  }, []);
  // console.log(getValues("is_credit"));

  // setValue("birth_date", new Date().toISOString().substring(0, 10));

  const isCredit = watch("is_credit");
  const isNewPatient = watch("is_new");
  const isNewBornWatcher = watch("is_new_born");
  const hasPhoneWatcher = watch("has_phone");
  // const marital_statusWatcher = watch("marital_status");
  // console.log("is credit " + isCredit);
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
  // console.log(errors);

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
    console.log(data);
    console.log(patientID);
    // return;
    const patientData = {
      patient_id: patient ? patient.card_number : data.patientId,
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
      guardian_relationship: data.guardian_relationship,
      is_credit: data.is_credit,
      is_new: data.is_new,
      manual_card_id: data.manual_card_id,
      blood_type: data.blood_type,
      nationality: data.nationality,
    };
    // console.log(patientData);
    // return;
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
      <Form.Label className="text-nowrap">Company Name</Form.Label>
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
            <div className="d-flex align-items-center gap-1">
              <Form.Label>Region</Form.Label>
              <span className="text-danger fw-bold">*</span>
            </div>

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
            <div className="d-flex align-items-center gap-1">
              <Form.Label>City</Form.Label>
              <span className="text-danger fw-bold">*</span>
            </div>

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
            <div className="d-flex align-items-center gap-1">
              <Form.Label>Subcity</Form.Label>
              <span className="text-danger fw-bold">*</span>
            </div>

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
            <div className="d-flex align-items-center gap-1">
              <Form.Label>Woreda</Form.Label>
              <span className="text-danger fw-bold">*</span>
            </div>

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

  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        {/* {!showNextForm ? ( */}
        <Row>
          <Col md={5} sm={12} className="mb-0">
            <Form.Group className=" mb-3">
              <Form.Label className="text-nowrap mb-1">
                Registration Date:{" "}
              </Form.Label>
              <Form.Control
                type="date"
                disabled={true}
                defaultValue={new Date().toISOString().substring(0, 10)}
                // className="w-75"
                // {...register("registration_date")}
                // isInvalid={errors.registration_date}
              />
            </Form.Group>
          </Col>
          <Col md={5} sm={12} className="mb-0">
            <Form.Group className=" mb-3">
              <Form.Label className=" text-nowrap mb-1">Patient ID:</Form.Label>
              <Form.Control
                type="text"
                // defaultValue={patient ? patient.card_number : patientID}
                // defaultValue="P-00007"
                disabled={true}
                // className="w-75"
                // value={}
                {...register("patientId")}
                // isInvalid={errors.date_of_birth}
              />
            </Form.Group>
          </Col>
          {/* <Col md={4} sm={12} className="mb-2"></Col> */}
          <Col md={5} sm={12} className="mb-1">
            <Form.Group className=" mb-3">
              <Form.Label className=" text-nowrap mb-1">
                Patient Type
              </Form.Label>
              <Form.Select {...register("is_new")} isInvalid={errors.is_new}>
                {/* <option value={null}>Select Patient Type</option> */}

                <option value="true">New</option>
                <option value="false">Existing</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {getValues("is_new") === "false" || getValues("is_new") === false ? (
            <Col md={5} sm={12} className="mb-1">
              <Form.Group className=" mb-3">
                <Form.Label className=" text-nowrap mb-1">
                  Manual Card Number:
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("manual_card_id", {
                    required: [isNewPatient === "true" ? true : false],
                  })}
                  isInvalid={errors.manual_card_id}
                  // className="w-75"
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.manual_card_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          ) : null}
        </Row>
        <div>
          <h6 className="border-bottom border-1 p-1 mb-3 fw-bold">
            Patient Information
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Name</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>
                <Form.Control
                  {...register("firstName")}
                  isInvalid={errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <TextInput
                label="Name"
                register={register}
                name="firstName"
                errors={errors.firstName}
              /> */}
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center gap-1">
                  <Form.Label> Father's Name</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

                <Form.Control
                  {...register("middleName")}
                  isInvalid={errors.middleName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.middleName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <TextInput
                label="Father's Name"
                register={register}
                name="middleName"
                errors={errors.middleName}
              /> */}
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Grandfather's Name</Form.Label>
                <Form.Control
                  {...register("lastName")}
                  isInvalid={errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <TextInput
                label="Grandfather's Name"
                register={register}
                name="lastName"
                errors={errors.lastName}
              /> */}
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Sex</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

                <Form.Select
                  {...register("gender")}
                  isInvalid={errors.gender}
                  aria-label="Default select example"
                >
                  <option value="">Select Sex</option>
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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Date of Birth</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                    type="button"
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
                <Form.Label>Blood Type</Form.Label>
                <Form.Select
                  {...register("blood_type")}
                  isInvalid={errors.blood_type}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.blood_type?.message}
                </Form.Control.Feedback>
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
              <Form.Group className="mb-3">
                <Form.Label>Marital Status</Form.Label>
                <Form.Select {...register("marital_status")}>
                  {/* <option value="">Select Marital Status</option> */}
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
                <Form.Label>Guardian</Form.Label>
                <Form.Control
                  type="text"
                  {...register("guardian_name")}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                {/* <div className="d-flex align-items-center gap-1"> */}
                <Form.Label>Guardian Relationship</Form.Label>
                {/* <span className="text-danger fw-bold">*</span> */}
                {/* </div> */}

                <Form.Control
                  type="text"
                  {...register("guardian_relationship")}
                  isInvalid={errors.guardian_relationship}
                  aria-label="Default select example"
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors?.guardian_relationship?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* Nationality */}
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  list="nationalityList"
                  type="text"
                  {...register("nationality")}
                />
                <datalist
                  id="nationalityList"
                  style={{ height: 50, overflowY: "auto" }}
                >
                  {nationalityList.map((nationality) => (
                    <option key={nationality} value={nationality}>
                      {nationality}
                    </option>
                  ))}
                </datalist>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center gap-1">
                  <Form.Label className="text-nowrap">
                    Payment Method
                  </Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

                <Form.Select {...register("is_credit")}>
                  {/* <option value="">Select Payment way</option> */}

                  <option value={false}>Self Payer</option>
                  <option value={true}>Credit</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
            Patient Address Details
          </h6>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group>
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Phone</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>
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
                <Form.Label>Guardian Phone Number</Form.Label>
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
                <Form.Label>Alternative Phone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="09/07********"
                  {...register("address.phone_2")}
                  isInvalid={errors.address?.phone_2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address?.phone_2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Region</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>City</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Subcity</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Woreda</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Name</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Father Name</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <Form.Label>Grandfather's Name</Form.Label>
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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Relationship</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

                <Form.Select
                  type="text"
                  {...register("emergency.relation")}
                  isInvalid={errors.emergency?.relation}
                  aria-label="Default select example"
                >
                  <option value="">Please Select</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
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
                  <div className="d-flex align-items-center gap-1">
                    <Form.Label>Relationship Type</Form.Label>
                    <span className="text-danger fw-bold">*</span>
                  </div>

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
                <div className="d-flex align-items-center gap-1">
                  <Form.Label>Phone Number</Form.Label>
                  <span className="text-danger fw-bold">*</span>
                </div>

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
                <Form.Label>Same Address as Patient</Form.Label>
                <Form.Check
                  type="checkbox"
                  // placeholder="09/07********"
                  // disabled={!hasPhoneWatcher}
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
        </div>
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
                    <Form.Label className="text-nowrap">
                      Support Letter
                    </Form.Label>
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
          birthDateError={errors.birth_date}
          clearErrors={clearErrors}
        />
      ) : null}
    </>
  );
};

export default PatientForm;
