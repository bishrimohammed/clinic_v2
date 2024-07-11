// import React from "react";
// import { useGetPendingApprovalRequest } from "./hooks/useGetPendingApprovalRequest";
// import { Button, Table } from "react-bootstrap";

// const ApprovalRequestList = () => {
//   const { data } = useGetPendingApprovalRequest();
//   console.log(data);
//   return (
//     <div>
//       <Table bordered>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Approval Type</th>
//             <th>Requester</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((request, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{request.approvalSetting.name}</td>
//               <td>
//                 {request.requestedBy.employee.firstName}{" "}
//                 {request.requestedBy.employee.middleName}{" "}
//               </td>
//               <td>{request.status}</td>
//               <td className="d-flex gap-1">
//                 <Button className="btn-sm" variant="success">
//                   Approve
//                 </Button>
//                 <Button className="btn-sm" variant="danger">
//                   Decline
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           {/* <tr>
//             <td>1</td>
//             <td>Patient Registration</td>
//             <td>John Doe</td>
//             <td>Pending</td>
//             <td className="d-flex gap-1">
//               <Button className="btn-sm" variant="success">
//                 Approve
//               </Button>
//               <Button className="btn-sm" variant="danger">
//                 Decline
//               </Button>
//             </td>
//           </tr> */}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ApprovalRequestList;
