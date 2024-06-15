import React, { useEffect, useMemo, useState } from "react";
import { Container, Spinner, Tab, Table, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetOutStandingPayments } from "./hooks/useGetDraftPayments";
import OutStandingBillListTable from "./OutStandingBillListTable";

const Billings = () => {
  const navigate = useNavigate();

  const {
    data: bills,
    isPending,
    refetch,
    isRefetching,
  } = useGetOutStandingPayments();
  console.log(bills);
  const billings = useMemo(() => bills || [], [bills]);
  // if (isPending) return <Spinner animation="grow" />;
  return (
    <>
      <Tabs defaultActiveKey="home" id="controlled-tab-example">
        <Tab eventKey="home" title="Pending Payments">
          <hr className="mt-0" />
          <OutStandingBillListTable
            billings={billings}
            isPending={isPending}
            refetch={refetch}
            isRefetching={isRefetching}
          />
          {/* <Table striped bordered>
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

                    <td>{bill.paymentStatus}</td>
                    <td>{bill.totalAmount}</td>
                    <td>acti</td>
                  </tr>
                ))}

              <tr></tr>
            </tbody>
          </Table> */}
        </Tab>
        <Tab eventKey="profile" title="Paid">
          paid
        </Tab>
      </Tabs>
    </>
  );
};

export default Billings;
