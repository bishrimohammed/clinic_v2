/* eslint-disable react/prop-types */
import React, { forwardRef, memo, useMemo } from "react";
import { useReactToPrint } from "react-to-print";

import useMedicalHistory from "../../hooks/useMedicalhistory";
import { useParams } from "react-router-dom";
import PrintHeader from "./printComponents/PrintHeader";
import PatientInfornPrint from "./printComponents/PatientInfornPrint";

const PrintMedication = memo(
  forwardRef((props, ref) => {
    const componentRef = React.useRef();
    //console.log(props.medications);
    const { historyId } = useParams();
    const { data: history } = useMedicalHistory(historyId);
    // console.log(props);
    const printData = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: "hello",
      //removeAfterPrint: true,
    });
    React.useImperativeHandle(ref, () => ({
      printData,
    }));
    const totalAmount = useMemo(() => {
      // eslint-disable-next-line react/prop-types
      return props.medications?.medications.reduce((total, medicine) => {
        return total + medicine.medicineId.price;
      }, 0);
      // eslint-disable-next-line react/prop-types
    }, [props.medications]);
    // console.log(totalAmount);
    return (
      <div ref={componentRef}>
        <div className="p-2">
          <div className="p-2">
            <PrintHeader />

            <hr className="opacity-100 border-2 mt-4 border-dark" />
            <div className="report-info d-flex px-2 justify-content-between">
              <PatientInfornPrint />
            </div>

            <div className="test-results mt-4">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Drugn Name</th>
                    <th>Dose</th>
                    <th>frequency</th>
                    <th>route</th>
                    <th>No of Days</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {/*  // eslint-disable-next-line react/prop-types */}
                  {props.medications?.medications.map((presmedicine, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{presmedicine.medicineId.drugname}</td>
                      <td>{presmedicine.dosage}</td>
                      <td>{presmedicine.frequency}</td>
                      <td>{presmedicine.route}</td>

                      <td>{presmedicine.number_of_days}</td>
                      <td>{presmedicine.medicineId.price} birr</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={6} className="text-center">
                      Total Price
                    </td>
                    <td>{totalAmount} birr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-1">
              <span className="border-bottom border-bottom-1 border-1 fw-bold fs-5 border-dark">
                Prescriber&apos;s
              </span>
              <div className="w-50 mt-2 ">
                <span>Name:</span>
                <span
                  style={{ fontSize: 13 }}
                  className="ms-2 border-bottom border-bottom-1 border-1 border-dark"
                >
                  {props.medications.prescriber.username}
                </span>
              </div>
              <div className="w-50 mt-3 d-flex">
                <span>Signature:</span>
                <span
                  style={{ fontSize: 13 }}
                  className=" d-flex ms-1 w-50 border-bottom border-bottom-1 border-1 border-dark"
                >
                  {/* <hr
                  style={{ display: "inline-flex" }}
                  className="mt-1 ms-4 ps-5"
                /> */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default PrintMedication;
