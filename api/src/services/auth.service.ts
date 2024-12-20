import { compareSync } from "bcryptjs";
import { userService } from ".";
import { ApiError } from "../shared/error/ApiError";

export const login = async (username: string, password: string) => {
  const user = await userService.getUserByusername(username);
  const isPasswordMatch = compareSync(password, user?.dataValues.password!);
  if (!user) {
    const errors = [{ message: "User not found", path: ["username"] }];
    throw new ApiError(404, "User not found", errors);
  }
  if (!isPasswordMatch) {
    const errors = [{ message: "Invalid credinatial", path: ["password"] }];
    throw new ApiError(400, "Invalid Password", errors);
  }
  return user;
};
