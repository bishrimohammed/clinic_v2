import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Procedure from "../../../externalServices/Procedure";
import { useAddProcedure } from "../../hooks/consultationHooks/procedure/useAddProcedure";
import { useLocation } from "react-router-dom";

const procuderSchema = yup.object().shape({
  procedures: yup.array().of(yup.number()),
});

const AddProcedureModal = ({ show, handleClose, medicalRecordId }) => {
  const { mutateAsync, isPending } = useAddProcedure();
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(procuderSchema),
  });
  const handleSubmitForm = async () => {
    // console.log(getValues("procedures"));
    // return;
    await mutateAsync({
      procedures: getValues("procedures"),
      medicalRecordId: medicalRecordId,
    })
      .then((res) => {
        if (res.status === 201) {
          handleClose();
          reset();
        }
      })
      .catch((err) => {
        console.error(err);
      });
    // setShowAddModal(false);
  };
  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Procedure</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <input type="text" placeholder="Enter Procedure Name" /> */}
        <Procedure getValues={getValues} setValue={setValue} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={
            watch("procedures")
              ? isPending || watch("procedures")?.length === 0
              : true
          }
          onClick={handleSubmitForm}
        >
          {isPending && <Spinner size="sm" />}
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const AddProcedureBtn = ({ medicalRecordId }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { state } = useLocation();
  //   console.log(state);
  //   console.log(getValues("procedures"));
  return (
    <>
      <div className="d-flex justify-content-end pe-3">
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-sm btn-primary"
        >
          + Add
        </button>
      </div>

      <AddProcedureModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        medicalRecordId={state.medicalRecord_id}
      />
    </>
  );
};

export default AddProcedureBtn;
