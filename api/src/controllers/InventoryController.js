const asyncHandler = require("express-async-handler");
const db = require("../models");
module.exports = InventoryController = {
  getInStockMedicines: asyncHandler(async (req, res) => {
    const medicines = await db.Medicine.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: db.ServiceItem,
          as: "medicineServiceItem",
          attributes: ["id", "service_name", "price"],
        },
      ],
    });
    res.json(medicines);
  }),
};
