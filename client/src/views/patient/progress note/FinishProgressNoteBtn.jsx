import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FinishProgressNoteModal from "./FinishProgressNoteModal";

const FinishProgressNoteBtn = () => {
  const [showFinishProgressNoteModal, setShowFinishProgressModal] =
    useState(false);
  return (
    <>
      <Button
        size="sm"
        // type="submit"
        variant="success"
        // disabled={isPending}
        type="button"
        onClick={() => setShowFinishProgressModal(true)}
      >
        {/* {isPending && <Spinner size="sm" animation="border" />} */}
        Finish
      </Button>
      {showFinishProgressNoteModal && (
        <FinishProgressNoteModal
          show={showFinishProgressNoteModal}
          handleClose={() => setShowFinishProgressModal(false)}
        />
      )}
    </>
  );
};

export default FinishProgressNoteBtn;
