import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Report = () => {
  return (
    <Container className="p-3 mb-5">
      <div className="p-3 mb-3  bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>
    </Container>
  );
};

export default Report;
