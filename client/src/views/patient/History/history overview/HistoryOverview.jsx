import { Col, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";

// import { format } from "../../../../utils/formatDate";
//import useGetProgressNote from "../n../hooks/useGetProgressNote";
import ViewProgressNote from "./ViewProgressNote";
import useGetProgressNote from "../note/hooks/useGetProgressNote";
import { useGetHistoryNote } from "../note/hooks/useGetHistoryNote";

const HistoryOverview = () => {
  const { historyId } = useParams();
  const { data, isLoading, error, isError } = useGetHistoryNote(historyId);
  // const {
  //   data: ProgressNote,
  //   isLoading: progress_isLoading,
  //   error: progress_error,
  //   isError: progress_isError,
  // } = useGetProgressNote(historyId);
  const isloading = isLoading;
  const iserror = isError;

  if (isloading) return <Spinner animation="grow" />;
  if (iserror) {
    return <div>error {error?.message ? error?.message : ""}</div>;
  }

  // console.log(ProgressNote);
  return (
    <div
      /* style={{ backgroundColor: "rgb(246, 247, 248)" }} */
      className="historyOverview "
    >
      <Tabs
        defaultActiveKey="Patient note"
        id="justify-tab-example"
        className="mb-3 hrunboxshadow border-bottom border-2"
        justify
        variant="underline"
      >
        <hr />
        <Tab
          eventKey="Patient note"
          className=" border-2 border-dark"
          title="Patient note"
        >
          <div className="d-flex flex-column">
            <div className="d-flex flex-column  ">
              <div
                //style={{ backgroundColor: "rgb(0, 98, 211)" }}
                className="p-2 bg-primary text-white"
              >
                History and Physical
              </div>

              {/* <div className="px-3">{format(data?.createdAt)}</div> */}
              <div className="px-3 py-1  border border-1 border-top border-top-0 border-dark">
                <Row className="py-1 ">
                  <Col xs={3}>
                    <span>Date</span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col>{format(data?.createdAt)}</Col>
                </Row>
                <Row className="py-2">
                  <Col xs={3}>
                    <span>Chief complaint</span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col>{data?.chiefcomplaint}</Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={3}>
                    <span className="text-nowrap">
                      History of Present Illness
                    </span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col className="ps-0">{data?.HPI}</Col>
                  <Col xs={1}></Col>
                </Row>
                <hr />
                <Row className="py-2">
                  <Col xs={3}>
                    <span>Plan</span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col>{data?.plan}</Col>
                </Row>
                <hr />
                <Row className="py-2">
                  <Col xs={3}>
                    <span>Assesement</span>
                  </Col>
                  <Col xs={1} className="d-flex justify-content-center">
                    <span className="fw-bold">:</span>
                  </Col>
                  <Col>{data?.assesement}</Col>
                </Row>
              </div>
            </div>
          </div>
        </Tab>
        {/* <Tab
          eventKey="profile"
          className="border-2 border-dark"
          title="progress note"
        >
          {ProgressNote.length === 0 ? (
            <div className="p-2 text-center bg-success bg-opacity-25 text-dark">
              There is no progress note for this history
            </div>
          ) : (
            <ViewProgressNote ProgressNote={ProgressNote} />
          )}

         
        </Tab> */}
        {/*  <Tab
          eventKey="longer-tab"
          className="px-3 border-2 border-dark"
          title="Loooonger Tab"
        >
          Tab content for Loooonger Tab
        </Tab>
        <Tab
          eventKey="contact"
          className="px-3 border-2 border-dark"
          title="Contact"
          disabled
        >
          Tab content for Contact
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default HistoryOverview;
