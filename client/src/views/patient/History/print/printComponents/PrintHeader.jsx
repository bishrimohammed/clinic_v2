import { Image } from "react-bootstrap";
import logo from "../../../../../assets/clinicLogo-removebg-preview.png";
import { useGetClinicInformation } from "../../../../Administration/clinic setting/hooks/useGetClinicInformation";
import { Host_URL } from "../../../../../utils/getHost_URL";
// import { useGetClinicInformation } from "../../../../hooks/useGetClinicInformation";
const PrintHeader = ({ document_title }) => {
  const { data } = useGetClinicInformation();
  // console.log(data);
  // console.log(Host_URL);
  return (
    <div
      style={{
        height: 105,
        overflow: "hidden",
        border: `1px solid  ${data?.brand_color}`,
        // borderColor: "#cf01f9",
      }}
      className="report_header d-flex  border-2 "
    >
      <div className=" my-auto h-100">
        <Image
          src={Host_URL + data?.logo}
          alt="image"
          style={{ objectFit: "contain", objectPosition: "center" }}
          width={130}
          //className="img-fluid"
          fluid
          height={130}
        />
      </div>
      <div
        style={{ borderLeft: `2px solid  ${data?.brand_color}` }}
        className="   flex-grow-1"
      >
        <div
          style={{ borderBottom: `2px solid  ${data?.brand_color}` }}
          className="d-flex justify-content-between px-2 align-items-center  py-1  "
        >
          <span style={{ fontSize: 12 }}>Company Name</span>
          <h6 className=" align-self-center mb-0">
            {data?.name ? data?.name : "Dr. Test Clinic"}
          </h6>
        </div>
        <div
          style={{ borderBottom: `2px solid  ${data?.brand_color}` }}
          className="d-flex justify-content-between px-2 align-items-center  py-1 "
        >
          <span style={{ fontSize: 12 }}>Docoment title</span>
          <h6 className="  align-self-center mb-0">{document_title}</h6>
        </div>
        <div
          style={{ fontSize: 13 }}
          className="d-flex justify-content-between  px-2 py-1 gap-2 align-items-bottom"
        >
          <span /* style={{ fontSize: 12 }} */>
            {data?.location ? data?.location : "test location"}
          </span>
          <span>
            {data?.address?.phone_1 ? data?.address?.phone_1 : "+257398498477"}
          </span>
          <span>{data?.website_url ? data?.website_url : "www.test.com"}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintHeader;
