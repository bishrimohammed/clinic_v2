import DashbordWidget from "../widget/DashbordWidget";
import {
  FaAccessibleIcon,
  FaFileMedical,
  FaUserDoctor,
  FaUser,
} from "react-icons/fa6";

import { useGetDashBoardData } from "../../hooks/useGetDashBoardData";
import { Col, Row, Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const { data, isFetching, error } = useGetDashBoardData();
  if (isFetching) return <Spinner animation="grow" />;
  if (error) return <div>error : {error.response.data.message}</div>;
  return (
    <div
      /* style={{ fontSize: 100 }} */
      className="h-100 " /* w-100 d-flex justify-content-center align-items-center */
    >
      <div className="d-flex bg-hrun-content borderRadius7px  p-3 flex-wrap gap-3">
        <DashbordWidget
          logo={
            <FaUser
              size={40}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.totalUser}
          title="total Users"
          borderColor="rgb(252, 173, 115)"
        />
        <DashbordWidget
          logo={
            <FaUser
              size={40}
              color="rgb(22, 187, 229)"
              //className="text-danger"
            />
          }
          amount={data?.activeUser}
          title="Active Users"
          borderColor="rgb(22, 187, 229)"
        />{" "}
        <DashbordWidget
          logo={
            <FaUserDoctor
              size={40}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.activePatient}
          title="Total patients"
          borderColor="rgb(252, 173, 115)"
        />{" "}
        {/* <DashbordWidget
          logo={
            <FaAccessibleIcon
              size={70}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.todayVisit}
          title="Total patients"
        />
        <DashbordWidget
          logo={
            <FaAccessibleIcon
              size={70}
              color="rgb(252, 173, 115)"
              //className="text-danger"
            />
          }
          amount={data?.todayVisit}
          title="Total patients"
        /> */}
      </div>
      <hr />
      <div className="bg-hrun-content p-3">
        <Row>
          <Col>
            <div className="p-2 boxshadow borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.todayVisit}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                Today's Visit
              </p>
            </div>
          </Col>
          <Col>
            <div className="p-2 boxshadow borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisWeekVisit}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                This Week's Visit
              </p>
            </div>
          </Col>
          <Col>
            <div className="p-2 boxshadow borderRadius7px border-color text-center">
              <h3
                className="mb-1"
                style={{ fontSize: 30, color: "rgb(59, 83, 110)" }}
              >
                {data?.thisMonthVisit}
              </h3>

              <p style={{ color: "#b2b5c0", fontSize: 19 }} className="fw-500">
                This Month's Visit
              </p>
            </div>
          </Col>
        </Row>
        {/*  <PaymentWidget amount={data?.todayVisit} title="Today's Visit" />{" "}
        <PaymentWidget amount={data?.thisWeekVisit} title="This Week's Visit" />{" "}
        <PaymentWidget
          amount={data?.thisMonthVisit}
          title="This Month's Visit"
        />{" "}
        <PaymentWidget amount={data?.todayVisit} title="This Year's Revenue" /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
