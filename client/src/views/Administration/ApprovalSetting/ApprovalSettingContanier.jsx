import React, { useMemo } from "react";
import ApprovalListTable from "./ApprovalListTable";
import { useGetApprovalSetting } from "./hooks/useGetApprovalSetting";
import FilterApprovalModal from "./FilterApprovalModal";

const ApprovalSettingContanier = () => {
  const [filter, setFilter] = React.useState({
    status: "",
    approval_level: "",
  });
  const { data, isPending } = useGetApprovalSetting(filter);

  const approval_settings = useMemo(() => data || [], [data]);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  console.log(data);
  return (
    <div>
      <ApprovalListTable
        approval_settings={approval_settings}
        isPending={isPending}
        setShowFilterModal={setShowFilterModal}
        showFilterModal={showFilterModal}
        setFilter={setFilter}
        filter={filter}
      />
      {showFilterModal && (
        <FilterApprovalModal
          show={showFilterModal}
          handleClose={() => setShowFilterModal(false)}
          setFilter={setFilter}
          filter={filter}
        />
      )}
    </div>
  );
};

export default ApprovalSettingContanier;
