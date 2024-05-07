import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import React from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";

const CreateNewWeekProgram = () => {
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
  const CustomEvent = ({ event }) => {
    console.log(event);
    return (
      <div>
        {/* <div>{event.title}</div> */}
        <button
          style={{ zIndex: 2 }}
          onClick={() => console.log("Button clicked!")}
        >
          me
        </button>
      </div>
    );
  };
  const events = [
    {
      title: "Event 1",
      start: new Date(2024, 3, 30, 10, 0, 0),
      end: new Date(2024, 3, 30, 11, 0, 0),
    },
    {
      title: "Event 2",
      start: new Date(2024, 3, 30, 10, 0, 0),
      end: new Date(2024, 3, 30, 11, 0, 0),
    },
    // Add more events here
  ];

  const CustomHeader = () => {
    return (
      <div className="custom-header">
        <div className="time-column">
          {/* Customize the time slot column as needed */}
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          {/* Add more time slot columns as needed */}
        </div>
      </div>
    );
  };
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 200 }}
        step={60}
        timeslots={60 * 4}
        views={["week", "day"]}
        defaultView="week"
        // events={events}
        view={Views.WEEK}
        toolbar={false}
        components={{
          eventWrapper: CustomEvent,
          // timeGutterHeader: CustomHeader,
          // event: CustomEvent,
          // event: CustomEvent,
        }}
      />
    </div>
  );
};

export default CreateNewWeekProgram;
