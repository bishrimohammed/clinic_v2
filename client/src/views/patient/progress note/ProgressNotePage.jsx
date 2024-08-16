import React, { useRef, useState } from "react";
import { Button, Spinner, Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressNoteTab from "./ProgressNoteTab";
import ProgressNoteHistoryTab from "./ProgressNoteHistoryTab";
import ConfirmCancelModal from "./ConfirmCancelModal";
import { useSaveProgressForLater } from "../hooks/progressNoteHooks/useSaveProgressForLater";
import { useGetSavedForLaterProgressNote } from "../hooks/progressNoteHooks/useGetSavedForLaterProgressNote";
import FinishProgressNoteBtn from "./FinishProgressNoteBtn";

const ProgressNotePage = ({ changeVisibleContent }) => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { data } = useGetSavedForLaterProgressNote(state.medicalRecord_id);
  // console.log(data);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFinishProgressNoteModal, setShowFinishProgressNoteModal] =
    useState(false);
  const { mutate, isPending } = useSaveProgressForLater();

  const progressNoteRef = useRef(null);

  const handleSaveForLater = () => {
    const progressNoteData = progressNoteRef.current.getSaveForLaterData();
    const Data = {
      formData: progressNoteData,
      medicalRecord_id: state.medicalRecord_id,
    };
    mutate(Data);
    console.log(progressNoteData);
  };
  const resetHandler = () => {
    progressNoteRef.current.resetData();

    // setChildData([]);
  };

  const changeVisibleContentHandler = () => {
    changeVisibleContent("consultation");
  };
  return (
    <div>
      <div className="d-flex mt-2 justify-content-between gap-2  pb-3 top-buttons">
        <div className=" p-2  d-flex gap-3 align-items-center">
          <IoMdArrowRoundBack
            className="cursorpointer"
            size={22}
            style={{ cursor: "pointer" }}
            // onClick={() => navigate(-1)}
            onClick={changeVisibleContentHandler}
          />
          <h5 className="mb-0">Back to Consultation</h5>
        </div>
        <div className=" d-flex gap-2">
          <Button
            variant="danger"
            className="btn-sm"
            // disabled={
            //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
            //   isPending
            // }
            // onClick={() => setShowCancelTriageModal(true)}
            onClick={() => setShowCancelModal(true)}
          >
            Cancel
          </Button>
          <Button
            // disabled={isPending}
            onClick={handleSaveForLater}
            // disabled={isPending}
            variant="warning"
            type="button"
            className="btn-sm text-white"
          >
            {isPending && <Spinner size="sm" animation="border" />}
            Save for Later
          </Button>
          {/* <Button
            // form="traigeForm"
            // formTarget="traigeForm"
            className="btn-sm"
            // type="submit"
            variant="success"
            // disabled={isPending}
            type="button"
            // onClick={() => set(true)}
          >
            {isPending && <Spinner size="sm" animation="border" />}
            Finish
          </Button> */}
          <FinishProgressNoteBtn />
        </div>
      </div>
      <Tabs
        defaultActiveKey="Symptoms"
        id="uncontrolled-tab-example"
        className="mb-3 mt-2 progressTab  border-bottom border-top"
        variant="underline"
        as="div"
        // style={{ color: "white" }}
        // fill
      >
        <Tab eventKey="Symptoms" title="Progress Note">
          {/* <ChiefComplaint ref={chiefComplaintRef} /> */}
          <ProgressNoteTab ref={progressNoteRef} savedforLaterData={data} />
        </Tab>
        <Tab eventKey="Examination" title="History">
          {/* <PhysicalExaminationTab ref={ExaminationRef} /> */}
          <ProgressNoteHistoryTab />
        </Tab>
      </Tabs>
      {showCancelModal && (
        <ConfirmCancelModal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          resetHandler={resetHandler}
        />
      )}
      {showFinishProgressNoteModal && (
        <ConfirmCancelModal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          resetHandler={resetHandler}
        />
      )}
    </div>
  );
};

export default ProgressNotePage;
