export const PendingLab_Column = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Patient Name",
    accessorFn: (row) =>
      row.medicalRecord.patient.firstName +
      " " +
      row.medicalRecord.patient.middleName +
      " " +
      row.medicalRecord.patient.lastName,
  },
  {
    header: "Requested By",
    accessorFn: (row) =>
      row.orderedTests[0]?.requestedBy?.employee?.firstName +
      " " +
      row.orderedTests[0]?.requestedBy?.employee?.middleName +
      " " +
      row.orderedTests[0]?.requestedBy?.employee?.lastName,
  },
  {
    header: "Request Time",
    accessorFn: (row) => row.createdAt,
  },
];
