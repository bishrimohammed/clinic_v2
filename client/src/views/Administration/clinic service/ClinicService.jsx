import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useGetClinicInformation } from "../clinic setting/hooks/useGetClinicInformation";

const ClinicService = () => {
  useGetClinicInformation();
  return (
    <Container className="p-2 mb-5">
      <div className="bg-hrun-box hrunboxshadow">
        <Outlet />
      </div>
    </Container>
  );
};

export default ClinicService;
