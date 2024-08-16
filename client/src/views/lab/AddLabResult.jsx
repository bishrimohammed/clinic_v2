import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderedTests } from "./hooks/useGetOrderedTests";
import { Alert, Form, Spinner, Table } from "react-bootstrap";
import { useGetLaboratory } from "../patient/History/investigation/hooks/useGetLaboratory";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPatientGeneralInfo } from "../patient/hooks/patientHooks/useGetPatientGeneralInfo";
import PatientGeneralInforamtion from "../patient/patient Detail/PatientGeneralInforamtion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAddLabResult } from "./hooks/useAddLabResult";
import { useGetPatient } from "../patient/hooks/patientHooks/useGetPatient";

const labResultSchema = yup.object().shape({
  results: yup.array().of(
    yup.object().shape({
      test_id: yup.number(),
      test_name: yup.string(),
      result: yup.string().transform((value) => value.trim()),
      comment: yup.string().transform((value) => value.trim()),
    })
  ),
});
const AddLabResult = () => {
  const { state } = useLocation();
  //   const { data: laboratoryTests, error } = useGetLaboratory();
  // console.log(state);
  const { data } = useGetOrderedTests(state.id);
  // const { data: patient, isPending: patientPending } = useGetPatient(
  //   state?.medicalRecord?.patient?.id
  // );
  // console.log(data);
  const { mutateAsync, isPending } = useAddLabResult();
  const navigate = useNavigate();
  // return <div>dkfjvbfh</div>;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(labResultSchema),
  });
  const [errorState, setErrorState] = useState("");
  // console.log(errorState);
  useEffect(() => {
    if (errorState) {
      const timeoutId = setTimeout(() => {
        setErrorState("");
      }, 5000);
      // Clean up the timeout when the effect is re-run or unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [errorState]);
  const Tests = useMemo(() => data?.filter((t) => t.test !== null), [data]);
  // console.log(Tests);
  const submitHandler = (Data) => {
    // console.log(Data);
    // console.log(Data.results.some((r) => r.result !== ""));
    // Data.results.map((r) => console.log(r));
    if (Data.results.every((r) => r.result === "")) {
      setErrorState("Please enter result for at least one test");
      return;
    }
    const Panels = data?.filter((t) => t.test.labTestProfile.isPanel);

    // console.log(Panels);
    // return;
    const formData = {
      results: Data.results?.filter((t) => t.result !== ""),
      panels: Panels?.map((t) => t.id),
    };
    // console.log(formData);
    // return;
    mutateAsync(formData).then((result) => {
      // if (result.status === 201) {
      //   handleClose();
      // }
      navigate(-1);
      reset();
    });
  };
  //   console.log(Tests);
  return (
    <div>
      <div className=" py-2 mb-3 border-bottom  d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5 className="mb-0">Add Laboratory Result</h5>
      </div>
      {errorState && <Alert variant="danger">{errorState}</Alert>}
      <div className="d-flex gap-3 px-2">
        <div style={{ flex: 75 }} className="left ">
          <Form id="resultForm" onSubmit={handleSubmit(submitHandler)}>
            <Table bordered responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Test Name</th>
                  <th>Test Result</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {Tests?.filter((t) => !t.test.labTestProfile.isPanel)
                  ?.filter((t) => t.reported_by === null) // filter test that didn't have result
                  ?.map((t, index) => (
                    <tr key={t.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          hidden
                          type="number"
                          {...register(`results[${index}].test_id`)}
                          name={`results[${index}].test_id`}
                          defaultValue={t.id}
                        />
                        <Form.Group>
                          <input
                            disabled
                            type="text"
                            className="border-0"
                            {...register(`results[${index}].test_name`)}
                            name={`results[${index}].test_name`}
                            value={t.test?.service_name}
                          ></input>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="lab result"
                            {...register(`results[${index}].result`)}
                            name={`results[${index}.result`}
                            defaultValue={t.result}
                            isInvalid={errors?.results?.[index]?.result}
                          ></Form.Control>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Comment"
                            {...register(`results[${index}].comment`)}
                            defaultValue={t.comment ? t.comment : ""}
                            name={`results[${index}.comment`}
                          ></Form.Control>
                        </Form.Group>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary px-3"
                disabled={isPending}
                //   onClick={handleSubmit(submitHandler)}
              >
                {isPending && <Spinner size="sm" />}
                Save
              </button>
            </div>
          </Form>
        </div>
        <div style={{ flex: 25 }} className="right p-2 border">
          {
            state.isInternalService && (
              // (patientPending ? (
              //   <Spinner size="sm" animation="grow" />
              // ) : (
              <PatientGeneralInforamtion
                // patient={patient}
                medicalRecordId={state.medicalRecord_id}
                patientId={state?.medicalRecord?.patient?.id}
              />
            )
            // ))
          }
          {!state.isInternalService && (
            <div>
              <p className="mb-1 small">
                Patient Name: {state.externalService.patient_name}
              </p>
              {/* <p className="mb-1 small">ID: {patient?.card_number}</p> */}
            </div>
          )}
          {/* {patientPending ? (
            <Spinner size="sm" animation="grow" />
          ) : (
            <PatientGeneralInforamtion
              patient={patient}
              medicalRecordId={state.medicalRecord_id}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddLabResult;
