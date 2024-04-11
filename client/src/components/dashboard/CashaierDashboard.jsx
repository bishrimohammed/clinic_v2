import DashbordWidget from "../widget/DashbordWidget";
import { FaAccessibleIcon, FaList } from "react-icons/fa6";
import { FaFileMedical } from "react-icons/fa6";
import { useGetDashBoardData } from "../../hooks/useGetDashBoardData";
import { Spinner } from "react-bootstrap";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CashaierDashboard = () => {
  const { data, isFetching, error } = useGetDashBoardData();
  if (isFetching) return <Spinner animation="grow" />;
  if (error) return <div>error : {error.response.data.message}</div>;
  // console.log(data);
  const incomeReport = [
    {
      name: "Today total income",
      amount: data?.thisTodayIncome?.totalAmount,
    },
    {
      name: "this_Week total income",
      amount: data?.thisWeekIncome?.totalAmount,
    },
    {
      name: "this_Month total income",
      amount: data?.thisMonthIncome?.totalAmount,
    },
    {
      name: "this year total income",
      amount: data?.thisYearIncome?.totalAmount,
    },
  ];
  // console.log(incomeReport);
  return (
    <div
      /* style={{ fontSize: 100 }} */
      className="h-100 " /* w-100 d-flex justify-content-center align-items-center */
    >
      <div className="d-flex flex-wrap gap-3">
        <DashbordWidget
          logo={
            <FaAccessibleIcon
              size={40}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.totalPatient}
          title="Total patients"
          borderColor="rgb(252, 173, 115)"
        />
        <DashbordWidget
          logo={
            <FaFileMedical
              size={40}
              color="rgb(22, 187, 229)"
              //className="text-danger"
            />
          }
          amount={data?.todayVisit}
          title="Today visit"
          borderColor="rgb(22, 187, 229)"
        />{" "}
        {/* <DashbordWidget
          logo={
            <FaUserDoctor
              size={40}
              color="rgb(234, 93, 93)"
              //className="text-danger"
            />
          }
          amount={data?.totalPatient}
          title="Doctor"
        />{" "} */}
        <DashbordWidget
          logo={
            <FaList
              size={40}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.waitingList}
          title="Waiting List"
          borderColor="rgb(252, 173, 115)"
        />
        <DashbordWidget
          logo={<FaAccessibleIcon size={40} color="rgb(252, 173, 115)" />}
          title="active patient"
          amount={data?.activePatient}
          borderColor="rgb(252, 173, 115)"
        />
      </div>
      <hr />
      {/* <div className="">
        <Row>
          <Col>
            {" "}
            <PaymentWidget
              amount={data?.thisTodayIncome?.totalAmount}
              title="Today's Revenue"
            />
          </Col>
          <Col>
            <PaymentWidget
              amount={data?.thisWeekIncome?.totalAmount}
              title="This Week's Revenue"
            />
          </Col>
          <Col>
            <PaymentWidget
              amount={data?.thisMonthIncome?.totalAmount}
              title="This Month's Revenue"
            />
          </Col>
        </Row>
      </div> */}
      <div
        style={{ backgroundColor: "#FAF7F5" }}
        className="d-flex mb-5 flex-md-row flex-column w-100 h-100"
      >
        <ResponsiveContainer className="mt-5" width="100%" height={350}>
          <LineChart
            width={500}
            height={300}
            data={incomeReport}
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
              dataKey="name"
              fontSize="10"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              // dataKey={"lab_panel"}
              dataKey="amount"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <ResponsiveContainer className="mt-5" width="100%" height={350}>
          <LineChart
            width={500}
            height={300}
            data={ImagingReport}
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
              dataKey="name"
              fontSize="10"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              // dataKey={"lab_panel"}
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default CashaierDashboard;
