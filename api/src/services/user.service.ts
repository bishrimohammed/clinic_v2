import { User } from "../models";

export const getUserByusername = async (username: string) => {
  console.log("user login");

  return await User.findOne({ where: { username: username } });
};

// export const getUserByEmail = async(email:string)=>{
//     return await User
// }
