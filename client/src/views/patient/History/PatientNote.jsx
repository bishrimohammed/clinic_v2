import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { PatientNoteLogic } from "./index";
import ProgressNote from "./logic/ProgressNote";
import useMedicalHistory from "../hooks/useMedicalhistory";
import { useParams } from "react-router-dom";
const PatientNote = () => {
  const { historyId } = useParams();
  const { data: history, isPending, error } = useMedicalHistory(historyId);

  if (isPending) return <Spinner animation="grow" />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        defaultActiveKey="history&physical"
        className="mb-1"
      >
        <Tab eventKey="history&physical" title="history and physical">
          <PatientNoteLogic history={history} />
        </Tab>
        <Tab eventKey="progress note" title="progress note">
          <ProgressNote history={history} />
        </Tab>
      </Tabs>
    </>
  );
};

export default PatientNote;
