// import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetLabCompleted } from "./hooks/useGetLabCompleted";
import CompletedLabTable from "./CompletedLabTable";
import { useMemo } from "react";

const LabCompletedList = () => {
  const navigate = useNavigate();

  const { data, isPending, error } = useGetLabCompleted();
  const labs = useMemo(() => data || [], [data]);

  // if (isPending) return <Spinner animation="grow" />;
  // if (error) return <div>error... + {error.message}</div>;
  // console.log(data);

  return (
    <Container>
      <h5 className="border-bottom border-1  py-2 mb-4 fw-bold">
        Completed lab investigation
      </h5>
      <CompletedLabTable labs={labs} isPending={isPending} />
    </Container>
  );
};

export default LabCompletedList;
