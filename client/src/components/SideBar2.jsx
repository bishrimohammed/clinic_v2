import {
  CBadge,
  CNavGroup,
  CNavItem,
  CNavLink,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import React from "react";
import { FaKitMedical } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { changeSidebarShow } from "../store/sidebarSlice";
import SimpleBar from "simplebar-react";
import {
  MdAdminPanelSettings,
  MdOutlineMoneyOffCsred,
  MdSchedule,
  MdSpaceDashboard,
} from "react-icons/md";
import { hasPermission } from "../utils/hasPermission";
import { GiMedicalThermometer, GiUltrasound } from "react-icons/gi";
import { IoIosAnalytics } from "react-icons/io";

const SideBar2 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
  // console.log(sidebarShow);
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(location.pathname.startsWith("/patients"));
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
      className="border-end"
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
      {/* <CSidebarHeader className="border-bottom"> */}
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
      {/* </CSidebarHeader> */}
      <CSidebarNav>
        {/* <SimpleBar> */}
        {/* <CNavTitle>Nav Title</CNavTitle> */}
        <CNavItem>
          <CNavLink to="/" as={NavLink}>
            {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
            <MdSpaceDashboard className="nav-icon" />
            Dashboard
          </CNavLink>
        </CNavItem>
        {(hasPermission("Patient", "read") ||
          hasPermission("visit", "read") ||
          hasPermission("appointment", "read")) && (
          <CNavGroup
            idx="patient management"
            //   visible={location.pathname.startsWith("/patients")}
            visible={true}
            toggler={
              <>
                <FaKitMedical className="nav-icon" /> Patient Management
              </>
            }
          >
            <CNavLink as={NavLink} to="/patients">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Patients
            </CNavLink>
            <CNavLink as={NavLink} to="appointment">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Appointment
            </CNavLink>
            <CNavLink as={NavLink} to="/visit">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Patient Visits
            </CNavLink>
          </CNavGroup>
        )}

        {(hasPermission("user", "read") ||
          hasPermission("employee", "read") ||
          hasPermission("role", "read") ||
          hasPermission("approval setting", "read")) && (
          <CNavGroup
            toggler={
              <>
                <FaKitMedical className="nav-icon" /> User Management
              </>
            }
            idx="user management"
          >
            {hasPermission("employee", "read") && (
              <CNavLink as={NavLink} to="/user/employee">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{" "}
                Employee Management
              </CNavLink>
            )}
            {hasPermission("role", "read") && (
              <CNavLink as={NavLink} to="/user/role">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{" "}
                Role Management
              </CNavLink>
            )}
            {hasPermission("user", "read") && (
              <CNavLink to="/user/account" as={NavLink}>
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Account Management
              </CNavLink>
            )}
            {hasPermission("approval setting", "read") && (
              <CNavLink to="/approvalsetting" as={NavLink}>
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                Approval Setting
              </CNavLink>
            )}
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
            {hasPermission("clinic services", "read") && (
              // <CNavItem
              //   to="/administrations/services"
              //   component={NavLink}
              //   className=""
              // >
              //   Clinic Services Management
              // </CNavItem>
              <CNavLink as={NavLink} to="/administrations/services">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{" "}
                Clinic Services Management
              </CNavLink>
            )}
            {/* <CNavItem to="/administrations/user" component={NavLink}>
                Users
              </CNavItem> */}
            {hasPermission("clinic profile", "read") && (
              // <CNavItem
              //   to="/administrations/setting/editclinicinfo"
              //   component={NavLink}
              // >
              //   Clinic Profile Management
              // </CNavItem>
              <CNavLink
                as={NavLink}
                to="/administrations/setting/editclinicinfo"
              >
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{" "}
                Clinic Profile Management
              </CNavLink>
            )}
            {/* <CNavItem to="/administrations/employee" component={NavLink}>
                Employee Management
              </CNavItem>
              <CNavItem to="/administrations/role" component={NavLink}>
                Role Management
              </CNavItem> */}
            {/* <CNavItem to="/administrations/fieldconfig" component={NavLink}>
                Clinic Field Configuration
              </CNavItem> */}
            <CNavLink as={NavLink} to="/administrations/fieldconfig">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Clinic Field Configuration
            </CNavLink>
            {/* <CNavItem to="/administrations/creditcompany" component={NavLink}>
                Clinic Credit Service
              </CNavItem> */}
            <CNavLink as={NavLink} to="/administrations/creditcompany">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Clinic Credit Service
            </CNavLink>
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
            <CNavLink to="/Scheduling/staffworkinghour" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Staff Working Hour
            </CNavLink>
            <CNavLink to="/Scheduling/duty" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Duty Management
            </CNavLink>
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
            {/* <CNavItem to="/lab" component={NavLink}>
                Pending Lab
              </CNavItem> */}
            <CNavLink to="/lab" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Pending Lab
            </CNavLink>
            {hasPermission("External Lab Service Result", "read") && (
              <CNavLink to="/lab/external" as={NavLink}>
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>
                External Service
              </CNavLink>
            )}

            <CNavLink to="/lab/completed" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Completed Lab
            </CNavLink>
            {/* <CNavItem to="/lab/completed" component={NavLink}>
                Completed Lab
              </CNavItem> */}
          </CNavGroup>
        )}
        {currentUser.role?.name === "laboratorian" && (
          <CNavGroup
            idx="imaging"
            visible={location.pathname.startsWith("/imaging")}
            toggler={navLink(
              "Imaging",
              // <CIcon icon={cilPuzzle} customClassName="nav-icon" />
              <GiUltrasound className="nav-icon" />
            )}
          >
            {/* <CNavItem to="/lab" component={NavLink}>
                Pending Lab
              </CNavItem> */}
            <CNavLink to="/imaging" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Pending Imaging
            </CNavLink>
            <CNavLink to="/imaging/completed" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Completed Imaging
            </CNavLink>
            {/* <CNavItem to="/lab/completed" component={NavLink}>
                Completed Lab
              </CNavItem> */}
          </CNavGroup>
        )}
        {hasPermission("report", "read") && (
          <CNavGroup
            idx="report"
            //   visible={location.pathname.startsWith("/patients")}
            visible={true}
            toggler={
              <>
                <IoIosAnalytics className="nav-icon" /> Report
              </>
            }
          >
            <CNavLink as={NavLink} to="/report/financial">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Financial Report
            </CNavLink>
            <CNavLink as={NavLink} to="/report/patient">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Patient data report
            </CNavLink>
            <CNavLink as={NavLink} to="/report/doctor">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>{" "}
              Doctor visit report
            </CNavLink>
          </CNavGroup>
        )}
        {/* <CNavItem>
          <CNavLink to="/approvalrequests" as={NavLink}>
            <MdSpaceDashboard className="nav-icon" />
            Approval Requests
          </CNavLink>
        </CNavItem> */}

        {hasPermission("View lab Result", "read") && (
          <CNavItem>
            <CNavLink to="/medicaloverview" as={NavLink}>
              {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
              <MdSpaceDashboard className="nav-icon" />
              Medical Record Overview
            </CNavLink>
          </CNavItem>
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
            <CNavLink to="/payments" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              Outstanding Payments
            </CNavLink>
            <CNavLink to="/payments/externalservicepayments" as={NavLink}>
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              External Service Payments
            </CNavLink>

            {/* <CNavItem to="/billings/prices" component={NavLink}>
                Prices
              </CNavItem> */}
          </CNavGroup>
        )}
        {hasPermission("nurse treatment", "read") && (
          <CNavItem>
            <CNavLink to="/nursetreatment" as={NavLink}>
              {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
              <MdSpaceDashboard className="nav-icon" />
              Nurse Treatment
            </CNavLink>
          </CNavItem>
        )}
        {hasPermission("external service", "read") && (
          <CNavItem>
            <CNavLink to="/externalservice" as={NavLink}>
              {/* <CIcon icon={cilSpeedometer} customClassName="nav-icon" /> */}
              <MdSpaceDashboard className="nav-icon" />
              External Service
            </CNavLink>
          </CNavItem>
        )}
        {/* </SimpleBar> */}
      </CSidebarNav>
      {/* <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader> */}
    </CSidebar>
  );
};

export default SideBar2;
