import { useEffect, Suspense } from "react";

import { Container, ListGroup, Spinner } from "react-bootstrap";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import "simplebar-react/dist/simplebar.min.css";

import { useDispatch, useSelector } from "react-redux";
import { changeSidebarShow } from "../../store/sidebarSlice";
import useMedicalHistory from "./hooks/useMedicalhistory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axiosinstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { AxiosHeaders } from "../../api/useAxiosHeaders";
import { differenceInYears, parseISO } from "date-fns";
const PatientHistoryDetailsC = () => {
  const { historyId } = useParams();
  const dispatch = useDispatch();
  const {
    data: history,
    isPending,
    error,
    isError,
  } = useMedicalHistory(historyId);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname.split("/"));
  const currentUser = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  let header = AxiosHeaders();
  //console.log(header);
  const Mutation = useMutation({
    mutationFn: async (id) => {
      //return alert("skjdfbhj");
      return Axiosinstance.put(
        `/patienthistory/${id}/closehistory`,
        {},
        {
          ...header,
        }
      );
    },
    onSuccess: async (data, variables) => {
      toast.success("The history has been successfully closed");
      queryClient.invalidateQueries({
        queryKey: ["MedicalHistory", variables],
        exact: true,
      });
    },
    onError: (error) => {
      // handle error
      toast.error(error?.response?.data.message);
      console.log(error);
    },
  });

  useEffect(() => {
    dispatch(changeSidebarShow(false));
    return () => {
      dispatch(changeSidebarShow(true));
    };
  }, [dispatch]);
  if (isPending) return <Spinner animation="grow" variant="primary" />;
  if (isError) return <div>error : {error.message}</div>;
  //console.log(isFetching);

  const closeHistoryHandler = () => {
    Mutation.mutate(historyId);
  };
  // console.log(history);
  return (
    <>
      <div className="w-100 h-100 d-flex" style={{ position: "relative" }}>
        <div
          style={{
            width: "16rem",

            // height: "100vh",
            // left: 0,
            // zIndex: 1,
            backgroundColor: "white",
          }}
          className="mb-4 pt-2 mt-2 d-flex flex-column  patientDetailsidebarContainer"
        >
          <div className=" ps-3 d-flex flex-column">
            <>
              <div>
                <span className="mr-1">Name:</span> {history?.patient.firstName}{" "}
                {history?.patient.middleName}
              </div>
              <div>
                <span className="mr-1">Age:</span>{" "}
                {differenceInYears(
                  new Date(),
                  parseISO(history?.patient.birth_date)
                )}{" "}
                years
              </div>
              <div>
                <span className="mr-1">MRN:</span> {history.patient.card_number}
              </div>
              <div>
                <span className="mr-1">Sex:</span> {history?.patient.gender}
              </div>
            </>
          </div>
          <hr className="mb-0" />
          <div
            style={{ height: "100%" }}
            className="patientDetailsidebar  flex-grow-1 "
          >
            <div className="pt-0">
              <ListGroup as="ul">
                {currentUser.role.name === "doctor" && (
                  <>
                    <ListGroup.Item
                      to={`/patients/history/${historyId}`}
                      onClick={() => navigate(`/patients/history/${historyId}`)}
                      style={{ cursor: "pointer" }}
                      active={location.pathname.split("/").length === 4}
                    >
                      History Overview
                    </ListGroup.Item>
                    <ListGroup.Item
                      to={`/patients/history/${historyId}`}
                      onClick={() =>
                        navigate(`/patients/history/${historyId}/note`)
                      }
                      style={{ cursor: "pointer" }}
                      active={location.pathname.endsWith("note")}
                    >
                      Patient Note
                    </ListGroup.Item>
                  </>
                )}
                {(currentUser.role.name === "doctor" ||
                  currentUser.role.name === "cashier" ||
                  currentUser.role.name === "laboratorian") && (
                  <ListGroup.Item
                    to={`/patients/history/${historyId}`}
                    onClick={() =>
                      navigate(`/patients/history/${historyId}/investigation`)
                    }
                    style={{ cursor: "pointer" }}
                    active={location.pathname.includes("investigation")}
                  >
                    investigation
                  </ListGroup.Item>
                )}

                {currentUser.role.name === "doctor" && (
                  <ListGroup.Item
                    to={`/patients/history/${historyId}`}
                    onClick={() =>
                      navigate(`/patients/history/${historyId}/medication`)
                    }
                    style={{ cursor: "pointer" }}
                    active={location.pathname.endsWith("medication")}
                  >
                    Medication
                  </ListGroup.Item>
                )}
                {currentUser.role.name === "doctor" && (
                  <ListGroup.Item
                    to={`/patients/history/${historyId}`}
                    onClick={() =>
                      navigate(`/patients/history/${historyId}/vital`)
                    }
                    style={{ cursor: "pointer" }}
                    active={location.pathname.endsWith("vital")}
                  >
                    Vital Signs
                  </ListGroup.Item>
                )}
                <ListGroup.Item
                  to={`/patients/history/${historyId}`}
                  onClick={() =>
                    navigate(`/patients/history/${historyId}/billdetail`)
                  }
                  style={{ cursor: "pointer" }}
                  active={location.pathname.endsWith("billdetail")}
                >
                  Bill Info
                </ListGroup.Item>

                <ListGroup.Item
                  to={`/patients/history/${historyId}`}
                  onClick={() =>
                    navigate(`/patients/view/${history?.patientId._id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  Patient OverView
                </ListGroup.Item>

                {currentUser.role.name === "doctor" && (
                  <div
                    onClick={closeHistoryHandler}
                    // onClick={() => alert("b hb h")}
                    style={{
                      pointerEvents: history.status ? "initial" : "none",
                      cursor: history.status ? "pointer" : "no-drop",
                    }}
                    className={`px-3 py-2 curserpointer closehistorybutton ${
                      !history.status
                        ? "border-start border-start-1 border-2 border-danger text-danger"
                        : ""
                    } `}
                  >
                    {history.status ? " Close History" : "History Closed"}
                  </div>
                )}
              </ListGroup>
            </div>
          </div>
        </div>
        <div
          className=" flex-grow-1 ps-2 minHeight100"
          style={{
            // marginLeft: "16rem",
            overflowX: "hidden",
            position: "relative",
            minHeight: "80vh",
          }}
        >
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <Container className="py-2 px-2 mb-5">
              <div className="p-2  bg-hrun-box hrunboxshadow">
                <Outlet />
              </div>
            </Container>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default PatientHistoryDetailsC;
