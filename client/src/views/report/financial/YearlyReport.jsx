import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table } from "react-bootstrap";

const TableDisplay = ({ data }) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Month</th>

          <th>Total Payments</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((payment, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{payment.year}</td>

            <td>{payment.total_payments} Birr</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const LineChartDisplay = ({ data }) => {
  return (
    <div className=" bg-hrun-box hrunboxshadow px-2">
      <ResponsiveContainer
        width={"100%"}
        height={400}
        className="px-2 text-white"
      >
        <LineChart
          width={800}
          height={300}
          data={data}
          title="Year Payment Report"
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          className="text-white"
        >
          <Line type="monotone" dataKey="total_payments" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis
            // tickFormatter={(value) => `${value}`} // Customize y-axis tick format
            domain={[0, "5000"]}
            ticks={[0, 500, 1000, 2000, 3000, 4000, 5000]}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const YearlyReport = ({ yearlyPayments }) => {
  // console.log(yearlyPayments);
  // return;
  const [displayFormat, setDispayFormat] = useState("table");
  //   console.log(weeklyPayments);
  const payments = useMemo(() => {
    return yearlyPayments?.map((payment) => {
      return {
        year: payment.year,

        total_payments: payment.total_payments,
      };
    });
  }, [yearlyPayments]);

  //   console.log(payments);
  // const {} = useGet
  return (
    <div>
      <div className="d-flex justify-content-start me-2 mb-3">
        <button
          className="btn btn-sm btn-success"
          onClick={() =>
            setDispayFormat(displayFormat === "table" ? "chart" : "table")
          }
        >
          {displayFormat === "table" ? "Switch to Chart" : "Switch to Table"}
        </button>
      </div>
      <hr />
      {displayFormat === "table" ? (
        <TableDisplay data={payments} />
      ) : (
        <LineChartDisplay data={payments} />
      )}
    </div>
  );
};

export default YearlyReport;
