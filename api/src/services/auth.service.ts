import { compareSync } from "bcryptjs";
import { userService } from ".";
import { ApiError } from "../shared/error/ApiError";

export const login = async (username: string, password: string) => {
  const user = await userService.getUserByusername(username);

  if (!user) {
    const errors = [{ message: "User not found", path: ["username"] }];
    throw new ApiError(404, "User not found", errors);
  }
  // const employee = await user.getUserPermissions();
  // // const eU = await employee.getUser();
  // // console.log("getRole: " + user.getEmployee());
  // console.log(employee[0].dataValues);

  // console.log(eU);

  const isPasswordMatch = compareSync(password, user?.dataValues.password!);
  if (!isPasswordMatch) {
    const errors = [{ message: "Invalid credinatial", path: ["password"] }];
    throw new ApiError(400, "Invalid Password", errors);
  }
  return user;
};
