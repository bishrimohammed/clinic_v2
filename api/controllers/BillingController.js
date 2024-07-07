const asyncHandler = require("express-async-handler");
const db = require("../models");
const getClinicInformation = require("../helpers/getClinicInformation");
// const { default: AddAdvancedPayment } = require("../../client/src/views/Bill/AddAdvancedPayment");
module.exports = BillingController = {
  getOutStandingBillings: asyncHandler(async (req, res) => {
    const {} = req.query;
    let where = {};
    if (req.query.visit_date) {
      where.assignment_date = req.query.visit_date;
    }
    if (req.query.stage) {
      where.stage = req.query.stage;
    }
    if (req.query.visit_type) {
      where.visit_type = req.query.visit_type;
    }
    console.log(where);
    console.log("\n\n bljhbjh\n\n");
    console.log(req.query);
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
            "patient_type",
          ],
        },
        {
          model: db.MedicalRecord,
          as: "medicalRecord",
          // include: [
          //   {
          //     model: db.PatientAssignment,
          //     as: "visit",
          //     include: {
          //       model: db.User,
          //       as: "doctor",
          //       include: {
          //         model: db.Employee,
          //         as: "employee",
          //         attributes: ["id", "firstName", "middleName", "lastName"],
          //       },
          //       attributes: ["id"],
          //     },
          //     // where: where,
          //   },
          // ],
        },
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
          where: where,
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
  AddAdvancedPayment: asyncHandler(async (req, res) => {
    const { billingId } = req.params;
    const { amount, description } = req.body;
    console.log(req.body);
    console.log(billingId);
    const billing = await db.MedicalBilling.findByPk(billingId);
    if (!billing) {
      res.status(400);
      throw new Error("Billing doesn't exist");
    }
    const previouslyOpenAdvancedPayment = await db.AdvancedPayment.findOne({
      where: {
        medical_billing_id: billingId,
        status: "Open",
      },
    });
    const newAdvancedPayment = await db.AdvancedPayment.create(
      {
        medical_billing_id: billingId,
        amount_paid: amount,
        cashier_id: req.user.id,
        description: description,
        status: "Open",
      },
      { userId: req.user.id }
    );
    if (previouslyOpenAdvancedPayment) {
      newAdvancedPayment.amount_remaining_from_previous_payment =
        previouslyOpenAdvancedPayment.remaining_amount;
      newAdvancedPayment.total_amount =
        parseFloat(newAdvancedPayment.amount_paid) +
        parseFloat(previouslyOpenAdvancedPayment.remaining_amount);
      newAdvancedPayment.remaining_amount =
        parseFloat(newAdvancedPayment.amount_paid) +
        parseFloat(previouslyOpenAdvancedPayment.remaining_amount);

      previouslyOpenAdvancedPayment.status = "Closed";
      previouslyOpenAdvancedPayment.remaining_amount = 0.0;
      await previouslyOpenAdvancedPayment.save({ userId: req.user.id });
    } else {
      newAdvancedPayment.amount_remaining_from_previous_payment = 0.0;
      newAdvancedPayment.total_amount = parseFloat(
        newAdvancedPayment.amount_paid
      );
      newAdvancedPayment.remaining_amount = parseFloat(
        newAdvancedPayment.amount_paid
      );
    }
    await newAdvancedPayment.save({ hooks: false });
    billing.has_advanced_payment = true;
    billing.is_advanced_payment_amount_completed = false;
    await billing.save();
    await db.PatientAssignment.update(
      { stage: "Admitted" },
      {
        where: { id: billing.visit_id },
        individualHooks: true,
        userId: req.user.id,
      }
    );
    res.status(201).json({ msg: "Advanced Payment Added Successfully" });
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

    await Payment.save({ userId: req.user.id });
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
      await visit.save({ userId: req.user.id });
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
      await medicalBilling.save({ userId: req.user.id });
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
    await payment.save({ userId: req.user.id });
    res.status(200).json({ message: "Payment voided" });
  }),
};
