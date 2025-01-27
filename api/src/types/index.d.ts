import * as Express from "express-serve-static-core";
declare global {
  namespace Express {
    interface Request {
      user:
        | {
            id: number;
            role: string;
            permissions: {
              name: string;
              permissionId: number;
              create: boolean;
              read: boolean;
              edit: boolean;
              delete: boolean;
            }[];
          }
        | undefined;
      customF: string;
    }
  }
}

declare module "sequelize" {
  interface InstanceUpdateOptions {
    /**
     * The ID of the user performing the update.
     * Used for auditing purposes in hooks like `afterUpdate`.
     */
    userId?: number;
  }
}
