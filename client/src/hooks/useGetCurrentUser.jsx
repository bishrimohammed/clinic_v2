import React from "react";

export const useGetCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user;
};
