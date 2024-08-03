export const ActiveTreatmmentColumn = [
  {
    header: "Patient ID",
    accessorFn: (row, index) => row.patient.card_number,
  },
  {
    header: "Patient Name",
    accessorFn: (row) =>
      row.patient.firstName +
      " " +
      row.patient.middleName +
      " " +
      row.patient.lastName,
  },
  {
    header: "Visit Date",
    accessorFn: (row) => row.medicalRecord.visit.assignment_date,
  },
];
