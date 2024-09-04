import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
// React.lazy(() =>  import())
const ExternalLabRequestList = React.lazy(() =>
  import("../views/lab/ExternalLabRequestList")
);
const ExternalServicePayments = React.lazy(() =>
  import("../views/Bill/ExternalServicePayments")
);
const ExternalServicePaymentDetail = React.lazy(() =>
  import("../views/Bill/ExternalServicePaymentDetail")
);
const ViewLabExternalServiceDetail = React.lazy(() =>
  import("../views/externalServices/ViewLabExternalServiceDetail")
);
const FinancialReport = React.lazy(() =>
  import("../views/report/FinancialReport")
);
const PatientDataReport = React.lazy(() =>
  import("../views/report/PatientDataReport")
);
const DoctorPatientVisitReport = React.lazy(() =>
  import("../views/report/DoctorPatientVisitReport")
);
const ExternalService = React.lazy(() =>
  import("../views/externalServices/ExternalService")
);
const ExternalServiceList = React.lazy(() =>
  import("../views/externalServices/ExternalServiceList")
);
const NurseTreatmentList = React.lazy(() =>
  import("../views/nurseTreatment/NurseTreatmentList")
);

const NurseTreatment = React.lazy(() =>
  import("../views/nurseTreatment/NurseTreatment")
);
const ViewMedicalRecordOverView = React.lazy(() =>
  import("../views/MedicalOverView/ViewMedicalRecordOverView")
);
const OverviewList = React.lazy(() =>
  import("../views/MedicalOverView/OverviewList")
);

const OverviewDetail = React.lazy(() =>
  import("../views/MedicalOverView/OverviewDetail")
);
const ApprovalRequests = React.lazy(() =>
  import("../views/Approvalrequests/ApprovalRequests")
);

const ApprovalRequestList = React.lazy(() =>
  import("../views/Approvalrequests/ApprovalRequestList")
);

const ViewBillDetails = React.lazy(() =>
  import("../views/Bill/ViewBillDetails")
);
const DoctorAssignedPatientVisits = React.lazy(() =>
  import("../views/patient visit/DoctorAssignedPatientVisits")
);
const ConsultationPage = React.lazy(() =>
  import("../views/patient/consultation/ConsultationPage")
);
const CreateServiceItems = React.lazy(() =>
  import(
    "../views/Administration/clinic service/serviceItems/CreateServiceItems"
  )
);
const FieldConfig = React.lazy(() =>
  import("../views/Administration/field config/FieldConfig")
);
const FieldConfigList = React.lazy(() =>
  import("../views/Administration/field config/FieldConfigList")
);
const CreditCompany = React.lazy(() =>
  import("../views/Administration/credit company/CreditCompany")
);
const CreditCompanyList = React.lazy(() =>
  import("../views/Administration/credit company/CreditCompanyList")
);
const RegisterCreditCompany = React.lazy(() =>
  import("../views/Administration/credit company/RegisterCreditCompany")
);
const Schedule = React.lazy(() => import("../views/Scheduling/Schedule"));
const StaffWorkingHour = React.lazy(() =>
  import("../views/Scheduling/StaffWorkingHour")
);
const DutyManagement = React.lazy(() =>
  import("../views/Scheduling/DutyManagement")
);
const AddStaffWorkHourForEmployee = React.lazy(() =>
  import("../views/Scheduling/AddStaffWorkHourForEmployee")
);
const CreditCompanyDetail = React.lazy(() =>
  import("../views/Administration/credit company/CreditCompanyDetail")
);
const CreateNewWeekProgram = React.lazy(() =>
  import("../views/Scheduling/duty/CreateNewWeekProgram")
);
const Appointment = React.lazy(() =>
  import("../views/appointment/Appointment")
);
const AppointmentList = React.lazy(() =>
  import("../views/appointment/AppointmentList")
);
const ChangePassword = React.lazy(() =>
  import("../views/pages/ChangePassword")
);
const PatientVisit = React.lazy(() =>
  import("../views/patient visit/PatientVisit")
);
const PatientVisitList = React.lazy(() =>
  import("../views/patient visit/PatientVisitList")
);
const PerformTriage = React.lazy(() =>
  import("../views/patient visit/upcoming/PerformTriage")
);

// jhglbjvjh

//kjhkjhbliu
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
// const ChangePassword = React.lazy(() =>
//   import("../views/profile/ChangePassword")
// );
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
const GeneralDashboard = React.lazy(() =>
  import("./dashboard/GeneralDashboard")
);
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
// const AddLabResult = React.lazy(() =>
//   import("../views/patient/History/logic/AddLabResult")
// );
const AddLabResult = React.lazy(() => import("../views/lab/AddLabResult"));
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
const ApprovalSetting = React.lazy(() =>
  import("../views/Administration/ApprovalSetting/ApprovalSetting")
);

const ApprovalSettingContanier = React.lazy(() =>
  import("../views/Administration/ApprovalSetting/ApprovalSettingContanier")
);
const AppContent = () => {
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(currentUser);
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
                // currentUser.role === "admin" ? (
                //   <AdminDashboard />
                // ) : currentUser.role === "doctor" ? (
                //   <DoctorDashboard />
                // ) : currentUser.role === "cashier" ? (
                //   <CashierDashboard />
                // ) : currentUser.role === "laboratorian" ? (
                //   <LaboratorianDashboard />
                // ) : (
                //   <div />
                // )
                <GeneralDashboard />
              }
            />
          </Route>
          <Route path="/visit" element={<PatientVisit />}>
            <Route
              index
              element={
                currentUser?.role?.name?.toLowerCase() === "doctor" ? (
                  <DoctorAssignedPatientVisits />
                ) : (
                  <PatientVisitList />
                )
              }
            />
            <Route path="view" element={<PerformTriage />} />
          </Route>
          {/* profile */}
          <Route path="profile" element={<Profile />}>
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
          {/* patient */}
          <Route path="patients" element={<Patient />}>
            {/* <Route index element={<PatientList />} /> */}
            <Route index element={<PatientList />} />

            <Route path="newpatient" element={<NewPatient />} />
            <Route path="editpatient" element={<UpdatePatient />} />
            <Route path="assign/:id" element={<AssignPatient />} />
            <Route path="view/:id" element={<PatientDetails />} />

            <Route path="history/:historyId" element={<ConsultationPage />}>
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

          <Route path="/approvalsetting" element={<ApprovalSetting />}>
            <Route index element={<ApprovalSettingContanier />} />
          </Route>

          <Route path="lab" element={<Lab />}>
            <Route index element={<LabRequestedList />} />
            <Route path="external" element={<ExternalLabRequestList />} />
            <Route path="completed" element={<LabCompletedList />} />
            <Route path="addresult" element={<AddLabResult />} />
          </Route>
          <Route path="imaging" element={<Imaging />}>
            <Route index element={<ImagingRequested />} />
            <Route path="completed" element={<ImagingCompleted />} />
          </Route>
          <Route path="payments" element={<Billing />}>
            <Route index element={<Billings />} />
            {/* <Route path="list" element={<Billings />} /> */}
            <Route path="detail" element={<ViewBillDetails />} />

            <Route
              path="externalservicepayments"
              element={<ExternalServicePayments />}
            />
            <Route
              path="externalservicepayments/details"
              element={<ExternalServicePaymentDetail />}
            />
          </Route>

          <Route path="administrations" element={<ClinicService />}>
            <Route path="services" element={<Service />}>
              <Route index element={<ClinicServiceList />} />
              <Route
                path="createserviceitem"
                element={<CreateServiceItems />}
              />
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
            <Route path="fieldconfig" element={<FieldConfig />}>
              <Route index element={<FieldConfigList />} />
            </Route>

            {/* route role */}
            <Route path="role" element={<Role />}>
              <Route index element={<RoleList />} />
              <Route path="createrole" element={<CreateRole />} />
              <Route path="edit/:roleId" element={<UpdateRole />} />
            </Route>
            <Route path="creditcompany" element={<CreditCompany />}>
              <Route index element={<CreditCompanyList />} />
              <Route path="detail" element={<CreditCompanyDetail />} />
              <Route path="create" element={<RegisterCreditCompany />} />
            </Route>
          </Route>
          <Route path="user" element={<User />}>
            <Route path="employee" element={<Employee />}>
              <Route index element={<ViewEmployees />} />
              <Route path="add" element={<AddEmployee />} />
            </Route>
            <Route path="account" element={<UserList />} />
            {/* <Route index element={<UserList />} /> */}
            <Route path="account/newuser" element={<AddUser />} />
            <Route path="account/edit/:userId" element={<UpdateUser />} />

            {/* role */}
            <Route path="role" element={<RoleList />} />
            {/* <Route index element={<RoleList />} /> */}
            <Route path="role/createrole" element={<CreateRole />} />
            <Route path="role/edit/:roleId" element={<UpdateRole />} />
            {/* </Route> */}
            {/* </Route> */}
          </Route>
          <Route path="Scheduling" element={<Schedule />}>
            <Route path="staffworkinghour" element={<StaffWorkingHour />} />
            <Route
              path="staffworkinghour/create"
              element={<AddStaffWorkHourForEmployee />}
            />
            <Route path="duty" element={<DutyManagement />} />
            <Route path="duty/newprogram" element={<CreateNewWeekProgram />} />
          </Route>
          <Route path="report" element={<Report />}>
            <Route path="financial" element={<FinancialReport />} />
            <Route path="patient" element={<PatientDataReport />} />
            <Route path="doctor" element={<DoctorPatientVisitReport />} />
          </Route>
          <Route path="appointment" element={<Appointment />}>
            <Route index element={<AppointmentList />} />
          </Route>
          <Route path="approvalrequests" element={<ApprovalRequests />}>
            <Route index element={<ApprovalRequestList />} />
          </Route>
          <Route path="medicaloverview" element={<ViewMedicalRecordOverView />}>
            <Route index element={<OverviewList />} />
            <Route path="view-detail" element={<OverviewDetail />} />
          </Route>
          <Route path="nursetreatment" element={<NurseTreatment />}>
            <Route index element={<NurseTreatmentList />} />
          </Route>
          <Route path="externalservice" element={<ExternalService />}>
            <Route index element={<ExternalServiceList />} />
            <Route path="detail" element={<ViewLabExternalServiceDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

const AppContentMemoized = React.memo(AppContent);

export default AppContentMemoized;
