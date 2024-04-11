import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import AddVitalModal from "./logic/AddVitalModal";
import useMedicalHistory from "../hooks/useMedicalhistory";
import { useParams } from "react-router-dom";
import { format } from "../../../utils/formatDate";
import { useGetHistoryVitals } from "./vitals/hooks/useGetHistoryVitals";

const VitalSigns = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { historyId } = useParams();
  const { data, error, isPending } = useGetHistoryVitals(historyId);
  const { data: history } = useMedicalHistory(historyId);
  // console.log(data);
  const handleShow = () => {
    setShow(true);
  };
  if (isPending) return <Spinner animation="grow" />;
  if (error) return "An error has occurred: " + error.message;
  // console.log(data.vitals);
  return (
    <Container className="px-0" style={{ overflowX: "hidden" }}>
      <AddVitalModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div className="mb-2 mt-0">
        <h4>Vital Signs</h4>
      </div>
      <hr />
      <div style={{ position: "relative" }} className="w-100">
        <Table
          striped
          bordered
          responsive={true}
          style={{ position: "relative" }}
        >
          <thead>
            <tr>
              <th>Taken By</th>
              <th>Date</th>
              <th>Temp</th>
              <th>Weight</th>
              <th>Height</th>
              <th>SBP</th>
              <th>DBP</th>
              <th>HRate</th>
              <th>RRate</th>

              <th>SaO2</th>
              <th>SPO2</th>
              <th>RBS</th>
              <th>FBS</th>
            </tr>
          </thead>
          <tbody>
            {data.vitals.map((vital, index) => (
              <tr key={index}>
                <td>{vital.takenBy.username}</td>
                <td>{format(vital.takenTime)}</td>
                <td>{vital.temperature}</td>
                <td>{vital.weight}</td>
                <td>{vital.height}</td>
                <td>{vital.SystolicBloodPressure}</td>
                <td>{vital.DiastolicBloodPressure}</td>
                <td>{vital.heartRate}</td>
                <td>{vital.respiratoryRate}</td>
                <td>{vital.SaO2}</td>
                <td>{vital.SPO2}</td>
                <td>{vital.RBS}</td>
                <td>{vital.FBS}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex mt-4 w-100  justify-content-end">
        <div>
          <Button
            onClick={handleShow}
            className="ms-3"
            variant="success"
            type="button"
            disabled={!history?.status}
          >
            + New Vitals
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default VitalSigns;
