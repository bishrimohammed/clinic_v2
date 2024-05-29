import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import InternalMedicineTable from "./InternalMedicineTable";
import ExternalMedicineTable from "./ExternalMedicineTable";

const MedicineTab = () => {
  return (
    <div>
      <InternalMedicineTable />

      <ExternalMedicineTable />
    </div>
  );
};

export default MedicineTab;
