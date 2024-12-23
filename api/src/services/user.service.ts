import { User } from "../models";

export const getUserByusername = async (username: string) => {
  console.log("user login");

  return await User.findOne({
    where: { username: username },
  });
};

export const getUserById = async (id: string) => {
  return await User.findByPk(id);
};

// User.create({
//   password:"jhbjhbjhbjh",
//   role_id:1,
//   // username:"jhjhvhg",

// })
// User.create({})
// export const getUserByEmail = async(email:string)=>{
//     return await User
// }
