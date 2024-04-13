export const ServiceItemColumns = [
  {
    header: "#",
    accessorFn: (row, index) => index + 1,
    // accessorKey: "id",
  },
  {
    header: "Item Name",
    accessorFn: (row) => row.service_name,
  },
  {
    header: "Group Name",
    accessorFn: (row) => row?.serviceCategory?.name,
  },
  {
    header: "Price",
    accessorFn: (row) => row.price,
  },

  {
    header: "Status",
    accessorFn: (row) => (row.status ? "active" : "inactive"),
  },
];
