import { useState } from "react";
import { Accordion, Button, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddPaymentModal from "./logic/AddPaymentModal";
import useHistoryBillDetail from "../hooks/useBill";
// import { format, formatHour } from "../../../utils/formatDate";
import { useSelector } from "react-redux";

const BillDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { historyId } = useParams();
  const billdetail = useHistoryBillDetail(historyId);

  const currentUser = useSelector((state) => state.auth.user);
  const handleShow = () => {
    setShow(true);
  };

  if (billdetail.isPending) return <Spinner animation="grow" />;
  if (billdetail.error)
    return "An error has occurred: " + billdetail.error.message;
  // console.log(billdetail.data?.payments[0]?.createdAt);
  return (
    <>
      <div className="">
        <h4>Bill Detail information</h4>
      </div>
      <hr />
      {currentUser.role === "cashier" && (
        <>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header bsPrefix="bg-success">
                prescription
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex w-100  justify-content-end">
                  <div>Sub Total : {billdetail.data.prescriptionCost}</div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header> Laboratory Test</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Test Name</th>
                      <th>price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billdetail.data.labitems.map((test, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{test.test_name}</td>

                        <td>{test.price}</td>
                        <td>act</td>
                      </tr>
                    ))}

                    <tr></tr>
                  </tbody>
                </Table>
                <div className="d-flex w-100  justify-content-end">
                  <div>Sub Total : {billdetail.data.labCost}</div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header> Imaging Studies Test</Accordion.Header>
              <Accordion.Body>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Test Name</th>
                      <th>price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billdetail.data.imagingitems.map((test, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{test.test_name}</td>

                        <td>{test.price}</td>
                        <td>act</td>
                      </tr>
                    ))}

                    <tr></tr>
                  </tbody>
                </Table>
                <div className="d-flex w-100  justify-content-end">
                  <div>Total : {billdetail.data.imageCost}</div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <hr />
          <div className="d-flex w-100 mt-1  justify-content-end">
            <div>
              <div className="d-flex mb-1 gap-5 py-2">
                <div className="  ">
                  <span className="fw-bold">Total Amount : </span>
                  {billdetail.data.totalAmount} birr
                </div>{" "}
                <div className="  ">
                  <span className="fw-bold"> paid Amount : </span>
                  {billdetail.data.TotalpaidAmount}
                </div>
                <div>
                  <span className="fw-bold"> Amount Left : </span>
                  <span
                    className={`${
                      billdetail.data.totalAmount -
                        billdetail.data.TotalpaidAmount ===
                      0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {billdetail.data.totalAmount -
                      billdetail.data.TotalpaidAmount}{" "}
                    birr left
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <div
          style={{ backgroundColor: " #cfe2ff" }}
          className="d-flex justify-content-between align-items-center mt-2 mb-2 py-1 px-3"
        >
          <h3>payments</h3>
          {currentUser.role === "cashier" && (
            <Button
              onClick={handleShow}
              // className="ms-3"
              variant="success"
              type="button"
            >
              + Add Payment
            </Button>
          )}
        </div>
        <Table>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th className="py-2 px-1">paid time</th>
              <th className=" ">Amount</th>
              {/* <th className="">Credit To</th> */}
              <th className="">Note</th>
              <th className="">action</th>
            </tr>
          </thead>

          <tbody>
            {billdetail.data.payments.map((payment, index) => (
              <tr key={index}>
                <td>
                  {format(payment.createdAt)} {formatHour(payment.createdAt)}
                </td>
                <td>{payment.paidamount}</td>
                {/* <td>ccc</td> */}
                <td>{payment.paymentNote}</td>
                <td>edit</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AddPaymentModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        bill={billdetail.data}
      />
    </>
  );
};

export default BillDetails;
