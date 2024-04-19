import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const FieldConfig = () => {
  return (
    <Container className="p-3 ">
      <div className="bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>
    </Container>
  );
};

export default FieldConfig;
