import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  startOfWeek,
  parse,
  getDay,
  startOfDay,
  add,
  setDay,
  endOfWeek,
  addWeeks,
  set,
  addMinutes,
  isBefore,
} from "date-fns";
import enUS from "date-fns/locale/en-US";
import "./calender.css";
import { useLocation, useNavigate } from "react-router-dom";
import AddWorkHourModal from "./AddWorkHourModal";
import { useGetDoctors } from "./hooks/useGetDoctors";
import { Spinner } from "react-bootstrap";
import UpdateWorkHourModal from "./UpdateWorkHourModal";
import { IoMdArrowRoundBack } from "react-icons/io";
// import { use } from "../../../../api/routes/user.router";
// import { startOfDay, add, setDay } from "date-fns";
const AddStaffWorkHourForEmployee = () => {
  const { state } = useLocation();
  const [date, setDate] = useState(new Date());
  const { data, isPending, isFetching } = useGetDoctors();
  // console.log(state);
  const locales = {
    "en-US": enUS,
  };
  const user = useMemo(
    () => data?.find((u) => u.id === state.id),
    [data, isFetching]
  );
  // console.log(user);
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
    getDay,
    locales,
  });
  const [showAddWorkHourModal, setShowAddWorkHourModal] = useState({
    isShow: false,
    start: null,
  });
  const [showUpdateWorkHourModal, setShowUpdateWorkHourModal] = useState({
    isShow: false,
    event: null,
  });
  const navigate = useNavigate();
  // const ddd = user?.schedules?.map((s) => {
  //   return { ...s, allDay: true };
  // });
  const [events, setEvents] = useState([user?.schedules]);
  useEffect(() => {
    setEvents(user?.schedules);
  }, [data]);

  // console.log(date);
  const convertToEventObjects = () => {
    // console.log(date);
    const convertedEvents = [];

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // const today = new Date();
    daysOfWeek.forEach((day) => {
      const dayEvents = events?.filter((event) => event.day_of_week === day);

      dayEvents?.forEach((event) => {
        // console.log(event);
        const { start_time, end_time, id } = event;
        const startDate = setDay(
          startOfDay(startOfWeek(date, { weekStartsOn: 1 })),
          daysOfWeek.indexOf(day)
        );
        const endTime = add(startDate, {
          hours: parseInt(end_time.split(":")[0]),
          minutes: parseInt(end_time.split(":")[1]),
        });
        // add PM or AM on the time
        const startTime = add(startDate, {
          hours: parseInt(start_time.split(":")[0]),
          minutes: parseInt(start_time.split(":")[1]),
        });
        // console.log(startTime);

        convertedEvents.push({
          // title: `${day} Event`,
          start: startTime,
          end: endTime,
          id: id,
          // allDay: true,
        });
      });
    });

    return convertedEvents;
  };

  const handleSelectSlot = (slotinfo) => {
    // console.log(new Date(slotinfo.start).getDay());
    setShowAddWorkHourModal({
      isShow: true,
      start: slotinfo.start,
    });
  };

  // const dayHeaderFormat = (date, culture, localizer) => {
  //   // console.log(date);
  //   return format(date, "eeee", { locale: localizer.date }); // Display only the day of the week
  // };

  const eventSelectHandler = (event) => {
    // console.log(event);
    setShowUpdateWorkHourModal({
      isShow: true,
      event: event,
    });
  };
  const minDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const handleNavigate = (newDate, view, action) => {
    // console.log(newDate);
    // if (action === "PREV" && isBefore(newDate, minDate)) {
    //   // If the action is PREV and the new date is before the minimum date,
    //   // set the new date to the minimum date
    //   console.log("kkkkkkkkkkkkkkk");
    //   newDate = minDate;
    // }

    // // Call the setDate function to update the state with the new date
    // setDate(newDate);
    if (isBefore(newDate, minDate)) {
      console.log("true");
      console.log(minDate);
      setDate(minDate);
    } else {
      console.log("false");
      setDate(newDate);
    }
    console.log(date);
  };

  const handleViewChange = (view, date) => {
    if (isBefore(date, minDate)) {
      setDate(minDate);
    } else {
      setDate(date);
    }
  };
  return (
    <div>
      {/* AddStaffWorkHourForEmployee */}
      <div className=" p-2  d-flex gap-3 align-items-center">
        <IoMdArrowRoundBack
          className="cursorpointer"
          size={22}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h5 className="mb-0">
          Dr. {state.employee.firstName} {state.employee.middleName}{" "}
          {state.employee.lastName} working hour
        </h5>
      </div>
      <hr />
      {/* <div className="py-2">
        <p>
          Employee Name : {state.employee.firstName} {state.employee.middleName}{" "}
          {state.employee.lastName}
        </p>
        <p>Gender : {state.employee.gender} </p>
        <p>
          Position :{" "}
          {state.role.name.charAt(0).toUpperCase() + state.role.name.slice(1)}
        </p>
      </div> */}
      {/* <Calendar
        localizer={localizer}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        events={events}
        view={Views.WEEK}
        toolbar={false}
      /> */}
      {isPending ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <Calendar
          events={convertToEventObjects()}
          localizer={localizer}
          formats={
            {
              // dayHeaderFormat: ,
              // dayFormat: dayHeaderFormat,
            }
          }
          // startAccessor="start"
          // endAccessor="end"
          style={{ height: 400 }}
          views={["week", "day"]}
          // defaultView="week" // Set the default view to "week"
          // formats={{ eventTimeRangeFormat }} // Customize the event time range format
          // resourceIdAccessor="id"
          // view={Views.WEEK}
          defaultView="week"
          // min={minDate}
          // onNavigate={(newDate) => {
          //   // console.log(newDate);
          //   setDate(newDate);
          // }}
          onNavigate={handleNavigate}
          // onView={handleViewChange}
          // toolbar={false}
          selectable={true}
          onSelectSlot={(slotinfo) => handleSelectSlot(slotinfo)}
          onSelectEvent={eventSelectHandler}
          // date={new Date()}
          // date={date}
        />
      )}
      {showAddWorkHourModal.isShow ? (
        <AddWorkHourModal
          start={showAddWorkHourModal.start}
          handleClose={setShowAddWorkHourModal}
          show={state}
        />
      ) : null}
      {showUpdateWorkHourModal.isShow ? (
        <UpdateWorkHourModal
          event={showUpdateWorkHourModal.event}
          handleClose={setShowUpdateWorkHourModal}
          show={showUpdateWorkHourModal.isShow}
        />
      ) : null}
    </div>
  );
};

export default AddStaffWorkHourForEmployee;
