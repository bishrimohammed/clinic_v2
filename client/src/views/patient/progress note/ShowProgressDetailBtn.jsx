import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ViewProgressNoteDetail from "./ViewProgressNoteDetail";

const ShowProgressDetailBtn = ({ progressNoteId, progressNote }) => {
  const [showProgressDetail, setShowProgressDetail] = useState(false);
  //   console.log(progressNote);
  return (
    <>
      <Button
        onClick={() => setShowProgressDetail(true)}
        size="sm"
        variant="primary"
      >
        show detail
      </Button>
      {showProgressDetail && (
        <ViewProgressNoteDetail
          progressNoteId={progressNoteId}
          progressNote={progressNote}
          show={showProgressDetail}
          handleClose={() => setShowProgressDetail(false)}
        />
      )}
    </>
  );
};

export default ShowProgressDetailBtn;
