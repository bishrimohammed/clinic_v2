/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { useAddLabOrder } from "../investigation/hooks/useAddLabOrder";
import useLaboratoryTests from "../../hooks/useGetLaboratoryTests";
import useGetImagingStudies from "../../hooks/useGetImagingStudies";
import { useAddImagingOrder } from "../investigation/hooks/useAddImagingOrder";

const AddLab = ({ handleClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const remarkref = useRef();
  const { historyId } = useParams();

  const labOptions = useLaboratoryTests();
  const { mutateAsync, isPending } = useAddLabOrder();

  const submitHandler = async () => {
    if (remarkref.current.value === "") {
      toast.error("Fill Clinical Findings");
      return;
    }
    if (selectedOption.length !== 0) {
      const investigations = selectedOption.map((test) => {
        return test._id;
      });
      //console.log(orderedTest);
      const Data = {
        historyId,
        investigations,
        clinical_finding: remarkref.current.value,
      };
      // console.log(Data);
      //return;

      // const lab_order = await
      mutateAsync(Data).then((resData) => {
        if (resData.status === 201) {
          handleClose();
        }
      });
    }
  };

  return (
    <Container>
      <Form className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="formControlsTextarea">
          <Form.Label>Clinical Findings</Form.Label>
          <Form.Control
            ref={remarkref}
            as="textarea"
            placeholder="Enter text here"
          />
        </Form.Group>
      </Form>
      <h6>Select LabTest</h6>
      <Select
        onChange={setSelectedOption}
        value={selectedOption}
        options={labOptions}
        isMulti
      />
      <hr />
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>category</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedOption !== null &&
            selectedOption.map((option, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{option.test_name}</td>

                <td>{option.lab_category.name}</td>
                <td>
                  <MdDelete
                    color="red"
                    onClick={() => {
                      setSelectedOption(
                        /* selectedOption.length === 1
                          ? null
                          : */ //selectedOption.splice(index, 1)
                        selectedOption.filter(
                          (selected) => selected._id !== option._id
                        )
                      );
                    }}
                    size={20}
                    cursor="pointer"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal.Footer style={{ justifyContent: "initial" }}>
        <div className="d-flex w-100  justify-content-end">
          <Button
            variant="primary"
            disabled={
              selectedOption === null ||
              selectedOption.length === 0 ||
              isPending
            }
            className="w-100"
            type="button"
            onClick={submitHandler}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            sumbit request
          </Button>
        </div>
      </Modal.Footer>
    </Container>
  );
};

const AddImageTest = ({ handleClose, patientId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const ImagingStudiesOptions = useGetImagingStudies();
  const { mutateAsync, isPending } = useAddImagingOrder();
  const clinical_findingRef = useRef();

  const { historyId } = useParams();

  const submitHandler = async () => {
    const clinical_finding = clinical_findingRef.current.value;
    if (clinical_finding === "") {
      toast.error("Clinical Findings is required");
      return;
    }

    if (selectedOption.length !== 0) {
      const orderedInvestigations = selectedOption.map((test) => {
        return test._id;
      });

      const Data = {
        historyId,
        patientId,
        investigations: orderedInvestigations,
        clinical_finding,
      };

      mutateAsync(Data).then((resData) => {
        if (resData.status === 201) {
          handleClose();
        }
      });
    }
  };

  return (
    <Container>
      <Form className="d-flex flex-column">
        <Form.Group className="mb-3" controlId="formControlsTextarea">
          <Form.Label>Clinical Findings</Form.Label>
          <Form.Control
            className="border border-3"
            ref={clinical_findingRef}
            as="textarea"
            placeholder="Enter text here"
          />
        </Form.Group>
      </Form>
      <h6>Select ImageTest</h6>
      <Select
        className="border border-1"
        onChange={setSelectedOption}
        value={selectedOption}
        options={ImagingStudiesOptions}
        isMulti
      />
      <hr />
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedOption !== null &&
            selectedOption.map((option, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{option.test_name}</td>

                <td>
                  <MdDelete
                    onClick={() => {
                      setSelectedOption(
                        /* selectedOption.length === 1
                          ? null
                          : */ //selectedOption.splice(index, 1)
                        selectedOption.filter(
                          (selected) => selected._id !== option._id
                        )
                      );
                    }}
                    size={20}
                    cursor="pointer"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal.Footer style={{ justifyContent: "initial" }}>
        <div className="d-flex w-100  justify-content-end">
          <Button
            variant="primary"
            disabled={selectedOption === null || selectedOption.length === 0}
            className="w-100"
            type="button"
            onClick={submitHandler}
          >
            {isPending && <Spinner animation="border" size="sm" />}
            submit image Investigation
          </Button>
        </div>
      </Modal.Footer>
    </Container>
  );
};

const OrderLab = (props) => {
  const closeModal = () => {
    props.handleClose();
  };
  return (
    <Modal
      size="lg"
      //fullscreen={true}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add {props.type} Investigation Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.type === "image" ? (
          <AddImageTest handleClose={closeModal} patientId={props.patientId} />
        ) : (
          <AddLab handleClose={closeModal} patientId={props.patientId} />
        )}
        {/*  <AddIves /> */}
      </Modal.Body>
    </Modal>
  );
};

export default OrderLab;
