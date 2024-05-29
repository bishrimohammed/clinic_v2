import React, { useRef, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import AddLabInvestigation from "../History/investigation/AddLabInvestigation";
import "./plan/plan.css";
import useOrdered_Lab_Investigations from "../History/investigation/hooks/useOrdered_Lab_Investigations";
import { useLocation } from "react-router-dom";
import { OrderedLabInvestigationTable } from "./plan/OrderedLabInvestigationTable";
import FollowUpVisit from "./plan/FollowUpVisit";
import Refer from "./plan/Refer";
const PlanTab = () => {
  const { state } = useLocation();
  const { data: lab_investigation, error } = useOrdered_Lab_Investigations(
    state.medicalRecord_id
  );
  console.log(lab_investigation);
  // const [showAddLabModal, setShowLabModal] = useState(false);
  const [showLabAccordion, setShowLabAccordion] = useState(false);
  const [showFollowUpAccordion, setShowFollowUpAccordion] = useState(false);
  const [showRefer, setShowRefer] = useState(false);
  // const [showSickNote, setShowSickNote] = useState(false);

  const foloowUpRef = useRef(false);
  // console.log(labRef.current.value);
  return (
    <div>
      <Accordion flush defaultActiveKey="0" className="mt-2">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="w-25 border-bottom">
            Out Come
          </Accordion.Header>
          <Accordion.Body className="pb-1">
            <Form className="d-flex justify-content-between">
              <Form.Group className="mb-3 ">
                {/* <Form.Label>Out Come</Form.Label> */}
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    console.log();
                    setShowLabAccordion(e.target.checked);
                  }}
                  label="Lab Requests"
                  placeholder="Out Come"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    console.log();
                    setShowFollowUpAccordion(e.target.checked);
                  }}
                  label="Follow Up Visit"
                  // placeholder="Out Come"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    console.log();
                    setShowRefer(e.target.checked);
                  }}
                  label="Refer"
                  // placeholder="Out Come"
                />
              </Form.Group>
              <Form.Group className="mb-1">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    console.log();
                    setShowSickNote(e.target.checked);
                  }}
                  label="Sick Note"
                  // placeholder="Out Come"
                />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {showLabAccordion && (
        <Accordion flush defaultActiveKey="lab" className="mt-2">
          <Accordion.Item eventKey="lab">
            <Accordion.Header style={{ zIndex: 1 }} className="border-bottom">
              Lab Requests
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("jhgvjhh");
                }}
                style={{ zIndex: 99 }}
                className="ms-5 px-3"
              >
                jhjh
              </button> */}
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <OrderedLabInvestigationTable
                investigations={lab_investigation?.orderedTest}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {showFollowUpAccordion && (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Follow Up Visit</Accordion.Header>
            <Accordion.Body>
              <FollowUpVisit />
            </Accordion.Body>
          </Accordion.Item>
          {/* <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item> */}
        </Accordion>
      )}
      {showRefer && (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Refer</Accordion.Header>
            <Accordion.Body>
              <Refer />
            </Accordion.Body>
          </Accordion.Item>
          {/* <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item> */}
        </Accordion>
      )}
    </div>
  );
};

export default PlanTab;
