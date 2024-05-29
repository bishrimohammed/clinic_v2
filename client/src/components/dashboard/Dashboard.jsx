import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <Container fluid className="mb-5 p-2 ">
      {/* <div className="p-3  bg-hrun-box hrunboxshadow"> */}
      <Outlet />

      {/* </div> */}
    </Container>
  );
};

export default Dashboard;
