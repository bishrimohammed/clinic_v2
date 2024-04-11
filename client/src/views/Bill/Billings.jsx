import React, { useEffect, useState } from "react";
import { Container, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetDraftPayments } from "./hooks/useGetDraftPayments";

const Billings = () => {
  const navigate = useNavigate();

  const { data: bills, isPending } = useGetDraftPayments();

  if (isPending) return <Spinner animation="grow" />;
  return (
    <>
      <Tabs defaultActiveKey="home" id="controlled-tab-example">
        <Tab eventKey="home" title="Drafts">
          <hr className="mt-0" />
          <Table striped bordered>
            <thead>
              <tr>
                <th>Bill Number</th>
                <th>Bill Date</th>

                <th>Patient</th>

                <th>status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.length !== 0 &&
                bills.map((bill, index) => (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/patients/history/${bill.history}/billdetail`, {
                        state: bill,
                      })
                    }
                  >
                    <td>{bill._id}</td>
                    <td>{bill.createdAt}</td>
                    <td>{bill.patient.name}</td>
                    {/* <td>{history.labrequest.requestBy.username}</td> */}

                    <td>{bill.paymentStatus}</td>
                    <td>{bill.totalAmount}</td>
                    <td>acti</td>
                  </tr>
                ))}

              <tr></tr>
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="profile" title="Paid">
          paid
        </Tab>
      </Tabs>
    </>
  );
};

export default Billings;
