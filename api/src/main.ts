// user?: {
//   id: number,
//   role: string,
//   permissions: {
//       name: string,
//       permissionId: number,
//       create: boolean,
//       read: boolean,
//       edit: boolean,
//       delete: boolean
//   }[]

// } | undefined;
// import path from "path";
// console.log("\n\n" + path.join(__dirname) + "\n\n");

const arr = [{ permission_id: 2, create: true, read: false }];
const ttt = [...arr, { user: 3 }];
console.log(ttt);
