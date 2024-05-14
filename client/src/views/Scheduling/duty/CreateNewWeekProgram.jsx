import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import React, { useEffect, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import "../calender.css";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import AddEmployeeToDutyModal from "./AddEmployeeToDutyModal";
// import CustomDutyEvents from "./CustomDutyEvents";
import { useGetDutyProgramById } from "../hooks/useGetDutyProgramById";
import { Spinner } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";

function getWeekDaysStartingFromDate(startingDate) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const result = [];
  const currentDate = new Date(startingDate);

  for (let i = 0; i < 7; i++) {
    const dayOfWeek = weekdays[currentDate.getDay()];
    const formattedDate = currentDate.toISOString().split("T")[0];

    result.push({ day: dayOfWeek, date: formattedDate });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}
const CreateNewWeekProgram = () => {
  // const [showAddEmployeeToDuty, setShowEmployeeToDuty] = useState({
  //   isShow: false,
  //   employeeId: null,
  // });
  // console.log(";lefmvnldgvkhaGDCasfc");
  const locales = {
    "en-US": enUS,
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales,
  });
  const { state: dutyWeek } = useLocation();
  const navigate = useNavigate();
  const { data: state, isPending } = useGetDutyProgramById(dutyWeek.id);
  if (isPending) return <Spinner animation="grow" />;
  // console.log(state);

  const EVENTS = state?.dutyAssignments.map((e, index) => {
    return {
      ...e,
      title: "helllo",
      start: new Date(e.duty_date + "T10:00"),
      end: new Date(e.duty_date + "T14:00"),
    };
  });

  const SevenDateOfWeek = getWeekDaysStartingFromDate(state?.weekStartDate);
  // console.log(SevenDateOfWeek);
  SevenDateOfWeek.map((day) => {
    const event = state?.dutyAssignments.filter(
      (d) => d.duty_date === day.date
    );
    // console.log(event.length);
    if (event.length === 0) {
      const EVENT = {
        title: "",
        duty_date: day.date,
        employee: null,
        start: new Date(day.date + "T10:00"),
        end: new Date(day.date + "T14:00"),
      };
      EVENTS.push(EVENT);
    }
  });
  // console.log(new Date(new Date("2024-05-13T10:00")));

  return (
    <div>
      <div className=" p-2  d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5 className="mb-0">
          Duty Program Between {state?.weekStartDate} and {state?.weekEndDate}
        </h5>
      </div>
      <hr />
      <Calendar
        localizer={localizer}
        events={EVENTS}
        defaultDate={state?.weekStartDate}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        selectable={true}
        // step={60}
        // timeslots={60 * 4}
        views={["week"]}
        defaultView="week"
        // events={events}
        // view={Views.WEEK}
        toolbar={true}
        components={{
          eventWrapper: CustomDutyEvents,
          // timeGutterHeader: CustomHeader,
          // event: CustomEvent,
          // event: CustomEvent,
        }}
      />
    </div>
  );
};
let previousDate = "";
export default CreateNewWeekProgram;

const CustomDutyEvents = ({ event }) => {
  const [showAddEmployeeToDuty, setShowEmployeeToDuty] = useState({
    isShow: false,
    employeeId: null,
    duty_date: null,
    dutyAssigments: null,
  });
  const { state } = useLocation();

  const handleButtonClick = () => {
    setShowEmployeeToDuty({
      isShow: true,
      // employeeId,
      duty_date: event.duty_date,
      // dutyAssigments: state.dutyAssignments,
    });
  };

  let ButtonComp;
  // let ButtonComp;
  if (previousDate && previousDate !== event.duty_date) {
    previousDate = event.duty_date;
    ButtonComp = (
      <button
        style={{ zIndex: 2 }}
        className={`border-0 bg-transparent ${
          event.duty_date < new Date().toISOString().substring(0, 10)
            ? "text-warning"
            : "text-white"
        }  p-0`}
        disabled={event.duty_date < new Date().toISOString().substring(0, 10)}
        onClick={() => handleButtonClick(event.employee)}
      >
        <FaPlus />
      </button>
    );
  }
  if (!previousDate) {
    previousDate = event.duty_date;
    ButtonComp = (
      <button
        style={{ zIndex: 2 }}
        disabled={event.duty_date < new Date().toISOString().substring(0, 10)}
        className={`border-0 bg-transparent ${
          event.duty_date < new Date().toISOString().substring(0, 10)
            ? "text-warning"
            : "text-white"
        }  p-0`}
        onClick={() => handleButtonClick(event.employee)}
      >
        <FaPlus />
      </button>
    );
  }

  return (
    <>
      {" "}
      <div key={event.id} className="bg-primary w-100 text-white py-1 px-2">
        <div className="d-flex justify-content-end mb-1">{ButtonComp}</div>

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
          // employeeId={showAddEmployeeToDuty.employeeId}
          duty_date={showAddEmployeeToDuty.duty_date}
          // dutyAssigments={showAddEmployeeToDuty.dutyAssigments}
        />
      )}
    </>
  );
};
