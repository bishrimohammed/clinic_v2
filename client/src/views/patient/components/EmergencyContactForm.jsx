import React from "react";
import { Col, Form } from "react-bootstrap";

export const EmergencyContactForm = (value) => {
  if (value) {
    return (
      <>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Control
              disabled={true}
              // {...register("address.region_id")}
              aria-label="Default select example"
              value={
                regions.filter((region) => region.id == AddressregionWatcher)[0]
                  ?.name
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
                woredas.filter((w) => w.id == AddressWoredaWacher)[0]?.name
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
              {...register("address.house_number")}
              isInvalid={errors.address?.house_number}
            />
          </Form.Group>
        </Col>
      </>
    );
  } else {
    return (
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
              {errors?.Emergency?.region_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="">
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
              {errors?.Emergency?.city_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4} sm={12} className="mb-2">
          <Form.Group className="">
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
              {errors?.Emergency?.woreda_id?.message}
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
};
