const asyncHandler = require("express-async-handler");
const db = require("../models");
const getClinicInformation = require("../helpers/getClinicInformation");
module.exports = BillingController = {
  getOutStandingBillings: asyncHandler(async (req, res) => {
    const {} = req.query;
    let where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    console.log(where);
    console.log("\n\n bljhbjh\n\n");
    const billings = await db.MedicalBilling.findAll({
      include: [
        {
          model: db.Payment,
          as: "payments",
          where: { status: "Unpaid" },
          include: [
            { model: db.ServiceItem, as: "item" },
            {
              model: db.User,
              as: "cashier",
              include: {
                model: db.Employee,
                as: "employee",
                attributes: ["id", "firstName", "middleName", "lastName"],
              },
              attributes: ["id"],
            },
          ],
        },
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "middleName",
            "card_number",
            "gender",
            "birth_date",
            "is_credit",
            "status",
          ],
        },
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          include: [
            {
              model: db.PatientAssignment,
              as: "visit",
              include: {
                model: db.User,
                as: "doctor",
                include: {
                  model: db.Employee,
                  as: "employee",
                  attributes: ["id", "firstName", "middleName", "lastName"],
                },
                attributes: ["id"],
              },
            },
          ],
        },
      ],
    });
    res.json(billings);
  }),
  getBillingDetialByPatientId: asyncHandler(async (req, res) => {
    const { patientId } = req.params;
    // console.log(req.params);
    const medicalBillings = await db.MedicalBilling.findAll({
      where: {
        patient_id: patientId,
        status: true,
      },
    });
    const MedicalBillingIds = medicalBillings.map((bill) => bill.id);
    // console.log(MedicalBillingIds);
    const payments = await db.Payment.findAll({
      where: {
        medical_billing_id: MedicalBillingIds,
      },
      include: [
        { model: db.ServiceItem, as: "item" },
        {
          model: db.User,
          as: "cashier",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(payments);
  }),
  getBillPaymentsByBillId: asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(req.query);
    console.log("\n\n bljhbjh\n\n");
    let where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    where.medical_billing_id = id;
    const payments = await db.Payment.findAll({
      where: where,
      include: [
        { model: db.ServiceItem, as: "item" },
        {
          model: db.User,
          as: "cashier",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(payments);
  }),
  takePayment: asyncHandler(async (req, res) => {
    const { paymentAmount, paymentId } = req.body;

    const Payment = await db.Payment.findByPk(paymentId);
    if (!Payment) {
      res.status(400);
      throw new Error("Payment doesn't exist");
    }

    Payment.amount = paymentAmount;
    Payment.cashier_id = req.user.id;
    Payment.payment_date = new Date();
    Payment.status = "Paid";

    await Payment.save();
    const Item = await db.ServiceItem.findByPk(Payment.item_id);
    if (Item?.service_name === "Registration Fee") {
      const billing = await db.MedicalBilling.findOne({
        where: {
          id: Payment.medical_billing_id,
        },
        include: [
          {
            model: db.MedicalRecord,
            as: "medicalRecord",
          },
        ],
      });
      const clinic = await getClinicInformation(4);
      const visit = await db.PatientAssignment.findOne({
        where: {
          medicalRecord_id: billing.medicalRecord.id,
        },
      });
      if (clinic.has_triage) {
        visit.stage = "Waiting for triage";
      } else {
        visit.stage = "Waiting for examiner";
      }
      await visit.save();
    }
    const medicalBilling = await db.MedicalBilling.findByPk(
      Payment.medical_billing_id,
      {
        include: {
          model: db.Payment,
          as: "payments",
          where: {
            status: "Unpaid",
          },
        },
      }
    );

    if (medicalBilling && medicalBilling.payments.length === 0) {
      medicalBilling.status = true;
      await medicalBilling.save();
    }
    // billing.update({
    //   status: true,
    // });
    res.json(Payment);
  }),
  voidPayment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payment = await db.Payment.findByPk(id);
    if (!payment) {
      res.status(400);
      throw new Error("Payment not found");
    }
    payment.status = "Void";
    await payment.save();
    res.status(200).json({ message: "Payment voided" });
  }),
};
