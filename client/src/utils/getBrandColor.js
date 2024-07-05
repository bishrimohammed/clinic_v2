export const getBrandColor = () => {
  const clinicInfo = JSON.parse(localStorage.getItem("clinicInfo"));
  return clinicInfo ? clinicInfo.brand_color : "white";
};
