import React from "react";

const CustomRangeReport = ({ customRangePayments }) => {
  const { total_payments, start, end } = customRangePayments;
  console.log(customRangePayments);
  return (
    <div>
      <h4>Financial Report</h4>
      <p>
        From: {start} To: {end}
      </p>
      <hr />
      <h5>Total Payments: {total_payments} Birr</h5>
    </div>
  );
};

export default CustomRangeReport;
