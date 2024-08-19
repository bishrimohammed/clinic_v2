import React, { useState } from "react";
import { Button, Tab, Table, Tabs } from "react-bootstrap";
import OrderLab from "./logic/OrderLab";
import { useParams } from "react-router-dom";
import useMedicalHistory from "../hooks/useMedicalhistory";
// import { format, formatHour } from "../../../utils/formatDate";
import useOrderedImageInvestigations from "../hooks/useOrderedImageInvestigations";
const OrderedImageInvestigations = () => {
  const { historyId } = useParams();
  const { data, isPending, error } = useOrderedImageInvestigations(historyId);
  console.log("order imag");
  if (isPending) return "loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date Requested</th>
            <th>Test Name</th>

            <th>Requested By</th>

            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.investigations.map((inves, index) => (
            <tr key={index}>
              <td>
                {format(data.orderTime)} {formatHour(data.orderTime)}
              </td>
              <td>{inves.test_name}</td>
              <td>{data.requestBy.username}</td>

              <td>{data.status}</td>
              <td>""</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export const Investigation = () => {
  const [key, setKey] = useState("orders");
  const [show, setShow] = useState({ isShow: false, dtype: "" });
  const { historyId } = useParams();
  const { data: history, isPending, error } = useMedicalHistory(historyId);
  console.log("investigation");

  const handleClose = () => setShow({ isShow: false, dtype: "" });
  const handleShow = (value) => {
    if (value === "image") {
      setShow({ isShow: true, dtype: "image" });
    } else {
      setShow({ isShow: true, dtype: "laboratory" });
    }
  };
  if (isPending) return "loading...";
  if (error) return "An error has occurred: " + error.message;
  //console.log(history);
  return (
    <>
      {show.isShow && (
        <OrderLab
          show={show.isShow}
          type={show.dtype}
          handleClose={handleClose}
          handleShow={handleShow}
          patientId={history.patientId._id}
        />
      )}
      {/*   <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        //defaultActiveKey="orders"
        className="mb-1"
      >
        <Tab eventKey="orders" title="Orders">
          <hr className="mt-0" />
          <h5 className="ps-2 bluewhite-bg py-1 ">Laboratory Order</h5>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Date Requested</th>
                <th>Name</th>

                <th>Requested By</th>
                <th>Notes</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.labrequest?.investigations.map((inves, index) => (
                <tr key={index}>
                  <td>
                    {format(history.labrequest.orderTime)}{" "}
                    {formatHour(history.labrequest.orderTime)}
                  </td>
                  <td>{inves.test_name}</td>
                 
                  <td>{""}</td>
                  <td>{""}</td>
                  <td>{history.labrequest.status}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h5 className="ps-2 bluewhite-bg py-1 ">Imaging Order</h5>
          <OrderedImageInvestigations />
          <div className="d-flex w-100  justify-content-end">
            <div>
              <Button
                onClick={() => handleShow("lab")}
                className="ms-3"
                variant="success"
                type="button"
              >
                + New Lab
              </Button>
              <Button
                onClick={() => handleShow("image")}
                className="ms-3"
                variant="success"
                type="button"
              >
                + New Imaging
              </Button>
            </div>
          </div>
        </Tab>
        <Tab eventKey="lab_result" title="Laboratory Results">
          <hr className="mt-0" />
          <Table striped bordered>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
                <th>ABN</th>
                <th>Ref Renge</th>
                <th>unit</th>
                <th>Order Time</th>
                <th>Report Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CBC(ALL)</td>
                <td>23</td>
                <td>L</td>
                <td>23-78</td>
                <td>%</td>
                <td>11/10/23 2:11PM</td>
                <td>11/10/23 5:11PM</td>
              </tr>
              <tr>
                <td>bxcsfcdgafdwtr</td>
                <td>bxcsfcdgafdwtr</td>
                <td>bxcsfcdgafdwtr</td>
                <td>bxcsfcdgafdwtr</td>
                <td>bxcsfcdgafdwtr</td>
                <td>bxcsfcdgafdwtr</td>
              </tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="image_result" title="Imaging Results">
          bill
        </Tab>
        <Tab eventKey="historynote" title="discharge summary">
          {key === "historynote" && (
            <>
              <div>disch</div>
            </>
          )}
        </Tab>
      </Tabs> */}
    </>
  );
};
