import { Transaction } from "sequelize";
import { MedicalBilling } from "../models";
import ServiceLineItem from "../models/billing/ServiceLineItem";
import { getMedicalRecordById } from "./medicalrecord.service";
import { getExternalServiceById } from "./external.service";
import { ApiError } from "../shared/error/ApiError";

/**
 * Get medical billing by id
 * @param id
 * @returns
 */
export const getMedicalBillingById = async (id: string) => {
  const medicalBilling = await MedicalBilling.findByPk(id);
  if (!medicalBilling) {
    throw new ApiError(404, "Medical billing not found");
  }
  return medicalBilling;
};
/**
 * Create medical billing
 * @param billableId
 * @param billableType
 * @param transaction
 * @returns MedicalBilling
 * @description Creates a new medical billing record if it does not already exist.

 */
export const createMedicalBilling = async (
  billableId: string,
  billableType: "MedicalRecord" | "ExternalService",
  transaction?: Transaction
) => {
  //   const { billableId, billableType } = data;
  const existingBilling = await MedicalBilling.findOne({
    where: { billableId: billableId, billableType },
  });
  if (existingBilling) {
    return existingBilling;
  }
  const medicalBilling = await MedicalBilling.create(
    {
      billableId,
      billableType,
      isInternalService: billableType === "MedicalRecord" ? true : false,
    },
    { transaction }
  );
  return medicalBilling;
};
/**
 * Add billing item to medical billing
 * @param medicalBillingId
 * @param item
 * @param userId
 * @param transaction
 * @returns
 */
export const addSingleBillingItemToMedicalBilling = async (
  medicalBillingId: string,
  item: { serviceItemId: number; price: number },
  userId: number,
  transaction?: Transaction
) => {
  const { price, serviceItemId } = item;
  const billingItem = await ServiceLineItem.create(
    {
      billingId: medicalBillingId,
      unitPrice: price,
      createdBy: userId,
      serviceItemId: serviceItemId,
    },
    { transaction }
  );
  return billingItem;
};

/**
 * Add bulk billing items to medical billing
 * @param data
 */

export const addBulkBillingItemsToMedicalBilling = async (data: {
  billableId: string;
  billableType: "MedicalRecord" | "ExternalService";
  items: { serviceItemId: number; price: number }[];
  userId: number;
  transaction?: Transaction;
}) => {
  const { billableId, billableType, items, userId, transaction } = data;

  // Atomic billing record handling with transaction
  const [medicalBilling] = await MedicalBilling.findOrCreate({
    where: { billableId },
    defaults: {
      billableId,
      billableType,
      // isInternalService:false
      isInternalService: billableType === "MedicalRecord" ? true : false,
    },
    transaction,
  });

  if (medicalBilling.billableType !== billableType) {
    throw new ApiError(400, "Billable type mismatch for existing record");
  }

  // Create billing line items
  await ServiceLineItem.bulkCreate(
    items.map((item) => ({
      billingId: medicalBilling.id,
      unitPrice: item.price,
      serviceItemId: item.serviceItemId,
      createdBy: userId,
    })),
    { transaction }
  );
};

/**
 * Get billing items by medical billing id
 * @param medicalBillingId
 * @returns
 */
export const getBillingItemsByMedicalBillingId = async (
  medicalBillingId: string
) => {
  const billingItems = await ServiceLineItem.findAll({
    where: { billingId: medicalBillingId },
    include: [
      {
        model: MedicalBilling,
        as: "billing",
      },
      {
        model: ServiceLineItem,
        as: "serviceItem",
      },
    ],
  });
  if (!billingItems || billingItems.length === 0) {
    throw new ApiError(404, "No billing items found for this medical billing");
  }
  return billingItems;
};

/**
 * Take invoice payment of medical billing from array of service line items
 * @param medicalBillingId
 * @param  Array of service line item ids to be paid
 * @param userId
 *
 */
export const takeInvoicePaymentFromServiceLineItems = async (
  medicalBillingId: string,
  items: { serviceItemId: number; price: number }[],
  paymentMethod: "Cash" | "Card" | "Insurance" | "Mobile",
  userId: number,
  transaction?: Transaction
) => {};

/**
 * create invoice for medical billing from selected service line items
 * @param medicalBillingId
 * @param items
 */

export const createInvoiceFromServiceLineItems = async (
  medicalBillingId: string,
  items: string[],
  userId: number,
  transaction?: Transaction
) => {
  // Validate medical billing exists
  const medicalBilling = await getMedicalBillingById(medicalBillingId);
  // fetch service line items
  const serviceLineItems = await medicalBilling.getServiceLineItems({
    where: { id: items },
    include: [
      {
        model: ServiceLineItem,
        as: "serviceItem",
        attributes: ["id", "price"],
      },
    ],
    transaction,
  });
  if (!serviceLineItems || serviceLineItems.length === 0) {
    throw new ApiError(
      404,
      "No service line items found for this medical billing"
    );
  }
  // check if there is items not in medical billing
  if (serviceLineItems.length !== items.length) {
    throw new ApiError(
      400,
      "Some service line items are not part of this medical billing"
    );
  }
  // calculate total amount
  const totalAmount = serviceLineItems.reduce((acc, item) => {
    return acc + item.unitPrice * item.quantity - item.discount;
  }, 0);

  // create invoice
  // const invoice = await
};
