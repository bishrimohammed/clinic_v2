import React from "react";
import { Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { medicationOptions } from "../utils/medicationOptions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddExternalPrescription } from "../../hooks/consultationHooks/medication/useAddExternalPrescription";

const ExternalMedicationSchema = yup.object().shape({
  rows: yup.array().of(
    yup.object().shape({
      drug_name: yup
        .string()
        .transform((value) => value.trim())
        .required("Drug name is required"),

      dosage: yup.string().transform((value) => value.trim()),
      // .required("Dosage is required"),
      frequency: yup.string().transform((value) => value.trim()),
      // .required("Frequency is required"),
      duration: yup
        .number()
        .positive()
        .min(0, "Duration must be greater than 0"),
      // .required(),
      start_date: yup.date().required("Start date is required"),
      notes: yup.string().transform((value) => value.trim()),
      route: yup.string(),
      when: yup.string(),
    })
  ),
});
const AddExternalPrescriptionModal = ({ show, handleClose }) => {
  const { state } = useLocation();
  const addprescriptionMutation = useAddExternalPrescription();
  // console.log(medicines);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(ExternalMedicationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rows",
  });
  // console.log(errors);
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
    const formData = data.rows;

    // console.log(formData);
    // return;
    addprescriptionMutation
      .mutateAsync({ medicalRecord_id: state.medicalRecord_id, formData })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          handleClose();
        }
      });
  };
  return (
    <Modal size="xl" show={show} onHide={handleClose}>
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
                {/* <th>
                  <span style={{ opacity: 0 }}>ergagrtshsfgbsrh</span>{" "}
                </th> */}
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Route</th>
                <th>When</th>
                {/* <th>Start Date</th> */}
                <th>Duration </th>
                <th>
                  <button
                    type="button"
                    className="btn btn-sm btn-success py-1"
                    onClick={() =>
                      append({
                        drug_name: "",
                        dosage: "",
                        frequency: "",
                        duration: "",
                        start_date: new Date().toISOString().substring(0, 10),
                        notes: "",
                        route: "",
                        when: "",
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
                  <td>
                    <Form.Control
                      placeholder="medicine"
                      list="medicines"
                      {...register(`rows.${index}.drug_name`)}
                      isInvalid={errors.rows?.[index]?.drug_name}
                    ></Form.Control>

                    <datalist id="medicines">
                      {medicationOptions?.map((medicine, index) => (
                        <option key={medicine + index} value={medicine}>
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
                    {/* <Form.Control
                      type="date"
                      min={new Date().toISOString().substring(0, 10)}
                      defaultValue={new Date().toISOString().substring(0, 10)}
                      {...register(`rows.${index}.start_date`)}
                      isInvalid={!!errors.rows?.[index]?.start_date}
                    /> */}
                    <Form.Select
                      // type="date"

                      {...register(`rows.${index}.route`)}
                      isInvalid={!!errors.rows?.[index]?.route}
                    >
                      <option value="">Select Route</option>
                      <option value="Oral">Oral</option>
                      <option value="Tablet">Tablet</option>
                      {/* <option value="Subcutaneous">Subcutaneous</option> */}
                      {/* <option value="Topical">Topical</option> */}
                      <option value="Injection">Injection</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select
                      type="text"
                      {...register(`rows.${index}.when`)}
                      // placeholder="when"
                      isInvalid={!!errors.rows?.[index]?.when}
                    >
                      <option value="">Select When</option>
                      <option value="Before meals">Before Meals</option>
                      <option value="After meals">After Meals</option>
                      <option value="Before bedtime">Before Bedtime</option>
                      <option value="Before exercise">Before Exercise</option>
                      <option value="Before sleep">Before Sleep</option>
                      <option value="Before break fast">
                        Before break fast
                      </option>
                    </Form.Select>
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
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExternalPrescriptionModal;
