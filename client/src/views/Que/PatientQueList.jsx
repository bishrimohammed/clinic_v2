import { Button, Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { format } from "date-fns";
import {
  useGetPatientWaitingList,
  usePatientCheckin,
  usePatientCheckout,
} from "./hooks/usePatientWaiting";

const PatientQueList = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const {
    data: waitinglist,
    isLoading,
    isError,
    error,
  } = useGetPatientWaitingList();

  const { mutate: checkinmutate } = usePatientCheckin();
  const { mutate: checkoutmutate } = usePatientCheckout();

  if (isLoading) return <Spinner animation="grow" />;
  if (isError) return <div>error {error.message}</div>;
  console.log(waitinglist[0]);
  return (
    <Container>
      <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
        <h4 className="d-flex justify-content-center align-items-center mb-0">
          Patients queue
        </h4>
        {currentUser.role === "cashier" && (
          <Link to="/patientque/addtoque" className="btn btn-primary">
            Admit Patient
          </Link>
        )}
      </div>
      <hr className="bg-primary my-2" />

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>patient Name</th>
            <th>phone</th>
            <th>visit type</th>
            <th>visit date</th>
            <th>doctor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {waitinglist.length !== 0 ? (
            waitinglist?.map((que, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {`${que.patient?.firstName}`} {que.patient?.middleName}
                </td>
                <td>{que.patient?.address?.phone_1}</td>
                <td>{que.visitType?.name}</td>
                <td>{format(que.assignment_date, "dd/MM/yyyy")}</td>
                <td>
                  {que.doctor?.firstName} {que.doctor?.lastName}
                </td>
                <td>{que.status ? "active" : "inactive"}</td>
                {currentUser.role.name === "doctor" && (
                  <>
                    {/* <td>
                      {que.status === "waiting" ? (
                        <Button
                          onClick={() => checkinmutate(que._id)}
                          variant="primary"
                          disabled={que.status === "checkedout"}
                        >
                          checkin
                        </Button>
                      ) : (
                        <Button
                          onClick={() => checkoutmutate(que._id)}
                          variant="danger"
                          disabled={que.status === "checkedout"}
                        >
                          {que.status === "checkedout"
                            ? "completed"
                            : "checkout"}
                        </Button>
                      )}
                    </td> */}
                    <td>
                      <NavLink to={`/patients/history/${que.medicalRecord_id}`}>
                        <Button>view</Button>
                      </NavLink>
                    </td>
                  </>
                )}
                {currentUser.role.name === "cashier" && (
                  <>
                    <td>
                      <button>transfer</button>
                      <button>cancel</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>no patient is Assigned</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PatientQueList;
