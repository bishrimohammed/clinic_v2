import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderedTests } from "./hooks/useGetOrderedTests";
import { Form, Spinner, Table } from "react-bootstrap";
import { useGetLaboratory } from "../patient/History/investigation/hooks/useGetLaboratory";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetPatientGeneralInfo } from "../patient/hooks/patientHooks/useGetPatientGeneralInfo";
import PatientGeneralInforamtion from "../patient/patient Detail/PatientGeneralInforamtion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAddLabResult } from "./hooks/useAddLabResult";

const labResultSchema = yup.object().shape({
  results: yup.array().of(
    yup.object().shape({
      test_id: yup.number(),
      test_name: yup.string(),
      result: yup.string().required("Lab Result is required"),
      comment: yup.string(),
    })
  ),
});
const AddLabResult = () => {
  const { state } = useLocation();
  //   const { data: laboratoryTests, error } = useGetLaboratory();
  const { data } = useGetOrderedTests(state.id);
  const { data: patient } = useGetPatientGeneralInfo(
    state.medicalRecord.patient.id
  );
  const { mutateAsync, isPending } = useAddLabResult();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(labResultSchema),
  });
  //   console.log(state);

  const Tests = useMemo(() => data?.filter((t) => t.test !== null), [data]);
  const submitHandler = (Data) => {
    console.log(Data);
    const Panels = data?.filter((t) => t.test === null);
    const result = Panels?.map((t) => {
      return {
        test_id: t.id,
        result: null,
        comment: null,
      };
    });
    // console.log(result);
    const formData = {
      results: Data.results.concat(result),
    };
    // console.log(formData);
    // return;
    mutateAsync(formData);
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
                {Tests?.map((t, index) => (
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
          <PatientGeneralInforamtion patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default AddLabResult;
