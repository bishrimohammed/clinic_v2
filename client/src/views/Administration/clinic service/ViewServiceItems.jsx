import React from "react";
import { useLocation } from "react-router-dom";
import { useGetServiceItems } from "./hooks/useGetServiceItems";

const ViewServiceItems = () => {
  const { state } = useLocation();
  const { data } = useGetServiceItems(state.id);
  console.log(data);
  return <div>ViewServiceItems</div>;
};

export default ViewServiceItems;
