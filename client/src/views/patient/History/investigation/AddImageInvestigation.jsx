import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { useGetImageCategory } from "../../hooks/useGetImageCategory";
import { useGetImagingStudiesTests } from "../../hooks/useGetImagingStudies";
import { useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { useAddImagingOrder } from "./hooks/useAddImagingOrder";
import { toast } from "react-toastify";
import { useGetClinicService } from "./hooks/useGetClinicService";

const AddImageInvestigation = () => {
  const { data: imagingTests, error } = useGetClinicService("imag");
  const remarkref = useRef();
  const { historyId } = useParams();
  const [selectedTests, setSelectedTests] = useState([]);

  const serviceCategory = useMemo(() => {
    return imagingTests && imagingTests.serviceCategory;
  });

  const [activeCategory, setActiveCategory] = useState(
    serviceCategory && serviceCategory[0]?.id
  );
  const { state } = useLocation();
  const { mutateAsync, isPending } = useAddImagingOrder();

  const TestSelect = (test) => {
    const index = selectedTests.findIndex((t) => t === test.id);
    if (index === -1) {
      setSelectedTests([...selectedTests, test.id]);
    } else {
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
      patientId: state.patientId,
    };
    mutateAsync(Data).then((resData) => {
      if (resData.status === 201) {
        setSelectedTests([]);
        remarkref.current.value = "";
      }
    });
  };

  const testList = serviceCategory
    ?.filter((category) => category.id === activeCategory)[0]
    ?.serviceItem.map((test, index) => (
      <button
        style={{
          cursor: selectedTests.includes(test.id) ? "pointer" : "pointer",
        }}
        className="bg-gredient  border-0  py-2 px-2 d-flex justify-content-center align-items-center "
        onClick={() => TestSelect(test)}
        key={index}
      >
        {selectedTests.includes(test.id) && <FaCheck color="green" />}{" "}
        {test.service_name}
      </button>
    ));
  return (
    <>
      <h4 className="ps-2 bluewhite-bg py-1">order Imaging Investigation</h4>
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
            <h6>Tests : </h6>
            <div className="d-flex flex-wrap gap-2">{testList}</div>
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
                {}
                {labcategory.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <div className="mt-2 mb-1">
        <Button
          className="border-0 w-100"
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

export default AddImageInvestigation;
