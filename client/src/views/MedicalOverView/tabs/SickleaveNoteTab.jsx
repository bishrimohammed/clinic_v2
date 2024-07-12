import React, { useState } from "react";
import { useGetSickNote } from "../../patient/hooks/consultationHooks/plan/useGetSickNote";
import { useLocation } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import ViewSickNote from "../../patient/consultation/plan/ViewSickNote";
import { IoReloadOutline } from "react-icons/io5";

const SickleaveNoteTab = () => {
  const { state } = useLocation();
  const { data: sicknote, isRefetching, refetch } = useGetSickNote(state.id);
  const [showViewSickNoteNote, setShowViewSickNoteNote] = useState({
    show: false,
    sickNote: null,
  });
  //   console.log(sicknote);
  return (
    <div>
      <div className="d-flex justify-content-end gap-2 align-items-center w-100 mb-2  mt-2">
        <button
          disabled={isRefetching}
          onClick={refetch}
          type="button"
          className="btn btn-success btn-sm d-flex align-items-center gap-2 me-3 "
        >
          {/* <IoReloadOutline /> */}
          {isRefetching ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <IoReloadOutline />
          )}
          Reload
        </button>
      </div>
      <Table striped bordered responsive className="mt-2">
        <thead>
          <tr>
            <th>Diagnosis</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sicknote?.map((s, index) => (
            <tr key={index}>
              <td>
                {s.diagnoses.map((d) => (
                  <p key={d.id + d.diagnosis} className="mb-0">
                    {d.diagnosis} ({d.status})
                  </p>
                ))}
              </td>
              <td>{s.start_date}</td>
              <td>{s.end_date}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-info ms-2"
                  onClick={() => {
                    setShowViewSickNoteNote({
                      show: true,
                      sickNote: s,
                    });
                  }}
                >
                  View
                </button>
                {/* <button
                                  type="button"
                                  className="btn btn-sm btn-warning ms-2"
                                >
                                  Print
                                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showViewSickNoteNote.show && (
        <ViewSickNote
          show={showViewSickNoteNote.show}
          handleClose={() =>
            setShowViewSickNoteNote({ show: false, sickNote: null })
          }
          sickNote={showViewSickNoteNote.sickNote}
        />
      )}
    </div>
  );
};

export default SickleaveNoteTab;
