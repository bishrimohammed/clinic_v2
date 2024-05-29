import React from "react";
import { useGetDashBoardData } from "../../hooks/useGetDashBoardData";
import { useGetDashboardDataDoctorWorkingHour } from "../../hooks/useGetDashboardDataDoctorWorkingHour";
import DashboardUpcomingAppointment from "./DashboardUpcomingAppointment";
import DashboardUpcomigVisitTable from "./DashboardUpcomigVisitTable";
import DashboardDoctorWorkingHour from "./DashboardDoctorWorkingHour";
import DashbordWidget from "../widget/DashbordWidget";
import { FaUser } from "react-icons/fa";
import {
  FaUserDoctor,
  FaTruckMedical,
  FaAccessibleIcon,
} from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
// import { FaTruckMedical } from "react-icons/fa6";
const GeneralDashboard = () => {
  const { data } = useGetDashBoardData();
  // const {} = useGetDashboardDataDoctorWorkingHour();
  console.log(data);
  const overFlowStyle = {
    overflowX: "auto",
    overflowY: "hidden",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  };
  return (
    <div className="mb-3">
      <div
        style={overFlowStyle}
        className="d-flex gap-3 bg-hrun-content  bg-hrun-box bg-white mb-2 borderRadius7px  p-3  gap-3"
      >
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
            <FaUserDoctor
              size={40}
              color="rgb(22, 187, 229)"
              //className="text-danger"
            />
          }
          amount={data?.totalDoctor}
          title="Doctors"
          borderColor="rgb(22, 187, 229)"
        />
        <DashbordWidget
          logo={
            <CiCalendarDate
              size={40}
              color="rgb(234, 93, 93)"
              //className="text-danger"
            />
          }
          amount={data?.totalUpcomingPatientVisit}
          title="Appointments"
          borderColor="rgb(234, 93, 93)"
        />
        <DashbordWidget
          logo={
            <FaTruckMedical
              size={40}
              color="rgb(255, 0, 200)"
              //className="text-danger"
            />
          }
          amount={data?.totalUpcomingPatientVisit}
          title="Today's Visit"
          borderColor="rgb(255, 0, 200)"
        />
        <DashbordWidget
          logo={
            <FaAccessibleIcon
              size={40}
              color="rgb(10, 10, 255)"
              //className="text-danger"
            />
          }
          amount={data?.totalPatient}
          title="Total Patient"
          borderColor="rgb(10, 10, 255)"
        />
      </div>
      <div className="d-flex flex-md-row flex-column gap-3">
        <div className="left flex-grow-1">
          <DashboardUpcomigVisitTable />
          <DashboardDoctorWorkingHour />
        </div>
        <div className="right flex-grow-0 bg-hrun-box hrunboxshadow">
          <DashboardUpcomingAppointment />
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;
