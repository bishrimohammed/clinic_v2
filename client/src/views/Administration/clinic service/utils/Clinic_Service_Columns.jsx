export const Clinic_Service_Columns = [
  { header: "No", accessorKey: "id" },
  {
    header: "Service Name",
    accessorFn: (row) => row.service_name,
  },
  {
    header: "Status",
    accessorFn: (row) => (row.status ? "active" : "inactive"),
  },
];
