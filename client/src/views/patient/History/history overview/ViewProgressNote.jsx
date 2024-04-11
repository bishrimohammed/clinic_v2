import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
const ViewProgressNote = ({ ProgressNote }) => {
  const [page, setPage] = useState(0);
  const total = ProgressNote.length;
  const onClickHandler = (value) => {
    setPage(value);
  };
  return (
    <div className="  mb-1  py-2">
      <Row className="">
        <Col xs={1}>
          {/* <Button
            className="mt-3"
            onClick={() => onClickHandler(page - 1)}
            disabled={page === 0}
          >
            prev
          </Button> */}
          <button
            type="button"
            className={`mt-3 px-3 btn ${
              page === 0 ? "btn-outline-danger" : "btn-outline-info"
            } `}
            onClick={() => onClickHandler(page - 1)}
            disabled={page === 0}
          >
            <FaAnglesLeft />
          </button>
        </Col>
        <Col xs={10} className="px-0">
          <div
            style={{ whiteSpace: "pre", fontSize: 14 }}
            className=" p-3 boxshadow mb-3"
          >
            {ProgressNote && ProgressNote[page]?.Note}
          </div>
        </Col>
        <Col xs={1}>
          {" "}
          <button
            type="button"
            className={`mt-3 px-3 btn ${
              page === total - 1 ? "btn-outline-danger" : "btn-outline-info"
            } `}
            disabled={page === total - 1}
            onClick={() => onClickHandler(page + 1)}
          >
            <FaAnglesRight />
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default ViewProgressNote;
