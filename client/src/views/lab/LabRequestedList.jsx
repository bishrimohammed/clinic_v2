import React, { useEffect, useMemo, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UseGetLabRequested } from "./hooks/UseGetLabRequested";
import PendingLabInvestigationTable from "./PendingLabInvestigationTable";

const LabRequestedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = UseGetLabRequested();
  console.log(data);
  const labs = useMemo(() => data || [], [data]);
  // return;
  if (isPending) return <Spinner animation="grow" />;
  if (error) return <div>error... + {error.message}</div>;
  return (
    <Container>
      <h6 className="border-bottom border-1 border-black py-2 mb-3 fw-bold">
        Pending Lab
      </h6>
      <PendingLabInvestigationTable isPending={isPending} labs={labs} />
    </Container>
  );
};

export default LabRequestedList;
