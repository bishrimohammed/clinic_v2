import React, { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useGetProcedures } from "./hooks/useGetProcedures";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Procedure = ({ getValues, setValue }) => {
  const { data: procedures } = useGetProcedures();
  const [selectedProcedure, setSelectedProcedure] = useState(
    getValues("procedures") || []
  );
  // console.log(procedures);
  const testList = procedures?.map((test, index) => (
    <button
      style={
        {
          //   cursor: selectedTests.includes(test.id) ? "pointer" : "pointer",
        }
      }
      type="button"
      className="bg-gredient text-nowrap width23 border-0  py-2 d-flex justify-content-center align-items-center"
      onClick={() => {
        console.log(test);
        let proceduresList;
        if (selectedProcedure.includes(test.id)) {
          proceduresList = selectedProcedure.filter((id) => id !== test.id);
        } else {
          proceduresList = [...selectedProcedure, test.id];
        }
        setSelectedProcedure(proceduresList);
        setValue("procedures", proceduresList);
      }}
      key={index}
      // disabled={indirecSselectedTests.includes(test.id)}
    >
      {selectedProcedure.includes(test.id) && (
        <FaCheck color="green" className="me-1" />
      )}

      {test.service_name}
    </button>
  ));

  function getServiceItemNameById(procedureId) {
    // console.log(procedureId);
    const procedure = procedures.find((p) => p.id == parseInt(procedureId));
    // console.log(procedure);
    return procedure?.service_name;
    // return "dfge";
  }

  const removeTestFromSelectedTest = (testId) => {
    const procedures = selectedProcedure.filter((id) => id !== testId);
    setValue("procedures", procedures);
    setSelectedProcedure(procedures);
  };
  return (
    <div>
      <Row className="py-2">
        <Col sm={5} md={3} className="">
          <ListGroup
            as="ul"
            variant="flush"
            style={{ boxShadow: "1px 1px 3px 0px rgba(0,0,0,0.1)" }}
            className=""
          >
            <ListGroup.Item
              // onClick={() => setActiveCategory(labcategory.id)}
              active={true}
              // key={labcategory.id}
              as="li"
              className="curserpointer "
            >
              Procedure
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={7} md={9} className="pe-0">
          <>
            <h6 className="mt-2">Procedures : </h6>
            <div className="d-flex  flex-wrap gap-2">{testList}</div>
            <div className="d-flex justify-content-between  gap-2 py-2 mt-2">
              <div style={{ width: "70%" }} className=" pb-2 ">
                <h6>
                  {" "}
                  <span className="border-bottom border-2 pb-1">
                    Selected Procedure:
                  </span>{" "}
                </h6>
                <div className="d-flex  flex-wrap gap-2">
                  {selectedProcedure.map((testId, index) => (
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
    </div>
  );
};

export default Procedure;
