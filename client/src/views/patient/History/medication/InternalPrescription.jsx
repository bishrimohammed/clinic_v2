import { useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
// import { format } from "../../../../utils/formatDate";

import { toast } from "react-toastify";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Routeoptions,
  frequencyoptions,
} from "../../../../utils/SelectedOptions";
import useMedication from "../../hooks/useMedication";
import { useAddInternalPrescription } from "./hooks/useAddInternalPrescription";

const InternalPrescription = ({ history }) => {
  const [presmedicines, setPresMedicine] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [routeSelectedOption, setRouteSelectedOption] = useState(null);
  const [frequencySelectedOption, setFrequencySelectedOption] = useState(null);
  const { data } = useMedication();
  const { mutateAsync, isPending } = useAddInternalPrescription();
  const medicineOptions = useMemo(() => {
    return data?.map((medine) => {
      return {
        ...medine,
        value: medine._id,
        label: medine.drugname,
      };
    });
  }, [data]);
  const dosageref = useRef();
  const qtyref = useRef();
  const remarkref = useRef();
  const number_of_daysref = useRef();
  const { historyId } = useParams();
  const submitHandler = async () => {
    if (presmedicines.length !== 0) {
      let Data = {
        medication: presmedicines,
        historyId: historyId,
      };
      mutateAsync(Data).then((res) => {
        // console.log(res);
        if (res.status) {
          setPresMedicine([]);
        }
      });
    }
  };
  const addto_List_ = (e) => {
    e.preventDefault();

    const dosage = dosageref.current.value;
    const qty = qtyref.current.value;
    const frequency = frequencySelectedOption.value;
    const route = routeSelectedOption.value;
    const number_of_days = number_of_daysref.current.value;

    const remark = remarkref.current.value;

    if (!selectedOption || !dosage || !qty) {
      alert("add all field");
      return;
    }

    const isSelected = presmedicines.some((obj) =>
      Object.values(obj).includes(selectedOption._id)
    );
    // console.log(isSelected);
    if (isSelected) {
      toast.error("you selected already");
      return;
    }
    const presmedicine = {
      medicineId: selectedOption._id,
      dosage,
      frequency,
      route,
      number_of_days,
      qty,
      remark,
      form: "",
    };
    setPresMedicine([...presmedicines, presmedicine]);
    setSelectedOption(null);
    setFrequencySelectedOption(null);
    setRouteSelectedOption(null);
  };
  const getDrugName = (id) => {
    const med = medicineOptions.filter((m) => m._id === id);
    return med[0].drugname;
  };
  return (
    <Container className="minHeight100  py-2">
      <Form className="d-flex flex-column" onSubmit={addto_List_}>
        <Row className="bluewhite-bg py-1">
          <Col sm={3}>medicine</Col>
          <Col>dose</Col>
          <Col>frequency</Col>
          <Col sm={2}>route</Col>
          <Col>StartDate</Col>
          <Col>Qty</Col>
          <Col>
            <span className="text-nowrap">No of days</span>
          </Col>
          <Col>Remark</Col>
        </Row>
        <div className="d-flex flex-column gap-2 w-100 ">
          <Row className="border border-1 py-3 ">
            <Col sm={3} className="ps-1 ">
              <Form.Group>
                {/*   <Form.Label>Medicine:</Form.Label> */}

                <Select
                  className="w-100"
                  onChange={setSelectedOption}
                  value={selectedOption}
                  options={medicineOptions}
                  // isClearable
                  /*  hideSelectedOptions={options.some((obj) =>
                    Object.values(obj).includes(selectedOption._id)
                  )} */
                />
              </Form.Group>
            </Col>

            <Col className="ps-0">
              <Form.Group>
                {/*    <Form.Label>Dosage:</Form.Label> */}
                <Form.Control
                  ref={dosageref}
                  type="text"
                  placeholder="Enter..."
                />
              </Form.Group>
            </Col>

            <Col className="px-0">
              <Form.Group className="d-flex gap-2 align-items-center">
                {/*   <Form.Label>Frequency:</Form.Label> */}
                {/*  <Form.Control ref={frequencyref} type="number" /> */}
                <CreatableSelect
                  className="w-100"
                  isClearable
                  options={frequencyoptions}
                  onChange={setFrequencySelectedOption}
                  placeholder=""
                  value={frequencySelectedOption}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group className="d-flex gap-2 align-items-center">
                <CreatableSelect
                  className="w-100"
                  isClearable
                  options={Routeoptions}
                  onChange={setRouteSelectedOption}
                  value={routeSelectedOption}
                />
              </Form.Group>
            </Col>

            {/* ,ankjsnaj */}
            <Col>
              <Form.Group>
                <div
                  className="px-3 py-2"
                  style={{ backgroundColor: "rgb(233, 236, 239)" }}
                  disabled={true}
                >
                  {format(Date.now())}
                </div>
              </Form.Group>
            </Col>
            <Col className="px-0">
              <Form.Group>
                <Form.Control ref={qtyref} type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control ref={number_of_daysref} type="number" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  ref={remarkref}
                  type="text"
                  placeholder="Enter..."
                />
              </Form.Group>
            </Col>
          </Row>
          {/*   <Row className="border border-1 py-3 "></Row> */}
          <div className="d-flex ms-2">
            <Button
              disabled={!history.status}
              variant="success"
              className="px-4"
              type="submit"
            >
              Add
            </Button>
          </div>
        </div>
      </Form>
      <hr />
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Drug name</th>
            <th>Dosage</th>
            <th>frequency</th>
            <th>route</th>
            <th>start Date</th>
            <th>No of Days</th>
            <th>quantity</th>
            <th>remark</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {presmedicines.length !== 0 &&
            presmedicines.map((presmedicine, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{getDrugName(presmedicine.medicineId)}</td>

                <td>{presmedicine.dosage}</td>
                <td>{presmedicine.frequency}</td>
                <td>{presmedicine.route}</td>
                <td>{format(Date.now())}</td>

                <td>{presmedicine.number_of_days}</td>
                <td>{presmedicine.qty}</td>
                {/*  <td>{presmedicine.form}</td> */}
                <td>{presmedicine.remark}</td>
                <td>
                  <MdDelete
                    color="red"
                    onClick={() => {
                      setPresMedicine(
                        presmedicines.filter(
                          (medicine) =>
                            medicine.medicineId !== presmedicine.medicineId
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
            disabled={presmedicines.length === 0 || isPending}
            className="w-100"
            onClick={submitHandler}
            type="button"
          >
            {isPending && <Spinner animation="border" size="sm" />}
            Prescribe
          </Button>
        </div>
      </Modal.Footer>
    </Container>
  );
};
export default InternalPrescription;
