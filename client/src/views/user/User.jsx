import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <Container className="p-3 mb-5">
      <div className="bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>{" "}
    </Container>
  );
};

export default User;
