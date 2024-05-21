// generate patient id that look like P0002, P0987
export const generatePatientID = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const random = Math.floor(Math.random() * 10000);
  return `P${year}$${random}`;
};
