/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { delta } from "../../../../utils/DeltaQuill";

import { useParams } from "react-router-dom";
import { useAddPrograssNote } from "../note/hooks/useAddPrograssNote";
// eslint-disable-next-line react/display-name
const ProgressNote = ({ history }) => {
  const { historyId } = useParams();
  const { mutateAsync, isPending } = useAddPrograssNote();
  const prRef = useRef();

  const SaveHandler = () => {
    const progressNote = prRef.current?.editor.getText();

    const pregressData = {
      historyId,
      progressNote,
    };
    mutateAsync(pregressData).then((res) => {
      if (res.status === 201) {
        prRef.current?.editor.setContents(delta);
      }
    });
  };

  // let ttt = prRef.current?.editor.getText();
  // console.log(ttt);
  return (
    <Container className="mt-4 ">
      <div className="d-flex  mb-3">
        <div className="w-75 ms-5 boxshadow ">
          <ReactQuill ref={prRef} theme="snow" defaultValue={delta} />
        </div>
        <Button
          disabled={!history.status || isPending}
          className="flex-grow-1 ms-2 align-self-start"
          onClick={SaveHandler}
        >
          {isPending && <Spinner animation="border" size="sm" />}
          Save
        </Button>
      </div>

      {/*  <div
        style={{ whiteSpace: "pre" }}
        className="w-75 ms-5 p-2 boxshadow mb-3"
      >
        {prRef.current?.editor.getText()}
      </div> */}
    </Container>
  );
};

export default ProgressNote;
