import React from "react";
import { useGetProgressNote } from "../hooks/progressNoteHooks/useGetProgressNote";
import { useLocation } from "react-router-dom";
import { Accordion } from "react-bootstrap";

const ProgressNoteHistoryTab = () => {
  const { state } = useLocation();
  const { data } = useGetProgressNote(state.medicalRecord_id);
  // console.log(data);
  return (
    <div>
      {/* <h1>Progress Note History</h1> */}
      {/* <h5 className="mb-3">Progress Note</h5> */}
      <Accordion>
        {data?.map((progressNote, index) => (
          <Accordion.Item key={progressNote.id} eventKey={progressNote.id}>
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100">
                <span>
                  {new Date(progressNote.taken_date)
                    .toISOString()
                    .substring(0, 10)}
                </span>
                <span className="pe-4">
                  {progressNote.doctor.employee.firstName}{" "}
                  {progressNote.doctor.employee.middleName}
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div
                className="  pb-1"
                // style={{ borderBottomStyle: "dashed" }}
              >
                <span className="fw-bold mb-2 border-bottom pe-2 pb-1 text-nowrap ">
                  Problem List{" "}
                </span>
                <p className="pe-4 ps-1">{progressNote.problem_list}</p>
              </div>

              <div
                className=" pb-1"
                // style={{ borderBottomStyle: "dashed" }}
              >
                <span className="fw-bold mb-2 border-bottom pe-2 pb-1 text-nowrap ">
                  Current Management{" "}
                </span>
                <p className="pe-4 ps-1"> {progressNote.current_management}</p>
              </div>

              {/* plan */}

              <div
                className="pb-1"
                // style={{ borderBottomStyle: "dashed" }}
              >
                <span className="fw-bold mb-2 border-bottom pe-2 pb-1 text-nowrap ">
                  Plan{" "}
                </span>
                <p className="pe-4 ps-1"> {progressNote.plan}</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ProgressNoteHistoryTab;
