import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetLaboratory } from "../../History/investigation/hooks/useGetLaboratory";
import { useGetLabCategory } from "./useGetLabCategory";
import { useAddLabOrder } from "../../History/investigation/hooks/useAddLabOrder";

const AddLabInvestigation = ({ show, handleClose }) => {
  const { data: laboratoryTests, error } = useGetLaboratory();
  const { data: labCategories } = useGetLabCategory();
  // console.log(labCategories);
  const { mutateAsync, isPending } = useAddLabOrder();
  // console.log(laboratoryTests);
  const remarkref = useRef();

  const [selectedTests, setSelectedTests] = useState([]);
  const [indirecSselectedTests, setIndirecSselectedTests] = useState([]);
  const { state } = useLocation();
  console.log(state);
  // Add a handler to toggle a test selected state

  // console.log(serviceCategory);
  // return;
  const [activeCategory, setActiveCategory] = useState(1);

  if (error) return "An error has occurred: " + error.message;

  const PanelsTests = laboratoryTests
    ?.filter(
      (lab) =>
        lab.serviceItem?.serviceCategory_id === activeCategory && lab.isPanel
    )
    .map((labtest, index) => (
      <button
        style={{
          //   pointerEvents: selectedTests.includes(labtest._id)
          //     ? "visibleFill"
          //     : "painted",
          //   opacity: selectedTests.includes(labtest._id) ? 0.5 : 1,
          cursor: selectedTests.includes(labtest._id) ? "no-drop" : "pointer",
        }}
        className="bg-gredient text-nowrap width23 border-0  py-2 d-flex justify-content-center align-items-center"
        onClick={() => PanelSalect(labtest)}
        key={index}
        // disabled={selectedTests.includes(labtest._id)}
      >
        {selectedTests.includes(labtest.id) && <FaCheck color="green" />}{" "}
        {labtest.serviceItem.service_name}
      </button>
    ));

  // const nonPanelsTests = laboratoryTests
  //   ?.filter(
  //     (lab) => lab.isPanel === false && lab.lab_category._id === activeCategory
  //   )
  //   ?.map((labtest, index) => (
  //     <button
  //       style={{
  //         fontSize: 13,
  //         cursor: indirecSselectedTests.some((t) => t._id === labtest._id)
  //           ? "no-drop"
  //           : "pointer",
  //       }}
  //       onClick={() => TestSelect(labtest)}
  //       className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
  //       key={index}
  //       disabled={indirecSselectedTests.some((t) => t._id === labtest._id)}
  //     >
  //       {(selectedTests.includes(labtest._id) ||
  //         indirecSselectedTests.some((t) => t._id === labtest._id)) && (
  //         <FaCheck color="green" />
  //       )}
  //       {labtest.test_name}
  //     </button>
  //   ));

  const PanelSalect = (test) => {
    // console.log(test);
    const index = selectedTests.findIndex((t) => t === test.id);
    // console.log();
    if (index === -1) {
      setSelectedTests([...selectedTests, test.id]);
      const underPanel = test.underPanels.map((t) => t.underpanel_id);
      // if (test.isPanel) {
      //   console.log("kdjcJDCVGH");
      //   // if (selectedTests.includes(underPanel)) {
      //   //   console.log("kdjcJDCVGH");
      //   // }
      //   console.log(selectedTests);
      //   for (let i = 0; i < underPanel.length; i++) {
      //     if (selectedTests.includes(underPanel[i])) {
      //       removeTestFromSelectedTest(underPanel[i]);
      //     }
      //   }
      // }
      setIndirecSselectedTests([...indirecSselectedTests, ...underPanel]);
    } else {
      setSelectedTests(selectedTests.filter((t) => t !== test.id));
      let underPanel = test.underPanels.map((t) => t.underpanel_id);
      setIndirecSselectedTests(
        indirecSselectedTests.filter((t) => {
          underPanel.map((pg) => pg !== t.underpanel_id);
        })
      );
      // if (test.isPanel) {
      //   console.log("kdjcJDCVGH");
      //   // if (selectedTests.includes(underPanel)) {
      //   //   console.log("kdjcJDCVGH");
      //   // }
      //   console.log(selectedTests);
      //   for (let i = 0; i < underPanel.length; i++) {
      //     if (selectedTests.includes(underPanel[i])) {
      //       removeTestFromSelectedTest(underPanel[i]);
      //     }
      //   }
      // }
    }
  };

  const TestSelect = (test) => {
    const index = selectedTests.findIndex((t) => t === test.id);
    if (index === -1) {
      setSelectedTests([...selectedTests, test.id]);
    } else {
      //   let panelgroup = test?.panelGroup.map((t) => t._id);
      //   console.log(panelgroup);
      setSelectedTests(selectedTests.filter((t) => t !== test.id));
      //   setIndirecSselectedTests(indirecSselectedTests.filter(t));
    }
  };
  // console.log(selectedTests);
  // console.log(indirecSselectedTests);
  function getServiceItemNameById(serviceItemId) {
    const lab = laboratoryTests.find((service) => service.id === serviceItemId);
    // console.log(lab);
    return lab.serviceItem.service_name;
  }

  const removeTestFromSelectedTest = (testId) => {
    const lab = laboratoryTests.find((test) => test.id === testId);
    if (lab.isPanel) {
      const underPanel = lab.underPanels.map((t) => t.underpanel_id);
      setIndirecSselectedTests(
        indirecSselectedTests.filter((t) => {
          underPanel.map((pg) => pg !== t.id);
        })
      );
    }
    setSelectedTests(selectedTests.filter((t) => t !== testId));
  };

  const submitHandler = () => {
    if (remarkref.current.value === "") {
      toast.error(" clinical finding empty");
      return;
    }
    const investigations = selectedTests.map((t) => {
      const lab = laboratoryTests.find((lab) => lab.id === t);
      // console.log(lab);
      return lab?.labTest_id;
    });
    const underPanels = indirecSselectedTests.map((t) => {
      const lab = laboratoryTests.find((lab) => lab.id === t);
      // console.log(lab);
      return lab?.labTest_id;
    });

    // console.log(selectedTests);
    // console.log(investigations);
    // return;
    const formData = {
      investigations: investigations,
      underPanels,
      clinical_finding: remarkref.current.value,
    };
    mutateAsync({ formData, medicalRecord_id: state.medicalRecord_id }).then(
      (resData) => {
        if (resData.status === 201) {
          setSelectedTests([]);
          // setIndirecSselectedTests([]);
          remarkref.current.value = "";
          handleClose();
        }
      }
    );
    // mutate(Data);
    // console.log(Data);
  };
  // console.log(laboratoryTests);

  const testList = laboratoryTests
    ?.filter(
      (lab) =>
        lab.serviceItem?.serviceCategory_id === activeCategory && !lab.isPanel
    )
    ?.map((test, index) => (
      <button
        style={{
          cursor: selectedTests.includes(test.id) ? "pointer" : "pointer",
        }}
        className="bg-gredient text-nowrap width23 border-0  py-2 d-flex justify-content-center align-items-center"
        onClick={() => TestSelect(test)}
        key={index}
        disabled={indirecSselectedTests.includes(test.id)}
      >
        {selectedTests.includes(test.id) && (
          <FaCheck color="green" className="me-1" />
        )}
        {indirecSselectedTests.includes(test.id) && (
          <FaCheck className="me-1" />
        )}
        {test.serviceItem.service_name}
      </button>
    ));

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Order Lab Investigation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="py-2">
            <Col sm={5} md={3} className="">
              <ListGroup
                as="ul"
                variant="flush"
                style={{ boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.1)" }}
                className=""
              >
                {labCategories?.map((labcategory) => (
                  <ListGroup.Item
                    onClick={() => setActiveCategory(labcategory.id)}
                    active={labcategory.id === activeCategory}
                    key={labcategory.id}
                    as="li"
                    className="curserpointer "
                  >
                    {labcategory.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={7} md={9} className="pe-0">
              <>
                {" "}
                <Form className="d-flex flex-column " style={{ width: "85%" }}>
                  <Form.Group>
                    <Form.Label>Clinical Findings</Form.Label>
                    <Form.Control
                      ref={remarkref}
                      as="textarea"
                      required
                      placeholder="Enter text here"
                      className="border-2 "
                    />
                  </Form.Group>
                </Form>
                {PanelsTests?.length !== 0 && (
                  <div className="my-2">
                    <h6>Panels Tests: </h6>{" "}
                    <div className="d-flex  flex-wrap gap-2">{PanelsTests}</div>
                  </div>
                )}
                <h6 className="mt-2">Laboratory Tests : </h6>
                <div className="d-flex  flex-wrap gap-2">{testList}</div>
                <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
                  <div style={{ width: "70%" }} className=" pb-2 ">
                    <h6>
                      {" "}
                      <span className="border-bottom border-2 pb-1">
                        Selected Tests:
                      </span>{" "}
                    </h6>
                    <div className="d-flex  flex-wrap gap-2">
                      {selectedTests.map((testId, index) => (
                        <ListGroup.Item
                          as="li"
                          className=" d-flex gap-1 align-items-center p-1 "
                          key={index}
                        >
                          {getServiceItemNameById(testId)}
                          <RxCross1
                            onClick={() => removeTestFromSelectedTest(testId)}
                            color="red"
                            size={20}
                            className="curserpointer"
                          />
                        </ListGroup.Item>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={submitHandler}
              disabled={selectedTests.length === 0 || isPending}
            >
              {isPending && <Spinner animation="border" size="sm" />}
              Save
            </Button>
          </div>
          {/* <div className="d-flex justify-content-end align-self-end mt-2 mb-1">
            <Button
              className="border-0 w-100  "
              onClick={submitHandler}
              disabled={selectedTests.length === 0 || isPending}
            >
              {isPending && <Spinner animation="border" size="sm" />}
              Submit Tests
            </Button>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddLabInvestigation;
