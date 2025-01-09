import API from "../axios-client";
type address = {
  id: string;
  name: string;
};
export type LocationType = {
  woredas: address[];
  regions: address[];
  cities: address[];
  subcities: address[];
};
export const getStaticAddressesFn = async () => {
  return await API.get<LocationType>("/addresses/static-addresses").then(
    (res) => res.data
  );
};
