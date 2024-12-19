/* eslint-disable react/prop-types */
import { Container, Pagination, Spinner } from "react-bootstrap";

import React, { useEffect, useMemo, useState } from "react";

import PatientTable from "./PatientTable";
import {
  fetchPatients,
  useGetPatients,
} from "./hooks/patientHooks/useGetPatients";
import ViewPatientModal from "./ViewPatientModal";
import PatientDeactivateModal from "./PatientDeactivateModal";
import PatientFilterModal from "./PatientFilterModal";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import SmartPaginationComponent from "../../components/SmartPaginationComponent";

const PatientList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("page"));
  const [showViewPatient, setShowViewPatient] = useState({
    isShow: false,
    patient: null,
  });
  const [filter, setFilter] = useState({
    is_new: "",
    is_credit: "",
    gender: "",
    status: "",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState({
    isShow: false,
    id: null,
    action: "",
  });
  useEffect(() => {
    // console.log(patients);
    setSearchParams({ page: 1, limit: 10, sortBy: "name", order: "asc" });
    // setSearchParams({ search: "test" });
  }, []);
  const { data, isLoading, isError, isFetching, isPending, isPlaceholderData } =
    useGetPatients({
      ...filter,
      page: parseInt(searchParams.get("page")),
      limit: parseInt(searchParams.get("limit")),
      sortBy: searchParams.get("sortBy"),
      order: searchParams.get("order"),
    });
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      const query = {
        ...filter,
        page: parseInt(searchParams.get("page")) + 1,
        limit: parseInt(searchParams.get("limit")),
        sortBy: searchParams.get("sortBy"),
        order: searchParams.get("order"),
      };
      queryClient.prefetchQuery({
        queryKey: ["Patients", query],
        queryFn: () => fetchPatients(query),
      });
    }
  }, [data, isPlaceholderData, searchParams.get("page"), queryClient]);
  // const patients = useMemo(
  //   () => data?.patients || [],
  //   [data, isFetching, isPending]
  // );
  const handlePagination = (page) => {
    setSearchParams((prev) => {
      // console.log(prev);
      //  return {
      //   ...prev,
      // if (btn === "first") {
      //   prev.set("page", 1);
      // } else if (btn === "previous") {
      //   prev.set("page", parseInt(prev.get("page")) - 1);
      // } else if (btn === "next") {
      //   prev.set("page", parseInt(prev.get("page")) + 1);
      // } else if (btn === "last") {
      //   // const totalPages = Math.ceil(data?.total_count / searchParams.get("limit"));

      //   prev.set("page", parseInt(data?.totalPages));
      // } else {
      //   prev.set("page", parseInt(page));
      // }
      prev.set("page", parseInt(page));
      // const page = prev.get("page");
      // console.log(page);
      // prev.set("page", parseInt(page) + 1);
      return prev;
      //  }
    });
  };
  // if (isFetching) return "fetching";
  // console.log(filter);
  return (
    <>
      <Container className="p-3 mb-5">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {/* {hasPermission("patient", "create") && (
              <Link to="/patients/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )} */}
          </div>
          <hr />
          <PatientTable
            patients={data?.patients || []}
            isPending={isPending}
            setShowViewPatient={setShowViewPatient}
            setShowFilterModal={setShowFilterModal}
            setShowDeactivateModal={setShowDeactivateModal}
            setFilter={setFilter}
          />{" "}
          <div className="d-flex gap-2 align-items-center">
            <SmartPaginationComponent
              currentPage={parseInt(searchParams.get("page"))}
              totalPages={parseInt(data?.totalPages)}
              onPageChange={handlePagination}
            />
            {/* <span className="mb-0">
              page {data?.currentPage} of {data?.totalPages}
            </span>
            <select
              style={{ outline: "none" }}
              className="p-1"
              value={searchParams.get("limit")}
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set("page", 1);
                  prev.set("limit", parseInt(e.target.value));
                  return prev;
                });
              }}
              // className="form-select"
            >
              {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select> */}
          </div>
          {/* <Pagination>
            <Pagination.First
              disabled={data?.currentPage === 1}
              onClick={() => handlePagination("first")}
            />
            <Pagination.Prev
              disabled={data?.currentPage === 1}
              onClick={() => handlePagination("previous")}
            />
            <Pagination.Item
              // disabled={data?.currentPage === 1}
              active={data?.currentPage === 1}
            >
              {1}
            </Pagination.Item>
            {data?.totalPages < 4 &&
              Array.from(
                { length: data?.totalPages || 0 },
                (_, index) => index + 2
              ).map((page) => (
                <Pagination.Item
                  key={page}
                  active={data?.currentPage === page}
                  onClick={() => handlePagination("", page)}
                >
                  {page}
                </Pagination.Item>
              ))}
            {data?.currentPage <= 3 ? (
              <>
                {" "}
                <Pagination.Item
                  // key={page}
                  active={data?.currentPage === 2}
                  onClick={() => handlePagination("", 2)}
                >
                  {2}
                </Pagination.Item>
                <Pagination.Item
                  // key={page}
                  active={data?.currentPage === 3}
                  onClick={() => handlePagination("", 3)}
                >
                  {3}
                </Pagination.Item>
                {data?.currentPage === 3 && (
                  <Pagination.Item
                    // key={page}
                    active={data?.currentPage === 4}
                    onClick={() => handlePagination("", 4)}
                  >
                    {4}
                  </Pagination.Item>
                )}
                <Pagination.Ellipsis />
                <Pagination.Item
                  // key={page}
                  active={data?.currentPage === data?.totalPages}
                  onClick={() => handlePagination("", data?.totalPages)}
                >
                  {data?.totalPages}
                </Pagination.Item>
              </>
            ) : (
              <>
                <Pagination.Ellipsis />
                <Pagination.Item
                  // key={page}
                  active={data?.currentPage === data?.currentPage - 1}
                  onClick={() => handlePagination("", data?.currentPage - 1)}
                >
                  {data?.currentPage - 1}
                </Pagination.Item>
                <Pagination.Item
                  // key={page}
                  active={data?.currentPage === data?.currentPage}
                  onClick={() => handlePagination("", data?.currentPage)}
                >
                  {data?.currentPage}
                </Pagination.Item>
                {data?.currentPage !== data?.totalPages && (
                  <Pagination.Item
                    // key={page}
                    active={data?.currentPage === data?.currentPage + 1}
                    onClick={() => handlePagination("", data?.currentPage + 1)}
                  >
                    {data?.currentPage + 1}
                  </Pagination.Item>
                )}
                {data?.currentPage + 1 <= data?.totalPages - 1 && (
                  <>
                    <Pagination.Ellipsis />
                    <Pagination.Item
                      // key={page}
                      active={data?.currentPage === data?.totalPages}
                      onClick={() => handlePagination("", data?.totalPages)}
                    >
                      {data?.totalPages}
                    </Pagination.Item>
                  </>
                )}
              </>
            )}

            <Pagination.Next
              onClick={() => handlePagination("next")}
              disabled={!data?.hasMore}
            />
            <Pagination.Last
              onClick={() => handlePagination("last")}
              disabled={data?.currentPage === data?.totalPages}
            />
          </Pagination> */}
        </div>
        {showViewPatient.isShow && (
          <ViewPatientModal
            show={showViewPatient.isShow}
            handleClose={() =>
              setShowViewPatient({ isShow: false, patient: null })
            }
            patient={showViewPatient.patient}
          />
        )}
        {showDeactivateModal.isShow && (
          <PatientDeactivateModal
            show={showDeactivateModal.isShow}
            handleClose={setShowDeactivateModal}
            patientId={showDeactivateModal.patientId}
            action={showDeactivateModal.action}
          />
        )}
        {showFilterModal && (
          <PatientFilterModal
            show={showFilterModal}
            handleClose={setShowFilterModal}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </Container>

      {/* <Container className="p-3">
        <div className="p-3 bg-hrun-box">
          <div className=" d-flex justify-content-between align-items-center w-100 mb-1">
            <h4 className="d-flex justify-content-center align-items-center mb-0">
              Patients List
            </h4>
            {currentUser.role === "cashier" && (
              <Link to="/patient/newpatient" className="btn btn-primary">
                Add Patient
              </Link>
            )}
          </div>
          <StripedRowExample />
        </div>
      </Container> */}
    </>
  );
};

export default PatientList;
