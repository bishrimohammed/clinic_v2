export const getClinicInformation = () => {
  const clinicInfo = JSON.parse(localStorage.getItem("clinicInfo"));
  return clinicInfo;
};
