import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CNavGroup,
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// import { RiCalendarScheduleLine } from "react-icons/ri";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { GrSchedule } from "react-icons/gr";
// sidebar nav config
//import navigation from "../_nav";
import { Link, NavLink, useLocation } from "react-router-dom";
// import { cilPuzzle, cilSpeedometer } from "@coreui/icons";
import { changeSidebarShow } from "../store/sidebarSlice";
import { FaKitMedical, FaUser, FaRegCalendarCheck } from "react-icons/fa6";
// import { FaRegCalendarCheck } from "react-icons/fa6";
import { GiMedicalThermometer, GiUltrasound } from "react-icons/gi";
import {
  MdSpaceDashboard,
  MdAssignmentTurnedIn,
  MdAdminPanelSettings,
  MdOutlineMoneyOffCsred,
  MdSchedule,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { hasPermission } from "../utils/hasPermission";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  // console.log(sidebarShow);
  const currentUser = useSelector((state) => state.auth.user);
  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name && name}
      </>
    );
  };
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(
          changeSidebarShow(visible) /* { type: "set", sidebarShow: visible } */
        );
      }}
      style={{
        width: sidebarShow && "17rem",
      }}
    >
      <CSidebarBrand
        style={{
          height: 60,
          backgroundColor: "#9007b6",
          textTransform: "uppercase",
        }}
        className="d-none d-md-flex text-white fw-bold justify-content-center align-items-center"
        to="/"
      >
        Softnet Clinic System
      </CSidebarBrand>
      <CSidebarNav className="px-0">
        <SimpleBar>
          <CNavItem to="/" component={NavLink}>
            {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
            <MdSpaceDashboard className="nav-icon" />
            Dashboard
          </CNavItem>
          {(hasPermission("Patient", "read") ||
            hasPermission("visit", "read")) && (
            <CNavGroup
              idx="patient"
              visible={location.pathname.startsWith("patients")}
              toggler={navLink(
                "Patient Management",

                <FaKitMedical className="nav-icon" />
                // </CIcon>
              )}
            >
              {/* {hasPermission("Patient", "create") && (
                <CNavItem to="/patients/newpatient" component={NavLink}>
                  Add Patient
                </CNavItem>
              )} */}

              <CNavItem to="/patients" component={NavLink}>
                Patient List
              </CNavItem>
              {hasPermission("visit", "read") && (
                <CNavItem to="/visit" component={NavLink}>
                  Patient Visits
                </CNavItem>
              )}
            </CNavGroup>
          )}

          {currentUser.role?.name === "laboratorian" && (
            <CNavGroup
              idx="lab"
              visible={location.pathname.startsWith("lab")}
              toggler={navLink(
                "Lab",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <GiMedicalThermometer className="nav-icon" />
              )}
            >
              <CNavItem to="/lab" component={NavLink}>
                Pending Lab
              </CNavItem>
              <CNavItem to="/lab/completed" component={NavLink}>
                Completed Lab
              </CNavItem>
            </CNavGroup>
          )}

          {currentUser.role?.name === "laboratorian" && (
            <CNavGroup
              idx="imaging"
              visible={location.pathname.startsWith("imaging")}
              toggler={navLink(
                "Imaging",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <GiUltrasound className="nav-icon" />
              )}
            >
              <CNavItem to="/imaging/" component={NavLink}>
                Requested
              </CNavItem>
              <CNavItem to="/imaging/completed" component={NavLink}>
                Completed
              </CNavItem>
            </CNavGroup>
          )}

          {currentUser.role?.name === "cashier" && (
            <CNavGroup
              idx="payments"
              visible={location.pathname.startsWith("payments")}
              toggler={navLink(
                "Payments",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdOutlineMoneyOffCsred className="nav-icon" />
              )}
            >
              <CNavItem to="/payments" component={NavLink}>
                Outstanding Payments
              </CNavItem>

              {/* <CNavItem to="/billings/prices" component={NavLink}>
                Prices
              </CNavItem> */}
            </CNavGroup>
          )}
          {currentUser.role?.name === "admin" && (
            <CNavGroup
              idx="User Management"
              visible={location.pathname.startsWith("report")}
              toggler={navLink(
                "User Management",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <FaUser className="nav-icon" />
              )}
            >
              <CNavItem to="/user/employee" component={NavLink}>
                Employee Management
              </CNavItem>
              <CNavItem to="/user/role" component={NavLink}>
                Role Management
              </CNavItem>
              <CNavItem to="/user/account" component={NavLink}>
                Account Management
              </CNavItem>
              <CNavItem to="/approvalsetting" component={NavLink}>
                Approval Setting
              </CNavItem>
            </CNavGroup>
          )}
          {currentUser.role?.name === "admin" && (
            <CNavGroup
              idx="administrations"
              visible={location.pathname.startsWith("Configurations")}
              toggler={navLink(
                "Clinic Configurations",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdAdminPanelSettings className="nav-icon" />
              )}
            >
              {" "}
              <CNavItem
                to="/administrations/services"
                component={NavLink}
                className=""
              >
                Clinic Services Management
              </CNavItem>
              {/* <CNavItem to="/administrations/user" component={NavLink}>
                Users
              </CNavItem> */}
              <CNavItem
                to="/administrations/setting/editclinicinfo"
                component={NavLink}
              >
                Clinic Profile Management
              </CNavItem>
              {/* <CNavItem to="/administrations/employee" component={NavLink}>
                Employee Management
              </CNavItem>
              <CNavItem to="/administrations/role" component={NavLink}>
                Role Management
              </CNavItem> */}
              <CNavItem to="/administrations/fieldconfig" component={NavLink}>
                Clinic Field Configuration
              </CNavItem>
              <CNavItem to="/administrations/creditcompany" component={NavLink}>
                Clinic Credit Service
              </CNavItem>
            </CNavGroup>
          )}
          {currentUser.role?.name === "admin" && (
            <CNavGroup
              idx="Scheduling"
              visible={location.pathname.startsWith("Scheduling")}
              toggler={navLink(
                "Scheduling",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <MdSchedule className="nav-icon" />
              )}
            >
              // staff Working Hour
              <CNavItem to="/Scheduling/staffworkinghour" component={NavLink}>
                Staff Working Hour
              </CNavItem>
              <CNavItem to="/Scheduling/duty" component={NavLink}>
                Duty Management
              </CNavItem>
            </CNavGroup>
          )}
          {currentUser.role?.name === "admin" && (
            <CNavItem to="/report/billreport" component={NavLink}>
              <TbReportAnalytics className="nav-icon" />
              Report
            </CNavItem>
          )}
          {hasPermission("appointment", "read") && (
            <CNavGroup
              idx="appointment"
              visible={location.pathname.startsWith("Configurations")}
              toggler={navLink(
                "Appointment",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <FaRegCalendarCheck className="nav-icon" />
              )}
            >
              <CNavItem to="/appointment" component={NavLink}>
                Appointment List
              </CNavItem>
            </CNavGroup>
          )}

          {/* {hasPermission("visit", "read") && (
            <CNavGroup
              idx="patientvisit"
              visible={location.pathname.startsWith("visit")}
              toggler={navLink(
                "Patient Visits",
                // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
                <FaRegCalendarCheck className="nav-icon" />
              )}
            >
              <CNavItem to="/visit" component={NavLink}>
                Visits
              </CNavItem>
            </CNavGroup>
          )} */}
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

const SidebarComponent = React.memo(Sidebar);

export default SidebarComponent;
