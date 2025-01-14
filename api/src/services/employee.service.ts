import { Address, Employee } from "../models";

export type employeeFilterType = {
  status: "true" | "false" | undefined;
  position: string | undefined;
  gender: "Male" | "Female" | undefined;
};

export const getEmployees = async (query: employeeFilterType) => {
  const { gender, position, status } = query;
  const whereClause: any = {};
  if (status) {
    whereClause.status = status === "true";
  }
  if (gender) {
    whereClause.gender = gender;
  }
  if (position) {
    whereClause.position = position;
  }
  console.log(query);

  const employees = await Employee.findAll({
    where: whereClause,
    include: [{ model: Address, as: "address" }],
  });
  return employees;
};
