// // src/types/sequelize.d.ts
// import { InstanceCreateOptions, InstanceUpdateOptions } from "sequelize";

// declare global {
//   namespace Sequelize {
//     interface InstanceCreateOptions {
//       /**
//        * The ID of the user performing the create operation.
//        * Used for auditing purposes in hooks like `afterCreate`.
//        */
//       userId?: number;
//     }

//     interface InstanceUpdateOptions {
//       /**
//        * The ID of the user performing the update operation.
//        * Used for auditing purposes in hooks like `afterUpdate`.
//        */
//       userId?: number;
//     }
//   }
// }
