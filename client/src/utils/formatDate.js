import moment from "moment";
export const format = (date) => {
  const parsedDate = moment(date);
  const formattedDate = parsedDate.format("L");
  //return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  return formattedDate;
};
export const formatHour = (date) => {
  const parsedDate = moment(date);
  const formattedDate = parsedDate.format("LT");
  //return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  return formattedDate;
};
export const Diff = (date) => {
  const todayDate = moment().subtract(10, "days");
  // const formattedDate = parsedDate.format("L");
  //return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  return moment(date).isBefore(todayDate);
};
