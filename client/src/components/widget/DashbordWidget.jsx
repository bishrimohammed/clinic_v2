/* eslint-disable react/prop-types */
import React from "react";
import { FaAccessibleIcon } from "react-icons/fa6";
const DashbordWidget = ({ logo, title, amount, borderColor }) => {
  // console.log(borderColor);
  return (
    <div
      style={{
        // borderColor: "red", /* `${borderColor} ` */
        minWidth: "170px",
        boxShadow: "1px 1px 5px 2px rgba(0,0,0,0.1)",
        borderLeft: `4px solid ${borderColor}`,
      }}
      className="  bg-white   d-flex justify-content-center align-items-center py-2  px-3"
    >
      <div className="d-flex flex-column align-items-center gap-1 px-2">
        {/* <FaAccessibleIcon size={70} className="text-danger" /> */}
        {logo}
        <div className=" d-flex gap-2">
          <h3
            className="mb-0 text-center"
            style={{ fontSize: 23, color: "rgb(59, 83, 110)" }}
          >
            {amount}
          </h3>

          <p
            style={{ color: "#b2b5c0", fontSize: 19 }}
            className="fw-500 text-nowrap mb-0"
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashbordWidget;
