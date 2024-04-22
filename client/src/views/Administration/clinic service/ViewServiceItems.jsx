import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetServiceItems } from "./hooks/useGetServiceItems";
import ServiceItemTable from "./service Tables/ServiceItemTable";
import DeactivateServiceItemModal from "./serviceItems/DeactivateServiceItemModal";
import ServiceItemsFilterModal from "./serviceItems/ServiceItemsFilterModal";
import ViewServiceItemDetail from "./serviceItems/ViewServiceItemDetail";
import UpdateServiceItemModal from "./update/UpdateServiceItemModal";
import ServiceGroupModal from "./ServiceGroupModal";
import CreateServiceItemModal from "./serviceItems/createServiceItemModal";

const ViewServiceItems = () => {
  const [filter, setFilter] = useState({
    status: "",
    groups: [],
    // gender: "",
  });
  const { state } = useLocation();
  const { data, isPending, isFetching } = useGetServiceItems(state.id, filter);
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    isShow: false,
    id: null,
    action: "",
  });
  // console.log(data);
  const [showFilter, setShowFilter] = useState(false);
  const [viewServiceItem, setViewServiceItem] = useState({
    isShow: false,
    serviceItem: null,
  });
  const [showUpdateServiceItemModal, setUpdateServiceItemModal] = useState({
    isShow: false,
    serviceItem: null,
  });
  const [showAddServiceItemModal, setShowAddServiceItemModal] = useState({
    isShow: false,
    state: null,
  });
  const [showServiceGroupModal, setShowServiceGroupModal] = useState(false);
  const items = useMemo(() => data || [], [data, isPending, isFetching]);
  console.log(showAddServiceItemModal);
  return (
    <div>
      <ServiceItemTable
        items={items}
        setShowDeactiveModal={setShowDeactiveModal}
        setFilter={setFilter}
        setShowFilter={setShowFilter}
        serviceName={state.service_name}
        setViewServiceItem={setViewServiceItem}
        setUpdateServiceItemModal={setUpdateServiceItemModal}
        setShowServiceGroupModal={setShowServiceGroupModal}
        setShowAddServiceItemModal={setShowAddServiceItemModal}
      />
      {showDeactiveModal.isShow && showDeactiveModal.id && (
        <DeactivateServiceItemModal
          id={showDeactiveModal.id}
          show={showDeactiveModal.isShow}
          action={showDeactiveModal.action}
          handleClose={setShowDeactiveModal}
          serviceId={state.id}
        />
      )}
      {showFilter && (
        <ServiceItemsFilterModal
          show={showFilter}
          handleClose={setShowFilter}
          setFilter={setFilter}
          serviceId={state.id}
        />
      )}
      {viewServiceItem.isShow && viewServiceItem.serviceItem && (
        <ViewServiceItemDetail
          show={viewServiceItem.isShow}
          handleClose={setViewServiceItem}
          serviceItem={viewServiceItem.serviceItem}
        />
      )}
      {showUpdateServiceItemModal.isShow && (
        <UpdateServiceItemModal
          show={showUpdateServiceItemModal.isShow}
          handleClose={setUpdateServiceItemModal}
          serviceItem={showUpdateServiceItemModal.serviceItem}
        />
      )}
      {showServiceGroupModal && (
        <ServiceGroupModal
          show={showServiceGroupModal}
          handleClose={setShowServiceGroupModal}
          // setFilter={setFilter}
        />
      )}
      {showAddServiceItemModal.isShow && (
        <CreateServiceItemModal
          show={showAddServiceItemModal.isShow}
          handleClose={setShowAddServiceItemModal}
          state={showAddServiceItemModal.state}
        />
      )}
    </div>
  );
};

export default ViewServiceItems;
