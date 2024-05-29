export const diagnosisColumn = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
  },
  {
    header: "Diagnosis",
    accessorFn: (row) => row.diagnosis,
  },
  {
    header: "Status",
    accessorFn: (row) => row.status,
  },
];
