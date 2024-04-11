import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import usePatient, { useFilterPatient } from "../patient/hooks/usePatients";
import { BiEdit, BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import AdmitPatientModal from "./AdmitPatientModal";
const AddpatientToQue = () => {
  //const [patients, setPatient] = useState([]);
  const [search, setSearch] = useState("");
  const { data, isPending, error } = usePatient();
  //const data = useFilterPatient(search);
  //console.log(data);
  const currentUser = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  if (isPending) return <Spinner animation="grow" />;
  if (error) return "An error has occurred: " + error.message;
  //console.log(data);

  return (
    <>
      {show && (
        <AdmitPatientModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          patient={selectedPatient}
        />
      )}

      <Container>
        <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
          <h4 className="d-flex justify-content-center align-items-center mb-0">
            Patients List
          </h4>
          {currentUser.role === "cashier" && (
            <Link to="/patient/newpatient" className="btn btn-primary">
              Add Patient
            </Link>
          )}
        </div>
        <hr className="bg-primary my-2" />
        <Container>
          <div className="search w-50">
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="name , card , phone"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  type="search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button
                  variant="outline-secondary"
                  className="border-1"
                  id="button-addon2"
                >
                  <BiSearch />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Container>
        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>sex</th>
              <th>status</th>
              <th>Age</th>
              <th>phone</th>

              <th>card no</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !== 0 ? (
              data.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${patient.name}`}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.status ? "patient" : "inpatient"}</td>
                  <td>{patient.age}</td>
                  <td>{patient.phone}</td>

                  <td>{patient.cardNumber}</td>

                  {currentUser.role === "cashier" && (
                    <td>
                      {/* <NavLink to={`/patients/editpatient/${patient._id}`}>
                        <BiEdit size={20} />
                      </NavLink> */}
                      <Button
                        variant="success"
                        onClick={() => {
                          setShow(true);
                          setSelectedPatient(patient);
                        }}
                        className="py-1"
                      >
                        + Assign
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td>no patient</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <hr />
    </>
  );
};

export default AddpatientToQue;
