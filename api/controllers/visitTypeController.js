const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = VisitTypeController = {
  getVisitTypes: asyncHandler(async (req, res) => {
    const visitTypes = await db.VisitType.findAll();
    res.status(200).json(visitTypes);
  }),
  getVisitTypeById: asyncHandler(async (req, res) => {
    const visitType = await db.VisitType.findByPk(req.params.id);
    res.status(200).json(visitType);
  }),
  createVisitType: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const visitType = await db.VisitType.create({ name });
    res.status(201).json(visitType);
  }),
  updateVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const visitType = await db.VisitType.update({ name }, { where: { id } });
    res.status(201).json(visitType);
  }),
  deleteVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visitType = await db.VisitType.destroy({ where: { id } });
    res.status(201).json(visitType);
  }),
};

// Display form to create VisitType
// exports.createVisitTypeForm = (req, res) => {
//   res.render("visitType/create");
// };

// // Create VisitType
// exports.createVisitType = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   const visitType = await db.VisitType.create({ name });
//   res.redirect("/visitTypes");
// });

// // Display VisitType details
// exports.getVisitType = asyncHandler(async (req, res) => {
//   const visitType = await db.VisitType.findByPk(req.params.id);
//   if (!visitType) {
//    throw new Error( "VisitType not found" );
//   }
//   res.status(200).json(visitType);
// });

// // Display form to edit VisitType
// exports.editVisitTypeForm = asyncHandler(async (req, res) => {
//   const visitType = await db.VisitType.findByPk(req.params.id);
//   if (!visitType) {
//     res.render("error", { message: "VisitType not found" });
//   } else {
//     res.render("visitType/edit", { visitType });
//   }
// });

// // Update VisitType
// exports.updateVisitType = asyncHandler(async (req, res) => {
//   const { name } = req.body;
//   const visitType = await db.VisitType.findByPk(req.params.id);
//   if (!visitType) {
//     res.render("error", { message: "VisitType not found" });
//   } else {
//     visitType.name = name;
//     await visitType.save();
//     res.redirect("/visitTypes");
//   }
// });

// // Delete VisitType
// exports.deleteVisitType = asyncHandler(async (req, res) => {
//   const visitType = await db.VisitType.findByPk(req.params.id);
//   if (!visitType) {
//     res.render("error", { message: "VisitType not found" });
//   } else {
//     await visitType.destroy();
//     res.redirect("/visitTypes");
//   }
// });
