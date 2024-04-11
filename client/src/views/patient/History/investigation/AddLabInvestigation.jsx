import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";

import { useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddLabOrder } from "./hooks/useAddLabOrder";
import { useGetClinicService } from "./hooks/useGetClinicService";
const AddLabInvestigation = () => {
  const { data: laboratoryTests, error } = useGetClinicService("lab");
  const { mutateAsync, isPending } = useAddLabOrder();
  // console.log(laboratoryTests);
  const remarkref = useRef();
  const { historyId } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);
  // const [indirecSselectedTests, setIndirecSselectedTests] = useState([]);

  // Add a handler to toggle a test selected state
  const serviceCategory = useMemo(() => {
    return laboratoryTests && laboratoryTests.serviceCategory;
  });
  // console.log(serviceCategory);
  // return;
  const [activeCategory, setActiveCategory] = useState(
    serviceCategory && serviceCategory[0]?.id
  );

  if (error) return "An error has occurred: " + error.message;

  // const PanelsTests = laboratoryTests
  //   ?.filter((lab) => lab.isPanel && lab.lab_category._id === activeCategory)
  //   .map((labtest, index) => (
  //     <button
  //       style={{
  //         //   pointerEvents: selectedTests.includes(labtest._id)
  //         //     ? "visibleFill"
  //         //     : "painted",
  //         //   opacity: selectedTests.includes(labtest._id) ? 0.5 : 1,
  //         cursor: selectedTests.includes(labtest._id) ? "no-drop" : "pointer",
  //       }}
  //       className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
  //       onClick={() => PanelSalect(labtest)}
  //       key={index}
  //       // disabled={selectedTests.includes(labtest._id)}
  //     >
  //       {selectedTests.includes(labtest._id) && <FaCheck color="green" />}{" "}
  //       {labtest.test_name}
  //     </button>
  //   ));

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
    const index = selectedTests.findIndex((t) => t === test._id);
    console.log();
    if (index === -1) {
      setSelectedTests([...selectedTests, test._id]);
      setIndirecSselectedTests([...indirecSselectedTests, ...test.panelGroup]);
    } else {
      setSelectedTests(selectedTests.filter((t) => t !== test._id));
      let panelgroup = test.panelGroup.map((t) => t._id);
      setIndirecSselectedTests(
        indirecSselectedTests.filter((t) => {
          panelgroup.map((pg) => pg !== t._id);
        })
      );
      console.log(panelgroup);
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

  function getServiceItemNameById(serviceItemId) {
    for (let i = 0; i < serviceCategory.length; i++) {
      const serviceItem = serviceCategory[i].serviceItem.find(
        (item) => item.id === serviceItemId
      );
      if (serviceItem) {
        return serviceItem.service_name;
      }
    }
    return null; // Return null if serviceItem with given ID is not found
  }

  const removeTestFromSelectedTest = (testId) => {
    setSelectedTests(selectedTests.filter((t) => t !== testId));
    // let panelgroup = laboratoryTests
    //   .find((t) => t._id === testId)
    //   ?.panelGroup.map((t) => t._id);
    // setIndirecSselectedTests(
    //   indirecSselectedTests.filter((t) => {
    //     panelgroup.map((pg) => pg !== t._id);
    //   })
    // );
  };

  const submitHandler = () => {
    if (remarkref.current.value === "") {
      toast.error(" clinical finding empty");
      return;
    }
    const Data = {
      historyId,
      investigations: selectedTests,
      clinical_finding: remarkref.current.value,
    };
    mutateAsync(Data).then((resData) => {
      if (resData.status === 201) {
        setSelectedTests([]);
        // setIndirecSselectedTests([]);
        remarkref.current.value = "";
      }
    });
    // mutate(Data);
    // console.log(Data);
  };

  const testList = serviceCategory
    ?.filter((category) => category.id === activeCategory)[0]
    ?.serviceItem.map((test, index) => (
      <button
        style={{
          //   pointerEvents: selectedTests.includes(test._id)
          //   ? "visibleFill"
          //     : "painted",
          //   opacity: selectedTests.includes(test._id)? 0.5 : 1,
          cursor: selectedTests.includes(test.id) ? "pointer" : "pointer",
        }}
        className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
        onClick={() => TestSelect(test)}
        key={index}
        // disabled={selectedTests.includes(test._id)}
      >
        {/* {console.log(test)} */}
        {selectedTests.includes(test.id) && <FaCheck color="green" />}{" "}
        {test.service_name}
      </button>
    ));
  // console.log(testList);

  return (
    <>
      <h4 className="ps-2 bluewhite-bg py-1">order Lab Investigation</h4>
      <Form className="d-flex flex-column m-2">
        <Form.Group>
          <Form.Label>Clinical Findings</Form.Label>
          <Form.Control
            ref={remarkref}
            as="textarea"
            required
            placeholder="Enter text here"
            className="border-2 w-75"
          />
        </Form.Group>
      </Form>
      <hr className="mt-0" />
      <Row className="py-2">
        <Col sm={7} md={9} className="pe-0">
          <div className="">
            {/* {PanelsTests?.length !== 0 && (
              <div className="mb-2">
                <h6>Panels : </h6>
                {PanelsTests}
              </div>
            )} */}

            <h6>Tests : </h6>
            <div className="d-flex  flex-wrap gap-2">
              {
                testList
                // serviceCategory
                //   ?.filter((category) => category.id === activeCategory)[0]
                //   ?.serviceItem.map((test, index) => (
                //     <button
                //       style={{
                //         //   pointerEvents: selectedTests.includes(test._id)
                //         //   ? "visibleFill"
                //         //     : "painted",
                //         //   opacity: selectedTests.includes(test._id)? 0.5 : 1,
                //         cursor: selectedTests.includes(test.id)
                //           ? "no-drop"
                //           : "pointer",
                //       }}
                //       className="bg-gredient width23 border-0  py-2 d-flex justify-content-center align-items-center"
                //       onClick={() => TestSelect(test)}
                //       key={index}
                //       // disabled={selectedTests.includes(test._id)}
                //     >
                //       {selectedTests.includes(test.id) && (
                //         <FaCheck color="green" />
                //       )}{" "}
                //       {getTestName(test.id)}
                //     </button>
                //   ))
                // serviceCategory.map((category,index)=>(
                //   <button>{category.}</button>
                // ))
              }
            </div>
            <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
              <div
                style={{ width: "70%" }}
                className="border border-2 px-2 py-3 ms-2"
              >
                <h6>Selected Tests : </h6>
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
          </div>
        </Col>
        <Col sm={5} md={3} className="ps-0">
          <ListGroup as="ul" className="boxshadow">
            {serviceCategory?.map((labcategory) => (
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
      </Row>
      {/* <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
        <div
          style={{ width: "70%" }}
          className="border border-2 px-2 py-3 ms-3"
        >
          <h6>Selected Tests : </h6>
          <div className="d-flex  flex-wrap gap-2">
            {selectedTests.map((testId, index) => (
              <ListGroup.Item
                as="li"
                className=" d-flex gap-1 align-items-center p-1 "
                key={index}
              >
                {getTestName(testId)}
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
      </div> */}
      <div className="d-flex justify-content-end align-self-end mt-2 mb-1">
        <Button
          className="border-0 w-100  "
          onClick={submitHandler}
          disabled={selectedTests.length === 0 || isPending}
        >
          {isPending && <Spinner animation="border" size="sm" />}
          Submit Tests
        </Button>
      </div>
    </>
  );
};

export default AddLabInvestigation;
