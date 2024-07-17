import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import { FaPrint } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { Host_URL } from "../utils/getHost_URL";
import { getClinicInformation } from "../utils/getClinicInformation";

const PrintWrapper = (props) => {
  const { children, documentTitle } = props;
  // console.log(props);
  const componentRef = useRef();
  // console.log(props.Result.investigations);
  const printData = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: documentTitle,
    //removeAfterPrint: true,
  });
  // React.useImperativeHandle(ref, () => ({
  //   printData,
  // }));
  return (
    <>
      <div ref={componentRef}>
        {children}
        <div
          style={{ position: "absolute", bottom: "0", right: "20px" }}
          // className="d-flex justify-content-end"
        >
          {/* <Image src={Host_URL + getClinicInformation()?.clinic_seal} /> */}
        </div>
      </div>
      <div>
        <button
          // disabled={disabled}
          onClick={printData}
          type="button"
          className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
        >
          <FaPrint />
          Print
        </button>
      </div>
    </>
  );
};

export default PrintWrapper;
