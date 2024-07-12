import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetRefferalNote } from "../../patient/hooks/consultationHooks/plan/useGetRefferalNote";
import { Spinner, Table } from "react-bootstrap";
import ViewReferralNote from "../../patient/consultation/plan/ViewReferralNote";
import { IoReloadOutline } from "react-icons/io5";

const ReferralNoteTab = () => {
  const { state } = useLocation();
  const {
    data: referralnote,
    isRefetching,
    refetch,
  } = useGetRefferalNote(state.id);
  const [showViewReferralNoteNote, setShowViewReferralNoteNote] = useState({
    show: false,
    referralNote: null,
  });

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
      <Table responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Hospital Name</th>
            <th>Department</th>
            <th>Clinical Finding</th>
            <th>Referral Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {referralnote?.map((referralNote, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{referralNote.referral_to}</td>
              <td>{referralNote.department}</td>
              <td>{referralNote.clinical_finding}</td>
              <td>
                {new Date(referralNote.referral_date)
                  .toISOString()
                  .substring(0, 10)}
              </td>
              <td>{referralNote.reason_for_referral}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-info ms-2"
                  onClick={() => {
                    setShowViewReferralNoteNote({
                      show: true,
                      referralNote,
                    });
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showViewReferralNoteNote.show && (
        <ViewReferralNote
          show={showViewReferralNoteNote.show}
          handleClose={() =>
            setShowViewReferralNoteNote({
              show: false,
              referralNote: null,
            })
          }
          referralNote={showViewReferralNoteNote.referralNote}
        />
      )}
    </div>
  );
};

export default ReferralNoteTab;
