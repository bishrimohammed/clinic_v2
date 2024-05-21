// import React, { useEffect, useRef, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import AddEmployeeToDutyModal from "./AddEmployeeToDutyModal";
// import { useLocation } from "react-router-dom";

const CustomDutyEvents = ({ event }) => {
  const [showAddEmployeeToDuty, setShowEmployeeToDuty] = useState({
    isShow: false,
    employeeId: null,
    duty_date: null,
    dutyAssigments: null,
  });
  const { state } = useLocation();
  const [isButtonDisplayed, setIsButtonDisplayed] = useState(false);

  useEffect(() => {
    if (event.duty_date && !isButtonDisplayed) {
      setIsButtonDisplayed(true);
    }
  }, [event.duty_date, isButtonDisplayed]);

  const handleButtonClick = (employeeId) => {
    setShowEmployeeToDuty({
      isShow: true,
      employeeId,
      duty_date: event.duty_date,
      dutyAssigments: state.dutyAssignments,
    });
  };
  //   const [previousDate, setPreviousDate] = useState("");
  //   let previusDate = "";
  //   const previousDateRef = useRef(null);
  //   useEffect(() => {
  //     previousDateRef.current = previusDate;
  //   }, [previusDate]);

  //   if (previousDate && previousDate !== event.duty_date) {
  //     setPreviousDate(event.duty_date);
  //     // setPreviousDate(event.duty_date)
  //     console.log("lllllllllllllll");
  //     ButtonComp = (
  //       <button
  //         style={{ zIndex: 2 }}
  //         className="border-0 bg-transparent text-white p-0"
  //         onClick={() =>
  //           setShowEmployeeToDuty({ isShow: true, employeeId: event.employee })
  //         }
  //       >
  //         <FaPlus />
  //       </button>
  //     );
  //   }
  //   console.log(previousDate);
  //   if (!previousDate) {
  //     previousDate = event.duty_date;
  //     ButtonComp = (
  //       <button
  //         style={{ zIndex: 2 }}
  //         className="border-0 bg-transparent text-white p-0"
  //         onClick={() =>
  //           setShowEmployeeToDuty({ isShow: true, employeeId: event.employee })
  //         }
  //       >
  //         <FaPlus />
  //       </button>
  //     );
  //     // setPreviousDate(event.duty_date);
  //   } else if (previousDate !== event.duty_date) {
  //     ButtonComp = (
  //       <button
  //         style={{ zIndex: 2 }}
  //         className="border-0 bg-transparent text-white p-0"
  //         onClick={() =>
  //           setShowEmployeeToDuty({ isShow: true, employeeId: event.employee })
  //         }
  //       >
  //         <FaPlus />
  //       </button>
  //     );
  //   }
  //   console.log(showAddEmployeeToDuty);
  return (
    <>
      {" "}
      <div key={event.id} className="bg-primary w-100 text-white py-1 px-2">
        {/* <div className="d-flex justify-content-end mb-1">{ButtonComp}</div> */}
        {isButtonDisplayed && (
          <div className="d-flex justify-content-end mb-1">
            <button
              disabled={
                event.duty_date < new Date().toISOString().substring(0, 10)
              }
              style={{ zIndex: 2 }}
              className={`border-0 bg-transparent ${
                event.duty_date < new Date().toISOString().substring(0, 10)
                  ? "text-warning"
                  : "text-white"
              }  p-0`}
              onClick={() => handleButtonClick(event.employee)}
            >
              <FaPlus />
            </button>
          </div>
        )}

        <p className="small mb-0">
          {event?.employee?.firstName} {event?.employee?.middleName}
        </p>
      </div>
      {showAddEmployeeToDuty.isShow && (
        <AddEmployeeToDutyModal
          show={showAddEmployeeToDuty.isShow}
          handleClose={() =>
            setShowEmployeeToDuty({ isShow: false, employeeId: null })
          }
          employeeId={showAddEmployeeToDuty.employeeId}
          duty_date={showAddEmployeeToDuty.duty_date}
          dutyAssigments={showAddEmployeeToDuty.dutyAssigments}
        />
      )}
    </>
  );
};

export default CustomDutyEvents;
