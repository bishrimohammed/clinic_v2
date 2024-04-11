// import CIcon from "@coreui/icons-react";
// import { cilMagnifyingGlass } from "@coreui/icons";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const Page500 = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for is temporarily unavailable.
              </p>
            </span>
            <InputGroup className="input-prepend">
              <InputGroup.Text>
                {/* <CIcon icon={cilMagnifyingGlass} /> */}
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="What are you looking for?"
              />
              <Button color="info">Search</Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Page500;
