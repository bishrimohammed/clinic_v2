import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { CSpinner } from "@coreui/react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
const Role = React.lazy(() => import("../views/Administration/Role/Role"));
const RoleList = React.lazy(() =>
  import("../views/Administration/Role/RoleList")
);
const CreateRole = React.lazy(() =>
  import("../views/Administration/Role/CreateRole")
);
const UpdateRole = React.lazy(() =>
  import("../views/Administration/Role/UpdateRole")
);
const ViewServiceItems = React.lazy(() =>
  import("../views/Administration/clinic service/ViewServiceItems")
);
const Service = React.lazy(() =>
  import("../views/Administration/clinic service/Service")
);
const Report = React.lazy(() => import("../views/report/Report"));
const BillReport = React.lazy(() => import("../views/report/BillReport"));
const AssignPatient = React.lazy(() =>
  import("../views/patient/AssignPatient")
);

const EditClinicInfo = React.lazy(() =>
  import("../views/Administration/clinic setting/EditClinicInfo")
);
const Employee = React.lazy(() =>
  import("../views/Administration/employee/Employee")
);
const AddEmployee = React.lazy(() =>
  import("../views/Administration/employee/AddEmployee")
);
const ViewEmployees = React.lazy(() =>
  import("../views/Administration/employee/ViewEmployees")
);

const AddLabInvestigation = React.lazy(() =>
  import("../views/patient/History/investigation/AddLabInvestigation")
);
const AddImageInvestigation = React.lazy(() =>
  import("../views/patient/History/investigation/AddImageInvestigation")
);
const AddImagingResult = React.lazy(() =>
  import("../views/patient/History/logic/AddImagingResult")
);
const ClinicService = React.lazy(() =>
  import("../views/Administration/clinic service/ClinicService")
);
const CreateLabService = React.lazy(() =>
  import("../views/Administration/clinic service/new service/CreateLabService")
);
const CreateImagingService = React.lazy(() =>
  import(
    "../views/Administration/clinic service/new service/CreateImagingService"
  )
);
const ChangePassword = React.lazy(() =>
  import("../views/profile/ChangePassword")
);
const Profile = React.lazy(() => import("../views/profile/Profile"));
const ClinicServiceList = React.lazy(() =>
  import("../views/Administration/clinic service/ClinicServiceList")
);

const AddMedicine = React.lazy(() =>
  import("../views/Administration/clinic service/new service/AddMedicine")
);
const UpdateLabService = React.lazy(() =>
  import("../views/Administration/clinic service/update/UpdateLabService")
);
const UpdateImagingService = React.lazy(() =>
  import("../views/Administration/clinic service/update/UpdateImagingService")
);
const UpdateMedicine = React.lazy(() =>
  import("../views/Administration/clinic service/update/UpdateMedicine")
);
const AddClinicInfo = React.lazy(() =>
  import("../views/Administration/clinic setting/AddClinicInfo")
);
const ClinicInformation = React.lazy(() =>
  import("../views/Administration/clinic setting/ClinicInformation")
);
const LaboratorianDashboard = React.lazy(() =>
  import("./dashboard/LaboratorianDashboard")
);

const Imaging = React.lazy(() => import("../views/imaging/Imaging"));
const ImagingRequested = React.lazy(() =>
  import("../views/imaging/ImagingRequested")
);
const ImagingCompleted = React.lazy(() =>
  import("../views/imaging/ImagingCompleted")
);
//React.lazy(() => import(" "));
const AdminDashboard = React.lazy(() => import("./dashboard/AdminDashboard"));
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
//import AdminDashboard from "./dashboard/AdminDashboard";
const DoctorDashboard = React.lazy(() => import("./dashboard/DoctorDashboard"));
const CashierDashboard = React.lazy(() =>
  import("./dashboard/CashaierDashboard")
);
//import CashierDashboard from "./dashboard/CashaierDashboard";

const User = React.lazy(() => import("../views/user/User"));
const UserList = React.lazy(() => import("../views/user/UserList"));
const AddUser = React.lazy(() => import("../views/user/AddUser"));
const UpdateUser = React.lazy(() => import("../views/user/UpdateUser"));
const Patient = React.lazy(() => import("../views/patient/Patient"));
const PatientList = React.lazy(() => import("../views/patient/PatientList"));
const NewPatient = React.lazy(() => import("../views/patient/NewPatient"));
const UpdatePatient = React.lazy(() =>
  import("../views/patient/UpdatePatient")
);
const PatientDetails = React.lazy(() =>
  import("../views/patient/PatientDetails")
);

// const AddLabRequest = React.lazy(() => import("../views/lab/AddLabRequest"));
// const PatientHistoryDetails = React.lazy(() =>
//   import("../views/patient/PatientHistoryDetails")
// );
const PatientQue = React.lazy(() => import("../views/Que/PatientQue"));
const AddpatientToQue = React.lazy(() =>
  import("../views/Que/AddpatientToQue")
);
const PatientQueList = React.lazy(() => import("../views/Que/PatientQueList"));
const PatientHistoryDetailsC = React.lazy(() =>
  import("../views/patient/PatientHistoryDetailsC")
);
//import PatientHistoryDetailsC from "../views/patient/PatientHistoryDetailsC";
const PatientNote = React.lazy(() =>
  import("../views/patient/History/PatientNote")
);
const HistoryOverview = React.lazy(() =>
  import("../views/patient/History/history overview/HistoryOverview")
);
const Investigation = React.lazy(() =>
  import("../views/patient/History/Investigation")
);
const Procedure = React.lazy(() =>
  import("../views/patient/History/Procedure")
);
const VitalSigns = React.lazy(() =>
  import("../views/patient/History/VitalSigns")
);
const Lab = React.lazy(() => import("../views/lab/Lab"));
const LabRequestedList = React.lazy(() =>
  import("../views/lab/LabRequestedList")
);
const LabCompletedList = React.lazy(() =>
  import("../views/lab/LabCompletedList")
);
const AddLabResult = React.lazy(() =>
  import("../views/patient/History/logic/AddLabResult")
);
const ViewLabResult = React.lazy(() =>
  import("../views/patient/History/logic/ViewLabResult")
);
const Billing = React.lazy(() => import("../views/Bill/Billing"));
const Billings = React.lazy(() => import("../views/Bill/Billings"));
const BillDetails = React.lazy(() =>
  import("../views/patient/History/BillDetails")
);
const Addprescription = React.lazy(() =>
  import("../views/patient/History/logic/Addprescription")
);

const AppContent = () => {
  const currentUser = useSelector((state) => state.auth.user);
  // console.log("content");
  return (
    <>
      <Suspense fallback={<Spinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route
              index
              element={
                // <CashierDashboard />
                currentUser.role === "admin" ? (
                  <AdminDashboard />
                ) : currentUser.role === "doctor" ? (
                  <DoctorDashboard />
                ) : currentUser.role === "cashier" ? (
                  <CashierDashboard />
                ) : currentUser.role === "laboratorian" ? (
                  <LaboratorianDashboard />
                ) : (
                  <div />
                )
              }
            />
          </Route>

          {/* profile */}
          <Route path="profile" element={<Profile />}>
            <Route path="changepassword" element={<ChangePassword />} />
            {/* <Route path="newuser" element={<AddUser />} />
            <Route path="edit/:id" element={<UpdateUser />} /> */}
          </Route>
          {/* patient */}
          <Route path="patients" element={<Patient />}>
            <Route index element={<PatientList />} />
            <Route index path="patientlist" element={<PatientList />} />

            <Route path="newpatient" element={<NewPatient />} />
            <Route path="editpatient/:id" element={<UpdatePatient />} />
            <Route path="assign/:id" element={<AssignPatient />} />
            <Route path="view/:id" element={<PatientDetails />} />

            <Route
              path="history/:historyId"
              element={<PatientHistoryDetailsC />}
            >
              <Route index element={<HistoryOverview />} />
              <Route path="note" element={<PatientNote />} />
              <Route path="investigation" element={<Investigation />} />
              <Route path="procedure" element={<Procedure />} />
              <Route path="vital" element={<VitalSigns />} />
              <Route
                path="investigation/orderlab"
                element={<AddLabInvestigation />}
              />
              <Route
                path="investigation/orderimage"
                element={<AddImageInvestigation />}
              />
              <Route path="addlabresult" element={<AddLabResult />} />
              <Route path="addimagingresult" element={<AddImagingResult />} />
              <Route path="viewlabresult" element={<ViewLabResult />} />
              <Route path="billdetail" element={<BillDetails />} />
              <Route path="medication" element={<Addprescription />} />
            </Route>
          </Route>

          <Route path="patientque" element={<PatientQue />}>
            <Route index path="list" element={<PatientQueList />} />
            <Route path="addtoque" element={<AddpatientToQue />} />
          </Route>
          <Route path="lab" element={<Lab />}>
            <Route index element={<LabRequestedList />} />
            <Route path="completed" element={<LabCompletedList />} />
          </Route>
          <Route path="imaging" element={<Imaging />}>
            <Route index element={<ImagingRequested />} />
            <Route path="completed" element={<ImagingCompleted />} />
          </Route>
          <Route path="billings" element={<Billing />}>
            <Route index element={<Billings />} />
            <Route path="list" element={<Billings />} />
          </Route>

          <Route path="administrations" element={<ClinicService />}>
            <Route path="services" element={<Service />}>
              <Route index element={<ClinicServiceList />} />
              <Route path="createlabservice" element={<CreateLabService />} />
              <Route path="viewserviceitems" element={<ViewServiceItems />} />
              <Route
                path="createimagingservice"
                element={<CreateImagingService />}
              />
              <Route path=":labId/editlab" element={<UpdateLabService />} />
              <Route
                path=":imagingId/editimaging"
                element={<UpdateImagingService />}
              />
              <Route path="addmedicine" element={<AddMedicine />} />
              <Route
                path=":medicineId/editmedicine"
                element={<UpdateMedicine />}
              />
            </Route>

            <Route path="user" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="newuser" element={<AddUser />} />
              <Route path="edit/:userId" element={<UpdateUser />} />
            </Route>
            <Route path="setting/addclinicinfo" element={<AddClinicInfo />} />
            <Route path="setting/editclinicinfo" element={<EditClinicInfo />} />
            <Route
              path="setting/viewclinicinfo"
              element={<ClinicInformation />}
            />
            <Route path="employee" element={<Employee />}>
              <Route index element={<ViewEmployees />} />
              <Route path="add" element={<AddEmployee />}></Route>
            </Route>

            {/* route role */}
            <Route path="role" element={<Role />}>
              <Route index element={<RoleList />} />
              <Route path="createrole" element={<CreateRole />} />
              <Route path="edit/:roleId" element={<UpdateRole />} />
            </Route>
          </Route>

          <Route path="report" element={<Report />}>
            <Route path="billreport" element={<BillReport />} />
          </Route>
          {/*  </Route> */}

          {/*  <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

const AppContentMemoized = React.memo(AppContent);

export default AppContentMemoized;
