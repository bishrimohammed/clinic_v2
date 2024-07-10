const db = require("../models");

const approvalSettingMiddleWare = (permission_name, action_type) => {
  return async (req, res, next) => {
    console.log(permission_name, action_type);
    try {
      // Find the user in the database
      const permission = await db.Permission.findOne({
        where: {
          name: permission_name,
        },
      });
      console.log(permission);
      const approvalSetting = await db.ApprovalSetting.findOne({
        where: {
          permission_id: permission?.id,
          action: action_type,
        },
        include: ["approvers"],
      });

      // If the user is found, attach it to the request object
      //   if (approvalSetting) {
      //     console.log(approvalSetting);
      //     // res.json(approvalSetting);
      //     req.approvalSetting = approvalSetting;
      //     next();
      //   } else {
      //     res.status(401);
      //     throw new Error("Approver setting not found");
      //   }
      req.approvalSetting = approvalSetting;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("something went wrong");
    }
  };
};
module.exports = {
  approvalSettingMiddleWare,
};
