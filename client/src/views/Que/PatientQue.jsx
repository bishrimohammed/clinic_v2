import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const PatientQue = () => {
  return (
    <Container className="p-3 ">
      <div className="p-3  bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>
    </Container>
  );
};

export default PatientQue;
