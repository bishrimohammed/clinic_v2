import React from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";

const Schema = yup.object().shape({
  startdate: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue && typeof originalValue === "string") {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? originalValue : parsedDate;
      }
      return value;
    })
    .typeError("Type a start date")
    .required("Enter a start date"),
  end_date: yup
    .date()
    .min(yup.ref("startdate"), "End date must be after start date")
    .transform((value, originalValue) => {
      if (originalValue && typeof originalValue === "string") {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? originalValue : parsedDate;
      }
      return value;
    })
    .typeError("Type an end date"),
});

const BillReport = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      startdate: new Date().toISOString().substring(0, 10),
      end_date: new Date().toISOString().substring(0, 10),
    },
  });
  const start_date = watch("startdate");
  const end_date = watch("end_date");

  const queryClient = useQueryClient();
  const fetchReport = (startdate, enddate) => {
    // console.log(startdate);
    // console.log(enddate);
    queryClient.prefetchQuery({
      queryKey: ["billreport", startdate, enddate],
      queryFn: () =>
        Axiosinstance.get(
          `/report/bill?start_date=${startdate}&end_date=${enddate}`
        ).then((res) => res.data),
    });
  };

  const { data, isPending } = useQuery({
    queryKey: ["billreport", start_date, end_date],
    queryFn: async () =>
      Axiosinstance.get(
        `/report/bill?start_date=${start_date}&end_date=${end_date}`
      ).then((res) => res.data),
  });
  console.log(errors);
  const submitHandler = (data) => {
    fetchReport(data.startdate, data.end_date);
    console.log(data);
  };
  if (isPending) return <Spinner animation="grow" />;
  // console.log(data);
  return (
    <div style={{ overflowX: "hidden" }}>
      <h3 className="text-center">Bill Report</h3>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <div className="d-flex justify-content-between aling-items-center gap-3">
          <div className="d-flex flex-grow-1">
            <Form.Group className="mb-3 w-50">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startdate"
                {...register("startdate")}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 w-50"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                {...register("end_date")}
                // defaultValue={new Date().toISOString().substring(0, 10)}
              />
            </Form.Group>
          </div>

          {/* <div className="align-self-center ">
            <Button variant="primary" type="submit">
              Generate
            </Button>
          </div> */}
        </div>
      </Form>
      <div className="mt-3">
        <Table striped responsive bordered>
          <thead>
            <tr>
              <th>startdate</th>
              <th>end_date</th>
              <th>total_amount</th>
              <th>total_visit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {format(new Date(data?.billreport?.startDate), "MM/dd/yyyy")}
              </td>
              <td>
                {format(new Date(data?.billreport?.endDate), "MM/dd/yyyy")}
              </td>
              <td>
                {data?.billreport?.totalAmount}{" "}
                <span style={{ fontSize: 14, marginRight: 2 }}>birr</span>
              </td>
              <td>{data?.billreport?.totalVisit}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mt-3 " /* style={{ minHeight: 500, height: 300 }} */>
        <h3>laboratory Report</h3>
        <LabReport
          labreport={data?.groupByTestName}
          labpackage={data?.groupByPackege}
        />
      </div>
    </div>
  );
};

const LabReport = ({ labreport, labpackage }) => {
  console.log(labreport.length);
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const labreportDefault = [
    {
      name: "There is no data available for the specified range of days.",
      value: 0,
    },
  ];
  return (
    <div className="d-flex flex-md-row flex-column w-100 h-100">
      <ResponsiveContainer className="mt-5 d-flex" width="100%" height={350}>
        <BarChart
          width={500}
          height={300}
          data={labreport.length === 0 ? labreportDefault : labreport}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey={labreport.length === 0 ? "name" : "_id"}
            scale="point"
            // padding={{ left: 10, right: 10 }}
            fontSize="10"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey={labreport.length === 0 ? "value" : "lab_Test"}
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer className="mt-5" width="100%" height={350}>
        <LineChart
          width={500}
          height={300}
          // data={labpackage}
          data={labreport.length === 0 ? labreportDefault : labpackage}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            // dataKey="_id"
            dataKey={labreport.length === 0 ? "name" : "_id"}
            fontSize="10"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            // dataKey={"lab_panel"}
            dataKey={labreport.length === 0 ? "value" : "lab_panel"}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BillReport;
