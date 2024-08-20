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
            <td>{payment.month}</td>

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
        height={500}
        className="px-2 text-white"
      >
        <LineChart
          width={800}
          height={300}
          data={data}
          title="Monthly Payment Report"
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          className="text-white"
        >
          <Line type="monotone" dataKey="total_payments" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis
            // tickFormatter={(value) => `${value}`} // Customize y-axis tick format
            domain={[0, "7000"]}
            ticks={[0, 500, 1000, 2000, 3000, 4000, 7000]}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const MonthlyReport = ({ monthlyPayments }) => {
  // console.log(monthlyPayments);
  const [displayFormat, setDispayFormat] = useState("table");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const payments = useMemo(() => {
    return monthlyPayments?.map((p) => {
      // console.log(String(p.month).split("-"));
      const monthName = months[String(p?.month)?.split("-")[1].charAt(1) - 1];
      // console.log(monthName);
      const year = String(p?.month)?.split("-")[0];
      // console.log(year);
      const month = monthName + " " + year;
      return {
        month,
        total_payments: p?.total_payments,
      };
    });
  }, [monthlyPayments]);

  // console.log(payments);
  return (
    <div>
      <h4>Mothly Financial Report</h4>
      <div className="d-flex justify-content-end me-2 mb-3">
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

export default MonthlyReport;
