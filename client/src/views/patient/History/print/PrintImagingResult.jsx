/* eslint-disable react/prop-types */
import React, { forwardRef, memo, useRef } from "react";
import { useReactToPrint } from "react-to-print";

// import { format, formatHour } from "../../../../utils/formatDate";
import PrintHeader from "./printComponents/PrintHeader";
import PatientInfornPrint from "./printComponents/PatientInfornPrint";
const PrintImagingResult = memo(
  forwardRef((props, ref) => {
    const componentRef = useRef();
    // console.log(props.Result.investigations);
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
                  {format(props?.Result?.orderTime)}
                  {"  "}
                  {formatHour(props?.Result?.orderTime)}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Report Time:</span>
                  {"  "}
                  {format(props?.Result?.reportTime)}{" "}
                  {formatHour(props?.Result?.reportTime)}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Request By: </span>
                  {props?.Result?.requestBy?.username}
                </div>
                <div className="ps-2 mb-1">
                  <span className="fw-bold me-1">Reported By:</span>{" "}
                  {props?.Result?.reportedBy?.username}
                </div>
              </div>
            </div>
            <hr className="opacity-100 border-1 mt-4 border-dark" />
            <div className="test-results mt-4">
              <h6>Test Results</h6>

              <div className="p-2">
                <span
                  style={{ fontWeight: 500, fontSize: 24 }}
                  className="fw-bold"
                >
                  Tests :{" "}
                </span>{" "}
                {props.Result.investigations.map((test, index) => (
                  <span key={test._id}>
                    {test.test_name}
                    {index != props.Result.investigations.length && ","}
                  </span>
                ))}
              </div>
              <div className="p-2">
                <h3>Report :</h3>
                <div style={{ whiteSpace: "pre" }} className="px-3 ">
                  {props.Result?.imageResult}
                </div>
              </div>

              {/*   <div>{props.Result.imageResult}</div> */}
              {/* <table>
                
                <tbody>
                  {props?.Result?.testResult?.map((result, index) => (
                    <tr key={index}>
                      <td>{result.testId.test_name}</td>
                      <td>
                        {result.resultValue} {result.unit}
                      </td>

                      <td>{result.referenceRange}</td>
                      <td>{props?.Result.reportedBy.username}</td>
                      <td>                       
                        {formatHour(props?.Result.orderTime)}
                      </td>                     
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default PrintImagingResult;
