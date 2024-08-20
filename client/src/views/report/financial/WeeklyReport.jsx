import React, { useMemo, useState } from "react";
import { endOfWeek, setWeek, startOfWeek } from "date-fns";
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
const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  {
    name: "Page B",
    uv: 200,
    pv: 1400,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 250,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page D",
    uv: 150,
    pv: 980,
    amt: 2290,
  },
];
const TableDisplay = ({ data }) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Week</th>
          <th>Week Start</th>
          <th>Week End</th>
          <th>Total Payments</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((payment, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{payment.week}</td>
            <td>{payment.week_start.toLocaleDateString()}</td>
            <td>{payment.week_end.toLocaleDateString()}</td>
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
      {" "}
      <ResponsiveContainer
        width={"100%"}
        height={500}
        className="px-2 text-white"
      >
        <LineChart
          width={800}
          height={300}
          data={data}
          title="Weekly Payment Report"
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          className="text-white"
        >
          <Line type="monotone" dataKey="total_payments" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="week" />
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
const WeeklyReport = ({ weeklyPayments }) => {
  const [displayFormat, setDispayFormat] = useState("table");
  //   console.log(weeklyPayments);
  const payments = useMemo(() => {
    return weeklyPayments?.map((payment) => {
      const weekNumber = String(payment.week).substring(4);
      const date = new Date(new Date().getFullYear(), 0, 1);
      const dateWithWeek = setWeek(date, weekNumber);
      return {
        week: "Week " + String(payment.week).substring(4),
        week_start: startOfWeek(dateWithWeek, { weekStartsOn: 0 }),
        week_end: endOfWeek(dateWithWeek, { weekStartsOn: 0 }),
        total_payments: payment.total_payments,
      };
    });
  }, [weeklyPayments]);

  //   console.log(payments);
  // const {} = useGet
  return (
    <div>
      <h4>Weekly Financial Report</h4>
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

export default WeeklyReport;
