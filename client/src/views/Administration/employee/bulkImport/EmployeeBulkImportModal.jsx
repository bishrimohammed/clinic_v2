import React, { useMemo, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const EmployeeBulkImportModal = ({ show, handleClose }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileParse = () => {
    if (file) {
      const fileExtension = file.name.split(".").pop();
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        if (fileExtension === "csv") {
          Papa.parse(fileContent, {
            header: true,
            complete: (results) => {
              setData(results.data);
            },
          });
        } else if (fileExtension === "xlsx" || fileExtension === "xls") {
          const workbook = XLSX.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          console.log(parsedData);
          setData(parsedData);
        }
      };

      if (fileExtension === "csv") {
        reader.readAsText(file);
      } else if (fileExtension === "xlsx" || fileExtension === "xls") {
        reader.readAsBinaryString(file);
      }
    }
  };
  const DATA = useMemo(() => (data.length > 0 ? data.shift() : []), [data]);

  //   console.log(DATA);
  console.log(data);
  const allKeys = useMemo(() => {
    const keysSet = new Set();
    data.forEach((row) => {
      Object.keys(row).forEach((key) => keysSet.add(key));
    });
    return Array.from(keysSet);
  }, [data]);

  const tableHead = useMemo(() => {
    if (data.length === 0) return null;
    return (
      <thead>
        <tr>
          <td>#</td>
          {DATA.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
    );
  }, [data, allKeys]);

  const tableBody = useMemo(() => {
    if (data.length === 0) return null;
    return (
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {allKeys.map((key, i) => (
              <td key={i}>{row[key] || ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }, [data, allKeys]);
  return (
    <Modal backdrop="static" size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Import File</Form.Label>
            <Form.Control
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
        <button type="button" onClick={handleFileParse}>
          Preview Data
        </button>
        {data.length > 0 && (
          <div>
            <h3>Data Preview</h3>
            <Table responsive bordered>
              {/* <thead>
                <tr>
                  {Object.keys(data[1]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody> */}
              {tableHead}
              {tableBody}
            </Table>
            {/* <button onClick={handleSubmit}>Submit Data</button> */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeBulkImportModal;
