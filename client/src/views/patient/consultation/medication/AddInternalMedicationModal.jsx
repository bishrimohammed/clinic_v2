import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetMedicines } from "../../hooks/consultationHooks/medication/useGetMedicines";
import { useAddprescription } from "../../hooks/consultationHooks/medication/useAddprescription";
import { useLocation } from "react-router-dom";
import { FaMinus } from "react-icons/fa6";
const InternalMedicationSchema = yup.object().shape({
  rows: yup
    .array()
    .of(
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
        duration: yup
          .number()
          .positive()
          .min(0, "Duration must be greater than 0")
          .required(),
        start_date: yup.date().required("Start date is required"),
        notes: yup.string().transform((value) => value.trim()),
      })
    )
    .required("At least one medicine is required"),
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
        duration: medicine.duration,
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
          <Table responsive striped hover size="sm">
            <thead>
              <tr>
                <td>#</td>
                <th className="text-nowrap">Drug Name</th>
                <th>
                  <span style={{ opacity: 0 }}>ergagrtshsfgbsrh</span>{" "}
                </th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>Duration</th>
                <th>
                  <button
                    type="button"
                    className="btn btn-success py-1"
                    onClick={() =>
                      append({
                        medicine_id: "",
                        dosage: "",
                        frequency: "",
                        start_date: new Date().toISOString().substring(0, 10),
                        duration: "",
                      })
                    }
                  >
                    +Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td colSpan={2}>
                    <Form.Control
                      // placeholder="medicine"
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
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      {...register(`rows.${index}.dosage`)}
                      // placeholder="dosage"
                      isInvalid={!!errors.rows?.[index]?.dosage}

                      // defaultValue={item.email}
                    />
                  </td>
                  <td>
                    <Form.Control
                      // type="tel"
                      {...register(`rows.${index}.frequency`)}
                      // placeholder="frequency"
                      isInvalid={!!errors.rows?.[index]?.frequency}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      min={new Date().toISOString().substring(0, 10)}
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      {...register(`rows.${index}.start_date`)}
                      isInvalid={!!errors.rows?.[index]?.start_date}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      {...register(`rows.${index}.duration`)}
                      isInvalid={!!errors.rows?.[index]?.duration}
                    />
                  </td>
                  <td>
                    <button
                      className="btn fs-5 p-0"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <FaMinus color="red" />
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
          <Modal.Footer className="p-0">
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
