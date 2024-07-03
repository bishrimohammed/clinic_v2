import React, { useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
// import AddLabInvestigation from "../../History/investigation/AddLabInvestigation";
import { format } from "date-fns";
import AddLabInvestigation from "../investigation/AddLabInvestigation";
import { FaPlusCircle } from "react-icons/fa";
import { useGetLaboratory } from "../../History/investigation/hooks/useGetLaboratory";
export const OrderedLabInvestigationTable = ({
  investigations,
  setValue,
  getValues,
  watch,
}) => {
  const [showAddLabModal, setShowLabModal] = useState(false);
  const { data: laboratoryTests, error } = useGetLaboratory();
  const selectedLabs = useMemo(
    () => watch("selectedLabs"),
    [watch("selectedLabs")]
  );

  // console.log(watch("selectedLabs"));
  // console.log(watch("indirectlySelectedLabs"));
  const indirectlySelectedLabs = useMemo(
    () => watch("indirectlySelectedLabs"),
    [watch("indirectlySelectedLabs")]
  );
  function getServiceItemNameById(serviceItemId) {
    const lab = laboratoryTests?.find(
      (service) => service.labTest_id === serviceItemId
    );
    // console.log(lab);
    return lab?.serviceItem?.service_name;
    // return "dfge";
  }

  const removeTestFromSelectedTest = (testId) => {
    const lab = laboratoryTests.find((test) => test.labTest_id === testId);
    if (lab.isPanel) {
      const underPanel = lab.underPanels.map((t) => {
        const lab = laboratoryTests.find((lab) => lab.id === t.underpanel_id);
        // console.log(lab);
        return lab?.labTest_id;
      });
      // const underPanel = lab.underPanels.map((t) => t.underpanel_id);
      // setIndirecSselectedTests(
      //   indirecSselectedTests.filter((t) => {
      //     underPanel.map((pg) => pg !== t);
      //   })
      // );
      setValue(
        "indirectlySelectedLabs",
        indirectlySelectedLabs.filter((t) => {
          underPanel.map((pg) => pg !== t);
        })
      );
    }
    // setSelectedTests(selectedTests.filter((t) => t !== testId));
    setValue(
      "selectedLabs",
      selectedLabs.filter((t) => t !== testId)
    );
  };
  return (
    <div className="mt-2">
      {/* <div className="d-flex justify-content-end">
        <Button className="mb-2" onClick={() => setShowLabModal(true)}>
          + Add Lab
        </Button>
      </div> */}
      <h5 className="d-flex gap-2 mb-3">
        <span className="border-bottom border-dark py-2">
          Internal Lab Investigation
        </span>
        <button
          onClick={() => setShowLabModal(true)}
          className="border-0  bg-transparent "
        >
          <FaPlusCircle size={18} className="text-primary " />
        </button>
      </h5>
      {selectedLabs?.length > 0 && (
        <>
          <h6>Test To be Submitted</h6>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <td>#</td>
                <th>Test Name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedLabs?.map((lab, index) => (
                <tr key={lab}>
                  <td>{index + 1}</td>
                  <td>{getServiceItemNameById(lab)}</td>
                  {/* <td>Ready to send</td> */}
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      type="button"
                      onClick={() => removeTestFromSelectedTest(lab)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {investigations?.length > 0 && (
        <>
          <h6>Ordered Test</h6>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>test Name</th>
                {/* <th>Requested Time</th> */}
                <th>Requested By</th>

                <th>Status</th>
              </tr>

              {/* <td></td> */}
            </thead>
            <tbody>
              {investigations
                ?.filter((i) => !i.is_underpanel)
                .map((investigation, index) => (
                  <tr key={investigation.id}>
                    <td>{index + 1}</td>
                    <td>{investigation.test?.service_name}</td>
                    {/* <td>
                    {format(new Date(investigation.createdAt), "yyyy-MM-dd") +
                      "    " +
                      format(new Date(investigation.createdAt), "hh:mm a")}
                  </td> */}
                    <td>
                      {investigation.requestedBy?.employee?.firstName}{" "}
                      {investigation.requestedBy?.employee?.middleName}{" "}
                    </td>
                    <td>{investigation.status}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
      {showAddLabModal && (
        <AddLabInvestigation
          show={showAddLabModal}
          handleClose={() => setShowLabModal(false)}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    </div>
  );
};
