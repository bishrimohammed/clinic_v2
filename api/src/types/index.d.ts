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
