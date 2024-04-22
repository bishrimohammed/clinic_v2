import React, { useState, useMemo } from "react";
import CreditCompanyTable from "./CreditCompanyTable";
import CreateCreditCompanyModal from "./CreateCreditCompanyModal";
import { useGetCreditCompany } from "./hooks/useGetCreditCompany";
import { Container } from "react-bootstrap";
import UpdateCreditCompanyModal from "./UpdateCreditCompanyModal";
import ActivateDiactivateCreditCompanyModal from "./ActivateDiactivateCreditCompanyModal";
import CreditCompanyFilterModal from "./CreditCompanyFilterModal";
import ViewCreditCompanyDetail from "./ViewCreditCompanyDetail";

const CreditCompanyList = () => {
  const [filter, setFilter] = useState({ status: "" });
  const [showAddCreditCompanyModal, setShowAddCreditCompanyModal] =
    useState(false);
  const { data, isPending } = useGetCreditCompany(filter);
  const [showDeactiveModal, setShowDeactiveModal] = useState({
    isShow: false,
    id: null,
    action: "",
  });
  // console.log(data);
  const [showFilter, setShowFilter] = useState(false);
  const [viewCompanyDetail, setViewCompanyDetail] = useState({
    isShow: false,
    company: null,
  });
  const [showUpdateCreditCompany, setUpdateCreditCompany] = useState({
    isShow: false,
    company: null,
  });
  const companyData = useMemo(() => data || [], [data, isPending]);
  // console.log(showDeactiveModal);
  return (
    <Container className="p-3">
      <CreditCompanyTable
        setShowAddCreditCompanyModal={setShowAddCreditCompanyModal}
        companies={companyData}
        setShowFilter={setShowFilter}
        setUpdateCreditCompany={setUpdateCreditCompany}
        setShowDeactiveModal={setShowDeactiveModal}
        setViewCompanyDetail={setViewCompanyDetail}
        setFilter={setFilter}
        isPending={isPending}
      />
      {showAddCreditCompanyModal && (
        <CreateCreditCompanyModal
          handleClose={setShowAddCreditCompanyModal}
          show={showAddCreditCompanyModal}
          isPending={isPending}
        />
      )}
      {showDeactiveModal.isShow &&
        showDeactiveModal.id &&
        showDeactiveModal.action && (
          <ActivateDiactivateCreditCompanyModal
            show={showDeactiveModal.isShow}
            handleClose={setShowDeactiveModal}
            companyId={showDeactiveModal.id}
            action={showDeactiveModal.action}
          />
        )}
      {showUpdateCreditCompany.isShow && showUpdateCreditCompany.company && (
        <UpdateCreditCompanyModal
          show={showUpdateCreditCompany.isShow}
          handleClose={setUpdateCreditCompany}
          data={showUpdateCreditCompany.company}
        />
      )}
      {showFilter && (
        <CreditCompanyFilterModal
          handleClose={setShowFilter}
          setFilter={setFilter}
          show={showFilter}
        />
      )}
      {viewCompanyDetail.isShow && viewCompanyDetail.company && (
        <ViewCreditCompanyDetail
          show={viewCompanyDetail.isShow}
          handleClose={setViewCompanyDetail}
          company={viewCompanyDetail.company}
        />
      )}
    </Container>
  );
};

export default CreditCompanyList;
