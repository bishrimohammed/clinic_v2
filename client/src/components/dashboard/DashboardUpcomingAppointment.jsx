import React, { useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { useGetDashboradAppointment } from "../../hooks/useGetDashboradAppointment";
import { format, parse } from "date-fns";

const DashboardUpcomingAppointment = () => {
  // const appintmentDate = new Date();
  const [appintmentDate, setAppointmentDate] = useState(null);
  const { data } = useGetDashboradAppointment();
  // console.log(data);
  return (
    <div className=" ">
      <h5 className="p-3 mb-0">Upcoming Appointment</h5>
      <hr className="mt-0" />
      {data?.map((appointment, index) => (
        <div
          key={appointment.id}
          className="mx-3 d-flex mb-1 flex-column pb-2 border-bottom "
        >
          <div className="d-flex gap-2 align-items-center">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                fontSize: 15,
                //   letterSpacing: 2,
              }}
              className=" bg-primary text-center text-white d-flex align-items-center justify-content-center"
            >
              {/* {employee.firstName.split("")[0].toUpperCase() +
                        employee.middleName.split("")[0].toUpperCase()} */}
              {appointment?.patient_name.split(" ")[0].charAt(0).toUpperCase()}
              {appointment?.patient_name.split(" ")[1].charAt(0).toUpperCase()}
            </div>
            <div className="d-flex flex-column  justify-content-center align-items-start">
              <h6 style={{ fontSize: 15 }} className=" mb-0">
                {appointment?.patient_name}
              </h6>
              <p className="mb-0 text-muted ">
                {appointment?.appointment_type}
              </p>
            </div>
          </div>
          <div
            style={{ fontSize: 14 }}
            className="d-flex gap-2  mt-2 align-items-center"
          >
            <MdOutlineAccessTime />{" "}
            {format(
              parse(appointment?.appointment_time, "HH:mm:ss", new Date()),
              "h:mm a"
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardUpcomingAppointment;
