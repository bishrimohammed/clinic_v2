import React, { useMemo, useState } from "react";
import { useGetClinicService } from "./hooks/useGetClinicService";
import ClinicServiceTable from "./service Tables/ClinicServiceTable";
import { Spinner } from "react-bootstrap";
import DeactiveServiceModal from "./DeactiveServiceModal";
import UpdateServiceModal from "./update/UpdateServiceModal";
import ServiceFilterModal from "./ServiceFilterModal";

const ClinicServiceList = () => {
  const [filter, setFilter] = useState({ status: "" });
  const { data, isLoading, isPending, isFetching } =
    useGetClinicService(filter);
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    isShow: false,
    id: null,
    action: "",
  });
  // console.log(filter);
  const [showEditServiceModal, setShowEditServiceModal] = useState({
    isShow: true,
    service: null,
  });
  // filter modal state
  const [showFilter, setShowFilter] = useState(false);
  // const [viewServiceItem, setViewServiceItem] = useState({
  //   isShow: false,
  //   serviceItem: null,
  // });
  //   console.log(showDeactiveModal.isShow);
  const clinicServices = useMemo(() => data, [isPending, isFetching, data]);
  if (isPending) return <Spinner aniamtion="border" />;
  return (
    <div>
      <ClinicServiceTable
        clinicServices={clinicServices}
        setShowDeactiveModal={setShowDeactiveModal}
        setShowEditServiceModal={setShowEditServiceModal}
        setShowFilter={setShowFilter}
        setFilter={setFilter}
        isPending={isPending}
      />
      {showDeactiveModal.isShow && showDeactiveModal.id && (
        <DeactiveServiceModal
          show={showDeactiveModal.isShow}
          handleClose={setShowDeactiveModal}
          serviceId={showDeactiveModal.id}
          action={showDeactiveModal.action}
        />
      )}
      {/* showEditServiceModal.service && */}
      {showEditServiceModal.isShow && showEditServiceModal.service && (
        <UpdateServiceModal
          show={showEditServiceModal.isShow}
          handleClose={setShowEditServiceModal}
          data={showEditServiceModal.service}
        />
      )}
      {showFilter && (
        <ServiceFilterModal
          handleClose={setShowFilter}
          setFilter={setFilter}
          show={showFilter}
          filter={filter}
        />
      )}
    </div>
  );
};

export default ClinicServiceList;
