import { useRef } from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { format, formatHour } from "../../../../utils/formatDate";
import UseGetImagingStudiesByHistoryId from "../../hooks/UseGetImagingStudiesByHistoryId";
import { useAddImagingResult } from "../investigation/hooks/useAddImagingResult";

//export default AddImagingResult
const AddImagingResult = () => {
  const { historyId } = useParams();
  const { data } = UseGetImagingStudiesByHistoryId(historyId);

  const { mutateAsync, isPending } = useAddImagingResult();
  // console.log(historyId);
  const reportRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const imageResult = reportRef.current.value;
    const Data = {
      imageResult,
    };
    mutateAsync({ Data, testId: data._id });
  };
  return (
    <>
      <h3>Add Imaging Results</h3>
      <div className="p-2 boxshadow mb-2">
        <h6>clinical finding</h6>
        <p>{data?.clinical_finding}</p>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Test Name</th>

            <th>Requested By</th>

            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data?.investigations.map((inves, index) => (
            <tr key={index}>
              <td>
                {format(data?.orderTime)} {formatHour(data?.orderTime)}
              </td>
              <td>{inves.test_name}</td>
              <td>{data?.requestBy.username}</td>

              <td>{data?.status}</td>
            </tr>
          ))}

          <tr></tr>
        </tbody>
      </Table>

      <div className="my-3 p-2 boxshadow">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3 p-2">
            <Form.Label className="text-nowrap fw-bold">
              Write Report :
            </Form.Label>
            <Form.Control
              style={{ minHeight: 150 }}
              className="border border-2"
              as="textarea"
              ref={reportRef}
              name="complaint"
              defaultValue={data?.imageResult}
              required
              placeholder="Enter..."
              disabled={data?.status !== "pending"}
            />
          </Form.Group>
          <Button
            disabled={data?.status !== "pending" || isPending}
            className="ms-3 px-5"
            variant="success"
            type="submit"
          >
            {isPending && <Spinner animation="border" size="sm" />}+ SAVE
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddImagingResult;
