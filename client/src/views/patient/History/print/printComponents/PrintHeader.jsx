import { Image } from "react-bootstrap";
import logo from "../../../../../assets/clinicLogo-removebg-preview.png";
import { useGetClinicInformation } from "../../../../Administration/clinic setting/hooks/useGetClinicInformation";
// import { useGetClinicInformation } from "../../../../hooks/useGetClinicInformation";
const PrintHeader = () => {
  const { data } = useGetClinicInformation();

  return (
    <div
      style={{ height: 105, overflow: "hidden" }}
      className="report_header d-flex border border-2 border-dark"
    >
      <div className=" my-auto h-100">
        <Image
          src={data?.logo ? data?.logo : logo}
          alt="image"
          style={{ objectFit: "contain", objectPosition: "center" }}
          width={130}
          //className="img-fluid"
          fluid
          height={130}
        />
      </div>
      <div className=" border-start border-start-1 border-3 border-dark flex-grow-1">
        <div className="d-flex justify-content-between px-2 align-items-center border-bottom border-bottom-1 border-2 py-1  border-dark">
          <span style={{ fontSize: 12 }}>Company Name</span>
          <h6 className="fw-bold  align-self-center mb-0">
            {data?.name ? data?.name : "Dr. Test Clinic"}
          </h6>
        </div>
        <div className="d-flex justify-content-between px-2 align-items-center border-bottom border-bottom-1 border-2 py-1  border-dark">
          <span style={{ fontSize: 12 }}>Docoment title</span>
          <h6 className="fw-bold  align-self-center mb-0">Laboratory Result</h6>
        </div>
        <div
          style={{ fontSize: 13 }}
          className="d-flex justify-content-between px-2 py-1 gap-2 align-items-center"
        >
          <span /* style={{ fontSize: 12 }} */>
            {data?.location ? data?.location : "test location"}
          </span>
          <span>{data?.phone ? data?.phone : "+257398498477"}</span>
          <span>{data?.website ? data?.website : "www.test.com"}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintHeader;
