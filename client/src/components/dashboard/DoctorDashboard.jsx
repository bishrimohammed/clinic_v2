import { FaAccessibleIcon, FaFileMedical, FaList } from "react-icons/fa6";
import DashbordWidget from "../widget/DashbordWidget";
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

const DoctorDashboard = () => {
  const { data, isFetching, error } = useGetDashBoardData();
  if (isFetching) return <Spinner animation="grow" />;
  if (error) return <div>error : {error.response.data.message}</div>;
  const labReport = [
    {
      name: "Today_Lab",
      count: data?.TodayLab,
    },
    {
      name: "this_Week_Lab",
      count: data?.thisWeekLab,
    },
    {
      name: "this_Month_Lab",
      count: data?.thisMonthLab,
    },
  ];
  const ImagingReport = [
    {
      name: "Today_Imaging",
      count: data?.TodayImage,
    },
    {
      name: "this_Week_Imaging",
      count: data?.thisWeekImage,
    },
    {
      name: "this_Month_Imaging",
      count: data?.thisMonthImage,
    },
  ];
  console.log(data);
  return (
    <div
      /* style={{ fontSize: 100 }} */
      className="h-100 mb-4" /* w-100 d-flex justify-content-center align-items-center */
    >
      <div className="d-flex flex-sm-wrap flex-column flex-sm-row gap-3">
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
        />
        <DashbordWidget
          logo={
            <FaFileMedical
              size={40}
              color="rgb(48, 171, 185)"
              //className="text-danger"
            />
          }
          amount={data?.thisWeekVisit}
          title="This Week visit"
          borderColor="rgb(48, 171, 185)"
        />
        <DashbordWidget
          logo={
            <FaList
              size={40}
              color="rgb(234, 93, 93)"
              //className="text-danger"
            />
          }
          amount={data?.waitingList}
          title="Patient Waiting"
          borderColor="rgb(234, 93, 93)"
        />
        <DashbordWidget
          logo={
            <FaAccessibleIcon
              size={40}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.activePatient}
          title="active patient"
          borderColor="rgb(252, 173, 115)"
        />
      </div>
      <hr />
      {/* <div className="">
        <Row>
          <Col md={4}>
            <div className="p-1 boxshadow mb-3 mb-md-0 bg-white borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.TodayLab}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                Today's Lab investigation
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-1 boxshadow mb-3 mb-md-0 borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisWeekLab}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                This Week's Lab investigation
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-1 boxshadow mb-3 mb-md-0 borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisMonthLab}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                This Month's Lab investigation
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4}>
            <div className="p-1 mb-3 mb-md-0 boxshadow bg-white borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.TodayImage}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 18 }} className="fw-500">
                Today's Imaging investigation
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-1 mb-3 mb-md-0 boxshadow bg-white borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisWeekImage}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 18 }} className="fw-500">
                This Week's Imaging investigation
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-1 mb-3 mb-md-0 boxshadow bg-white borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisMonthImage}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 18 }} className="fw-500">
                This Month's Imaging investigation
              </p>
            </div>
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
            data={labReport}
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
        </ResponsiveContainer>
        <ResponsiveContainer className="mt-5" width="100%" height={350}>
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
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoctorDashboard;
