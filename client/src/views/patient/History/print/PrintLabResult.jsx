/* eslint-disable react/prop-types */
import React, { forwardRef, memo, useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import logo from "../../../../assets/clinicLogo-removebg-preview.png";
// import { format, formatHour } from "../../../../utils/formatDate";
import PrintHeader from "./printComponents/PrintHeader";
import PatientInfornPrint from "./printComponents/PatientInfornPrint";
const PrintLabResult = memo(
  forwardRef((props, ref) => {
    const componentRef = useRef();
    //console.log(props.medications);
    const printData = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "hello",
      //removeAfterPrint: true,
    });
    React.useImperativeHandle(ref, () => ({
      printData,
    }));
    return (
      <div ref={componentRef}>
        <div className="p-2">
          <div className="p-2">
            <PrintHeader />
            <hr className="opacity-100 border-2 mt-4 border-dark" />
            <div className="report-info d-flex px-2 justify-content-between">
              <div>
                <h6>Demography Information</h6>

                <PatientInfornPrint />
              </div>
              <div>
                <h6>Routing Information</h6>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Order Time:</span>{" "}
                  {format(props?.labResult?.orderTime)}
                  {formatHour(props?.labResult?.orderTime)}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Report Time:</span>{" "}
                  {format(props?.labResult?.reportTime)}{" "}
                  {formatHour(props?.labResult?.reportTime)}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Request By: </span>
                  {props?.labResult?.requestBy?.username}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Reported By:</span>{" "}
                  {props?.labResult?.reportedBy?.username}
                </div>
              </div>
            </div>

            <div className="test-results mt-4">
              <table>
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Result value & unit</th>

                    <th>Ref Renge</th>
                    <th>Done By</th>
                    <th>Done Time</th>
                    <th>Report Time</th>
                  </tr>
                </thead>
                <tbody>
                  {props?.labResult?.testResult?.map((result, index) => (
                    <tr key={index}>
                      <td>{result.testId.test_name}</td>
                      <td>
                        {result.resultValue} {result.unit}
                      </td>

                      <td>{result.referenceRange}</td>
                      <td>{props?.labResult.reportedBy.username}</td>
                      <td>
                        {/* {format(props?.labResult.orderTime)} */}
                        {formatHour(props?.labResult.orderTime)}
                      </td>

                      {/*  <td>
                        {format(props?.labResult.reportTime)}{" "}
                        {formatHour(props?.labResult.reportTime)}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default PrintLabResult;
