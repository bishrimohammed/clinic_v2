import React, { useRef } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProgressNoteTab from "./ProgressNoteTab";
import ProgressNoteHistoryTab from "./ProgressNoteHistoryTab";

const ProgressNotePage = ({ changeVisibleContent }) => {
  const navigate = useNavigate();
  //   const [childData, setChildData] = useState([]);
  const progressNoteRef = useRef(null);

  const handleSaveForLater = () => {
    const progressNoteData = progressNoteRef.current.getSaveForLaterData();

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
          <h5 className="mb-0">Back</h5>
        </div>
        <div className=" d-flex gap-2">
          <Button
            variant="danger"
            // disabled={
            //   !localStorage.getItem(`medical_${state.medicalRecord_id}`) ||
            //   isPending
            // }
            // onClick={() => setShowCancelTriageModal(true)}
            onClick={resetHandler}
          >
            Cancel
          </Button>
          <Button
            // disabled={isPending}
            onClick={handleSaveForLater}
            variant="warning"
          >
            Save for Later
          </Button>
          <Button
            form="traigeForm"
            // formTarget="traigeForm"
            type="submit"
            variant="success"
            // disabled={isPending}
          >
            {/* {isPending && <Spinner size="sm" animation="border" />} */}
            Finish
          </Button>
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
          <ProgressNoteTab ref={progressNoteRef} />
        </Tab>
        <Tab eventKey="Examination" title="History">
          {/* <PhysicalExaminationTab ref={ExaminationRef} /> */}
          <ProgressNoteHistoryTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProgressNotePage;
