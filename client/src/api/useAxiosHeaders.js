import { useSelector } from "react-redux";

export const AxiosHeaders = () => {
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(currentUser.token);

  const header = {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  }; //, `Authorization: Bearer ${currentUser.token}`;
  return {
    headers: {
      Authorization: `Bearer ${currentUser.token}`,
    },
  };
};
