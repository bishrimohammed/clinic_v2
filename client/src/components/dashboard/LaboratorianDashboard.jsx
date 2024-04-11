import DashbordWidget from "../widget/DashbordWidget";
import { useGetDashBoardData } from "../../hooks/useGetDashBoardData";
import { Spinner } from "react-bootstrap";
import { GiMedicalThermometer } from "react-icons/gi";
const LaboratorianDashboard = () => {
  const { data, isFetching, error } = useGetDashBoardData();
  if (isFetching) return <Spinner animation="grow" />;
  if (error) return <div>error : {error.response.data.message}</div>;
  // console.log(data);
  return (
    <div
      /* style={{ fontSize: 100 }} */
      className="h-100 mb-4" /* w-100 d-flex justify-content-center align-items-center */
    >
      <div className="d-flex flex-sm-wrap flex-column flex-sm-row gap-3">
        <DashbordWidget
          logo={
            <GiMedicalThermometer
              size={40}
              color="#B69180"
              //className="text-danger"
            />
          }
          amount={data?.todayLabRequest}
          title="Today Lab Requested"
          borderColor="#B69180"
        />
        <DashbordWidget
          logo={
            <GiMedicalThermometer
              size={40}
              color="rgb(48, 171, 185)"
              //className="text-danger"
            />
          }
          amount={data?.thisWeekLabRequest}
          title="This Week Lab Requested"
          borderColor="rgb(48, 171, 185)"
        />
        <DashbordWidget
          logo={
            <GiMedicalThermometer
              size={40}
              color="rgb(234, 93, 93)"
              //className="text-danger"
            />
          }
          amount={data?.thisMonthLabRequest}
          title="This Month Lab Requested"
          borderColor="rgb(234, 93, 93)"
        />
      </div>
      <hr />
      <div className="">
        {/* <Row>
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
        </Row> */}
      </div>
    </div>
  );
};

export default LaboratorianDashboard;
