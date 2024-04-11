import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Lab = () => {
  return (
    <Container className="p-3 ">
      <div className="p-3  bg-hrun-box hrunboxshadow">
        <Outlet></Outlet>
      </div>
    </Container>
  );
};

export default Lab;
