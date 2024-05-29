import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetMedicines } from "../../hooks/consultationHooks/medication/useGetMedicines";
import { useAddprescription } from "../../hooks/consultationHooks/medication/useAddprescription";
import { useLocation } from "react-router-dom";

const InternalMedicationSchema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      medicine_id: yup
        .string()
        .transform((value) => value.trim())
        .required("Medicine is required"),
      medicineID: yup.string(),
      dosage: yup
        .string()
        .transform((value) => value.trim())
        .required("Dosage is required"),
      frequency: yup
        .string()
        .transform((value) => value.trim())
        .required("Frequency is required"),
      start_date: yup.date().required("Start date is required"),
      notes: yup.string().transform((value) => value.trim()),
    })
  ),
});

const AddInternalMedicationModal = ({ show, handleClose }) => {
  const { data: medicines, isPending } = useGetMedicines();
  const addprescriptionMutation = useAddprescription();
  const { state } = useLocation();
  // console.log(medicines);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(InternalMedicationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  console.log(errors);
  // const medicinesOptions = useMemo(
  //   () =>
  //     data?.map((m) => {
  //       return {
  //         label: m.medicineServiceItem.service_name,
  //         value: m.medicineServiceItem.id,
  //       };
  //     }),
  //   [data]
  // );
  // console.log(data);
  const submitHandler = (data) => {
    // console.log(data);
    const Data = data.rows;
    const formData = Data.map((medicine) => {
      let medicineId = medicine.medicine_id.split(".")[0];
      console.log(medicineId);

      return {
        medicine_id: medicines.find((m) => m.id === parseInt(medicineId))
          ?.service_item_id,

        dosage: medicine.dosage,
        frequency: medicine.frequency,
        start_date: medicine.start_date,
        notes: medicine.notes,
      };
    });
    // console.log(Data);
    console.log(formData);
    addprescriptionMutation
      .mutateAsync({ medicalRecord_id: state.medicalRecord_id, formData })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          handleClose();
        }
      });
  };
  if (isPending) return <Spinner />;
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Internal Medication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Table responsive striped>
            <thead>
              <tr>
                <td>#</td>
                <th>Drug </th>
                <th>
                  <span style={{ opacity: 0 }}>ergagrtshsfgbsrh</span>{" "}
                </th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>note</th>
                <th>
                  <button
                    type="button"
                    className="btn btn-success py-1"
                    onClick={() =>
                      append({
                        medicine_id: "",
                        dosage: "",
                        frequency: "",
                        start_date: "",
                        notes: "",
                      })
                    }
                  >
                    Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td colSpan={2}>
                    {/* <Controller
                      control={control}
                      name=""
                      render={({ field }) => (
                        <CreatableSelect
                          {...field}
                          name={`rows[${index}].medicine_id`}
                          placeholder="drug name"
                          // formatCreateLabel={handleCreateOption}
                          options={medicinesOptions}
                          // defaultValue={chiefs}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              borderColor: errors.chief_complaint
                                ? "red"
                                : state.isFocused
                                ? "white"
                                : "grey",
                              zIndex: 10,
                            }),
                          }}
                        />
                      )}
                    /> */}
                    {/* <Form.Control
                      // type="text"
                      placeholder="medicine"
                      list="medicines"
                      {...register(`rows.${index}.medicine_id`)}
                      isInvalid={errors.rows?.[index]?.medicine_id}
                      // defaultValue={item.name}
                    ></Form.Control> */}
                    <Form.Control
                      placeholder="medicine"
                      list="medicines"
                      {...register(`rows.${index}.medicine_id`)}
                      isInvalid={errors.rows?.[index]?.medicine_id}
                    ></Form.Control>

                    <datalist id="medicines">
                      {medicines?.map((medicine, index) => (
                        <option
                          key={medicine.id}
                          value={
                            medicine.id +
                            ". " +
                            medicine?.medicineServiceItem?.service_name
                          }
                        >
                          {/* {console.log(data)} */}
                        </option>
                      ))}
                    </datalist>
                    {/* <input
                      type="hidden"
                      {...register(`rows.${index}.medicineID`)}
                      value={
                        watch(`rows.${index}.medicine_id`)
                          ? data?.find(
                              (medicine) =>
                                medicine?.medicineServiceItem?.service_name ==
                                watch(`rows.${index}.medicine_id`)
                            )?.service_item_id || ""
                          : undefined
                      }
                    /> */}
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      {...register(`rows.${index}.dosage`)}
                      placeholder="dosage"
                      isInvalid={!!errors.rows?.[index]?.dosage}

                      // defaultValue={item.email}
                    />
                  </td>
                  <td>
                    <Form.Control
                      // type="tel"
                      {...register(`rows.${index}.frequency`)}
                      placeholder="frequency"
                      isInvalid={!!errors.rows?.[index]?.frequency}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      min={new Date().toISOString().substring(0, 10)}
                      {...register(`rows.${index}.start_date`)}
                      isInvalid={!!errors.rows?.[index]?.start_date}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      {...register(`rows.${index}.notes`)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger py-1"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Row>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Medication Name</Form.Label>
                <Form.Control
                  {...register("medicationName")}
                  isInvalid={errors.medicationName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.medicationName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Dosage</Form.Label>
                <Form.Control
                  {...register("dosage")}
                  isInvalid={errors.dosage}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dosage?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Medication Type</Form.Label>
                <Form.Control
                  {...register("medicationType")}
                  isInvalid={errors.medicationType}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.medicationType?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Frequency</Form.Label>
                <Form.Control
                  {...register("frequency")}
                  isInvalid={errors.frequency}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.frequency?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row> */}
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              disabled={addprescriptionMutation.isPending}
              type="submit"
              className="btn btn-primary"
            >
              {addprescriptionMutation.isPending && (
                <Spinner animation="border" size="sm" />
              )}
              Save
            </button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddInternalMedicationModal;
