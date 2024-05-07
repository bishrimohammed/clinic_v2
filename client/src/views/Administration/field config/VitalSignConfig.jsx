import React, { useState } from "react";
import { useGetVitalSignFields } from "../../hooks/useGetVitalSignFields";
import { Dropdown, Table } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEditLine } from "react-icons/ri";
import { FaLock, FaUserLock } from "react-icons/fa";
import { CgLockUnlock } from "react-icons/cg";
import VitalSignDeactivateActivateModal from "./VitalSignDeactivateActivateModal";

const VitalSignConfig = () => {
  const { data } = useGetVitalSignFields();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const handleToggleDropdown = (index, event) => {
    setOpenDropdownIndex(index === openDropdownIndex ? null : index);
    // setDropdownPosition({ left: event.clientX - 20, top: event.clientY - 200 });
  };
  const [showEnableDisableModal, setShowEnableDisableModal] = useState({
    isShow: false,
    action: "",
    id: null,
  });
  //   console.log(data);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Field</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                {item.status ? (
                  <span className="text-success">enabled</span>
                ) : (
                  <span className="text-danger">disabled</span>
                )}
              </td>
              <td
                className="p-0"
                onClick={(e) => e.stopPropagation()}
                style={{
                  zIndex: "0",
                }}
              >
                {item.status ? (
                  <div
                    className="ps-2 curserpointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowEnableDisableModal({
                        isShow: true,
                        id: item.id,
                        action: "Disable",
                      });
                      //   setShowDelete(true);
                    }}
                  >
                    <FaLock color="red" />
                  </div>
                ) : (
                  <div
                    className="ps-2 curserpointer"
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowEnableDisableModal({
                        isShow: true,
                        id: item.id,
                        action: "Enable",
                      });
                    }}
                  >
                    <CgLockUnlock color="green" />
                  </div>
                )}
                {/* <Dropdown
                  id={item.id + "dropdown"}
                  autoClose="outside"
                  //
                  // show={openDropdowns[rowEl.original.id]}
                  onToggle={(event) => handleToggleDropdown(null, event)}
                  show={openDropdownIndex === item.id}
                >
                  <Dropdown.Toggle
                    caret="false"
                    className="employee-dropdown px-3"
                    style={{ zIndex: 6 }}
                    id={`dropdown-${item.id}`}
                    onClick={(event) => handleToggleDropdown(item.id, event)}
                  >
                    <span
                      // style={{ color: "red", zIndex: -1 }}
                      className="text-dark"
                    >
                      <BsThreeDotsVertical />
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {item.status ? (
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowEnableDisableModal({
                            isShow: true,
                            id: item.id,
                            action: "Disable",
                          });
                          //   setShowDelete(true);
                        }}
                      >
                        <FaLock color="red" /> Disable
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="d-flex gap-2 align-items-center"
                        role="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowEnableDisableModal({
                            isShow: true,
                            id: item.id,
                            action: "Enable",
                          });
                          //   setShowDelete(true);
                        }}
                      >
                        <CgLockUnlock /> Enable
                      </Dropdown.Item>
                    )}
                   
                  </Dropdown.Menu>
                </Dropdown> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showEnableDisableModal.isShow && (
        <VitalSignDeactivateActivateModal
          show={showEnableDisableModal.isShow}
          handleClose={() => setShowEnableDisableModal({ isShow: false })}
          vitalSignId={showEnableDisableModal.id}
          action={showEnableDisableModal.action}
        />
      )}
    </div>
  );
};

export default VitalSignConfig;
