/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Button, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { format, formatHour } from "../../../utils/formatDate";

import useMedicalHistory from "../hooks/useMedicalhistory";
import useOrdered_Lab_Investigations from "./investigation/hooks/useOrdered_Lab_Investigations";
import PrintLabResult from "./print/PrintLabResult";
import PrintImagingResult from "./print/PrintImagingResult";
import useGetOrderedImageHistory from "./investigation/hooks/useGetOrderedImageHistory";
import { useSelector } from "react-redux";
import { useLabCategory } from "../hooks/useLabCategory";
import { useGetImageCategory } from "../hooks/useGetImageCategory";
//import { Investigation } from "./Investigation.1";
const OrderedImageInvestigations = ({ data }) => {
  //const { historyId } = useParams();
  //const { data, isPending, error } = useOrderedImageInvestigations(historyId);
  // console.log("order imag");
  /* if (isPending) return "loading...";
  if (error) return "An error has occurred: " + error.message; */
  return (
    <>
      <Table striped bordered responsive>
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
                {format(data.orderTime)} {formatHour(data.orderTime)}
              </td>
              <td>{inves.test_name}</td>
              <td>{data.requestBy.username}</td>

              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
const Investigation = () => {
  const { historyId } = useParams();
  const { data: history, isPending } = useMedicalHistory(historyId);
  const { data: lab_investigation, error } =
    useOrdered_Lab_Investigations(historyId);
  // console.log(error);
  // const { data: imaging_investiagation } = useGetOrderedImageHistory(historyId);
  // useLabCategory();
  // useGetImageCategory();
  const currentUser = useSelector((state) => state.auth.user);
  //console.log("investigation");
  //console.log(lab_investigation);
  const [key, setKey] = useState("orders");

  const navigate = useNavigate();
  // const handleShow = (value) => {
  //   if (value === "image") {
  //     setShow({ isShow: true, dtype: "image" });
  //   } else {
  //     setShow({ isShow: true, dtype: "laboratory" });
  //   }
  // };
  if (isPending) return <Spinner animation="grow" />;
  if (error) return "An error has occurred: " + error.message;
  //console.log(history);
  return (
    <div className="mb-4">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        //  defaultActiveKey="orders"
        className="mb-3 border-bottom border-2"
        variant="underline"
        fill
      >
        <Tab eventKey="orders" title="Orders">
          {key === "orders" && (
            <>
              {/* <hr className="mt-0" /> */}
              <h5 className="ps-2 bluewhite-bg py-1 ">Investigation Order</h5>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>Date Requested</th>
                    <th>Test Name</th>
                    <th>type</th>
                    <th>Requested By</th>
                    <th>status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {lab_investigation?.orderedTest.map((inves, index) => (
                    <tr key={index}>
                      <td>
                        {format(inves.orderTime)} {formatHour(inves.orderTime)}
                      </td>
                      <td>{inves.test.service_name}</td>
                      <td>
                        {lab_investigation.labcategoryIDS.includes(
                          inves.test.serviceCategory_id
                        )
                          ? "lab"
                          : "imaging"}
                      </td>
                      <td>
                        {inves.requestedBy.firstName}{" "}
                        {inves.requestedBy.lastName}
                      </td>
                      <td>{inves.status}</td>
                      {/* <td>hh</td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <hr /> */}
              {/* <h5 className="ps-2 bluewhite-bg py-1 ">Imaging Order</h5> */}
              {/* <OrderedImageInvestigations data={imaging_investiagation} /> */}
              {(currentUser.role.name === "doctor" ||
                currentUser.role.name === "laboratorian") && (
                <div className="d-flex w-100  justify-content-end">
                  <div>
                    {currentUser.role.name === "doctor" && (
                      <>
                        <Button
                          onClick={() => navigate("orderlab")}
                          className="ms-3"
                          variant="success"
                          type="button"
                          disabled={!history.status}
                        >
                          + New Lab
                        </Button>
                        <Button
                          onClick={() =>
                            navigate("orderimage", {
                              state: { patientId: 1 },
                            })
                          }
                          className="ms-3"
                          variant="success"
                          type="button"
                          disabled={!history.status}
                        >
                          + New Imaging
                        </Button>
                      </>
                    )}

                    {currentUser.role.name === "laboratorian" && (
                      <Button
                        onClick={() =>
                          navigate(
                            `/patients/history/${history._id}/addlabresult`
                          )
                        }
                        className="ms-3"
                        variant="success"
                        type="button"
                        disabled={!history.status}
                      >
                        + Add Result
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </Tab>
        <Tab eventKey="lab_result" title="Laboratory Results">
          {key === "lab_result" && (
            <>
              <LabResultList labResult={lab_investigation} />
            </>
          )}
        </Tab>
        <Tab eventKey="image_result" title="Imaging Results">
          {key === "image_result" && (
            <ImagingResult data={imaging_investiagation} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

const LabResultList = (props) => {
  // console.log(props);
  const childRef = useRef(null);
  const callChildFunction = () => {
    if (childRef.current) {
      childRef.current.printData();
    }
  };
  return (
    <div className="p-1 boxshadow">
      {props.labResult?.testResult.length !== 0 &&
      props.labResult?.testResult ? (
        <>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>

                <th>Ref Renge</th>
                <th>unit</th>
                <th>Order Time</th>
                <th>Report Time</th>
              </tr>
            </thead>
            <tbody>
              {props?.labResult?.testResult?.map((result, index) => (
                <tr key={index} style={{ fontSize: 14 }}>
                  <td>{result.testId.test_name}</td>
                  <td>{result.resultValue}</td>

                  <td>{result.testId?.referenceRange}</td>
                  <td>{result.testId?.unit}</td>
                  <td>
                    {format(props?.labResult.orderTime)}{" "}
                    {formatHour(props?.labResult.orderTime)}
                  </td>

                  <td>
                    {format(props?.labResult.reportTime)}{" "}
                    {formatHour(props?.labResult.reportTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-none">
            <PrintLabResult labResult={props?.labResult} ref={childRef} />
          </div>
          <div className="d-flex justify-content-end pe-5">
            <Button onClick={callChildFunction} className="px-4 ms-auto mb-3">
              <span>print</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
          There is no Lab Result for this history
        </div>
      )}
    </div>
  );
};

const ImagingResult = (props) => {
  // console.log(props);
  const childRef = useRef(null);
  const callChildFunction = () => {
    if (childRef.current) {
      childRef.current.printData();
    }
  };
  return (
    <div className="p-2 boxshadow">
      <hr className="mt-0 mb-1" />
      {props.data?.imageResult ? (
        <>
          <div className="p-2">
            <span className="me-2 fw-bold">Tests : </span>
            <span>
              {props.data?.investigations.map((inves, index) => (
                <span key={index} className="me-2">
                  {inves.test_name}{" "}
                  {index !== props.data.investigations.length - 1 && ","}
                </span>
              ))}
            </span>
          </div>
          <hr className="my-2" />
          <div className="p-2">
            <h6 className="mb-3">Report :</h6>
            <div
              style={{ minHeight: 300, width: 800, whiteSpace: "pre" }}
              className="px-4 py-2 boxshadow"
            >
              {props.data?.imageResult}
            </div>
          </div>
          <div className="d-none">
            <PrintImagingResult Result={props?.data} ref={childRef} />
          </div>
          <div className="d-flex justify-content-end pe-5">
            <Button onClick={callChildFunction} className="px-4 ms-auto mb-3">
              <span>print</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
          There is no Imaging Studyies Result for this history
        </div>
      )}
    </div>
  );
};
export default Investigation;
