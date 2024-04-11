import React, { useMemo, useState } from "react";
import { useGetClinicService } from "./hooks/useGetClinicService";
import ClinicServiceTable from "./service Tables/ClinicServiceTable";
import { Spinner } from "react-bootstrap";
import DeactiveServiceModal from "./DeactiveServiceModal";

const ClinicServiceList = () => {
  const { data, isLoading, isPending, isFetching } = useGetClinicService();
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    isShow: false,
    id: null,
  });
  //   console.log(showDeactiveModal.isShow);
  const clinicServices = useMemo(() => data, [isPending, isFetching]);
  if (isPending) return <Spinner aniamtion="border" />;
  return (
    <div>
      <ClinicServiceTable
        clinicServices={clinicServices}
        setShowDeactiveModal={setShowDeactiveModal}
      />
      {showDeactiveModal.isShow && showDeactiveModal.id && (
        <DeactiveServiceModal
          show={showDeactiveModal.isShow}
          handleClose={setShowDeactiveModal}
          serviceId={showDeactiveModal.id}
        />
      )}
    </div>
  );
};

export default ClinicServiceList;
