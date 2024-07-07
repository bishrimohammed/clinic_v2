const asyncHandler = require("express-async-handler");
const db = require("../../../models");

const add_MedicalRecord_medicineItem_to_Billing = asyncHandler(
  async (medical_record_id, items, item_name, userId) => {
    const medical_record = await db.MedicalRecord.findByPk(medical_record_id);
    const MedicalBillingExist = await db.MedicalBilling.findOne({
      where: {
        medical_record_id: medical_record_id,
      },
    });
    let medicalBilling_Id;
    // console.log("\n\n ab");
    // console.log(items);
    // console.log("\n\nmb");
    const visit = await db.PatientAssignment.findOne({
      where: {
        medicalRecord_id: medical_record_id,
      },
    });
    if (MedicalBillingExist) {
      medicalBilling_Id = MedicalBillingExist.id;
    } else {
      const MedicalRecord = await db.MedicalBilling.create(
        {
          medical_record_id: medical_record_id,
          patient_id: medical_record.patient_id,
          visit_id: visit.id,
          date: Date.now(),
        },
        { userId }
      );
      medicalBilling_Id = MedicalRecord.id;
    }
    if (MedicalBillingExist?.has_advanced_payment) {
      const serviceItems = await db.ServiceItem.findAll({
        where: {
          id: items,
        },
      });
      const openAdvancedPayment = await db.AdvancedPayment.findOne({
        where: {
          medical_billing_id: medicalBilling_Id,
        },
      });
      const totalPrice = serviceItems?.reduce(
        (sum, item) => sum + item.price,
        0
      );
      if (openAdvancedPayment.remaining_amount < totalPrice) {
        await Promise.all(
          items.map(async (medinice_id) => {
            return await db.Payment.create(
              {
                medical_billing_id: medicalBilling_Id,
                item_id: medinice_id,
              },
              { userId }
            );
          })
        )
          .then(async (payments) => {
            await visit.update(
              {
                stage: "Waiting for payment",
                is_advanced_payment_amount_completed: true,
              },
              { userId }
            );
            // console.log(payments);
            return "payment created successfully";
          })
          .catch((err) => {
            console.log(err);
            return "payment not created";
          });
      } else {
        openAdvancedPayment.remaining_amount -= totalPrice;
        await openAdvancedPayment.save();
        await Promise.all(
          items.map(async (medinice_id) => {
            return await db.Payment.create(
              {
                medical_billing_id: medicalBilling_Id,
                item_id: medinice_id,
                cashier_id: openAdvancedPayment.cashier_id,
                payment_date: new Date(),
                status: "Paid",
              },
              { userId }
            );
          })
        )
          .then(async (payments) => {
            if (item_name === "lab") {
              await visit.update(
                {
                  stage: "Waiting for lab",
                },
                { userId }
              );
            }

            // console.log(payments);
            return "payment created successfully";
          })
          .catch((err) => {
            console.log(err);
            return "payment not created";
          });
      }
    } else {
      await Promise.all(
        items.map(async (medinice_id) => {
          return await db.Payment.create(
            {
              medical_billing_id: medicalBilling_Id,
              item_id: medinice_id,
            },
            { userId }
          );
        })
      )
        .then(async (payments) => {
          let stage = "";
          // if (String(visit.visit_type).toLowerCase() === "emergency") {
          //   stage = "Waiting for triage";
          // }
          if (
            String(visit.visit_type).toLowerCase() === "emergency" &&
            item_name === "lab"
          ) {
            stage = "Waiting for lab";
          } else {
            stage = "Waiting for payment";
          }

          await visit.update(
            {
              stage: stage,
            },
            { userId }
          );

          // await visit.update({
          //   stage: "Waiting for payment",
          // });
          // console.log(payments);
          return "payment created successfully";
        })
        .catch((err) => {
          console.log(err);
          return "payment not created";
        });
    }
    // await Promise.all(
    //   items.map(async (medinice_id) => {
    //     return await db.Payment.create({
    //       medical_billing_id: medicalBilling_Id,
    //       item_id: medinice_id,
    //     });
    //   })
    // )
    //   .then(async (payments) => {
    //     await visit.update({
    //       stage: "Waiting for payment",
    //     });
    //     // console.log(payments);
    //     return "payment created successfully";
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return "payment not created";
    //   });
  }
);

module.exports = {
  add_MedicalRecord_medicineItem_to_Billing,
};
