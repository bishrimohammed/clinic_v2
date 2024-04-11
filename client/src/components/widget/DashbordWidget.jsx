/* eslint-disable react/prop-types */
import React from "react";
import { FaAccessibleIcon } from "react-icons/fa6";
const DashbordWidget = ({ logo, title, amount, borderColor }) => {
  // console.log(borderColor);
  return (
    <div
      style={{
        // borderColor: "red", /* `${borderColor} ` */
        borderLeft: `4px solid ${borderColor}`,
      }}
      className="boxshadow  bg-white   d-flex py-2  px-3"
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

          <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500 mb-0">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashbordWidget;
