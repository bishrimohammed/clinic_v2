import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useGetServiceItems } from "./hooks/useGetServiceItems";
import ServiceItemTable from "./service Tables/ServiceItemTable";

const ViewServiceItems = () => {
  const { state } = useLocation();
  const { data, isPending, isFetching } = useGetServiceItems(state.id);
  const items = useMemo(() => data, [], [data, isPending, isFetching]);
  console.log(state);
  return (
    <div>
      <ServiceItemTable items={items} />
    </div>
  );
};

export default ViewServiceItems;
