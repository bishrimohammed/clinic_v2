import React from "react";

const PaymentWidget = ({ amount, title }) => {
  return (
    <>
      <div className="p-2 boxshadow bg-white borderRadius7px  text-center">
        <h3
          className="mb-0"
          style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
        >
          {amount} {amount !== 0 && "birr"}
        </h3>

        <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500 mb-0">
          {title}
        </p>
      </div>
    </>
  );
};

export default PaymentWidget;
