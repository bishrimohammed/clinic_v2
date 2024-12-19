import { Container, Spinner } from "react-bootstrap";
import { useGetWoredas } from "../../../hooks/useGetWoredas";

import { useGetClinicInformation } from "./hooks/useGetClinicInformation";

import ClinicForm from "./ClinicForm";

const EditClinicInfo = () => {
  const {
    data: state,
    isPending: ispending,
    error,
  } = useGetClinicInformation();
  // console.log(state);
  const { data: woredas } = useGetWoredas();
  if (ispending) return <Spinner />;

  return (
    <Container className="p-3  mb-5">
      <h4 className="pb-2 mb-2 border-bottom">Clinic Profile Configuration</h4>
      <ClinicForm clinic={state} woredas={woredas} />
      {/*       
        <div className="d-flex justify-content-end">
          <Button
            disabled={!hasPermission("clinic profile", "update")}
            className="px-4 btn-sm"
            onClick={() => {
              // setDisAbleFields(false);
              setCanEditClinic(true);
              // setValue("is_Fileds_Disabled", false);
            }}
          >
            Edit
          </Button>
        </div>
        <div className=" bg-hrun-box hrunboxshadow">
          <Form
            onSubmit={handleSubmit(onSubmitHandler)}
            encType="multipart/form-data"
          >
            <h6 className="border-bottom border-1 border-black pb-2 mb-3 fw-bold">
              Basic Information
            </h6>
            <Row>
              <Col md={4} sm={12} className="mb-2">
                {" "}
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    // autoFocus="true"
                    type="text"
                    {...register("name")}
                    isInvalid={errors.name}
                    defaultValue={state?.name}
                    disabled={!canEditClinic}
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
                      disabled={!canEditClinic}
                      // {...register("logo")}
                      //ref={ref}
                      {...register("logo", {
                        onChange: (e) =>
                          setPreviewImage(URL.createObjectURL(e.target.files[0])),
                      })}
                      isInvalid={errors.logo}
                    />

                    <div className="flex-grow-1 border p-1">
                      {getValues("logo")?.length === 1 ? (
                        <Image
                          src={previewImage}
                          width={30}
                          height={30}
                          // thumbnail
                          fluid
                          thumbnail
                        />
                      ) : (
                        <Image
                          src={Host_URL + state?.logo}
                          
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
                <Form.Group>
                  <Form.Label>Clinic Seal</Form.Label>
                  <div className="d-flex align-items-center justify-content-between gap-2 p-1">
                    <Form.Control
                      type="file"
                      className="border-1"
                      accept="image/png, image/jpeg"
                      // onChange={handleImageChange}
                      id="clinic_seal"
                      name="clinic_seal"
                      disabled={!canEditClinic}
                      // {...register("logo")}
                      //ref={ref}
                      {...register("clinic_seal", {
                        onChange: (e) =>
                          setPreviewImage(URL.createObjectURL(e.target.files[0])),
                      })}
                      isInvalid={errors.clinic_seal}
                    />
                    <div className="flex-grow-1 border p-1 ">
                      {getValues("clinic_seal")?.length === 1 ? (
                        <Image
                          src={previewImage}
                          width={30}
                          height={30}
                          // thumbnail
                          fluid
                        />
                      ) : (
                        <Image
                          src={Host_URL + state?.clinic_seal}
                        
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    // defaultValue={state?.card_valid_date}
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                          disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                    disabled={!canEditClinic}
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
                        disabled={!canEditClinic}
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
                          disabled={!canEditClinic}
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
                          disabled={!canEditClinic}
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

                      
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
            {!!canEditClinic && (
              <div className="d-flex justify-content-end mt-2">
                <Button variant="primary" disabled={isPending} type="submit">
                  {isPending && <Spinner animation="border" size="sm" />}
                  Update
                </Button>
              </div>
            )}
          </Form>
        </div>  
      */}
    </Container>
  );
};

export default EditClinicInfo;
