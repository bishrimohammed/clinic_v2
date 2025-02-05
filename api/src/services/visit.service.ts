import { Op, Sequelize } from "sequelize";
import sequelize from "../db";
import {
  createPatientVisitType,
  patientVisitQueryType,
  updatePatientVisitType,
} from "../types/visit";
import { Employee, Patient, PatientVisit, User } from "../models";
import { userService } from ".";
import { ApiError } from "../shared/error/ApiError";
import {
  createMedicalRecord,
  getPatientLastMedicalRecord,
  parientActiveMedicalRecord,
} from "./medicalrecord.service";
import { differenceInDays } from "date-fns";
import { getClinicInfo } from "./clinic-profile.service";
import {
  addSingleBillingItemToMedicalBilling,
  createMedicalBilling,
} from "./billing.service";
import logger from "../config/logger";
import { getRegistationFeeServiceItem } from "./clinic-service.service";
import { dayOfWeekType } from "../types/shared";

/**
 * Get All patient visits
 * @param query - query params
 * @returns  - patient visits
 */
export const getVisits = async (
  query: patientVisitQueryType,
  userId: number
) => {
  const { q: searchTerm, sortBy } = query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  // const searchTerm = q?.trim();
  const whereClause: any = {};
  const orderClause: any = [];
  if (await userService.isDoctor(userId)) {
    whereClause.doctorId = userId;
  }
  // search by patient name, patient id,

  if (searchTerm) {
    const searchConditions = [];
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm.includes(" ")) {
      // Split search term into individual words for full name search
      const terms = trimmedSearchTerm.split(/\s+/);
      const nameConditions = terms.map((term) => ({
        [Op.or]: [
          { "$patient.firstName$": { [Op.like]: `%${term}%` } },
          { "$patient.lastName$": { [Op.like]: `%${term}%` } },
          { "$patient.middleName$": { [Op.like]: `%${term}%` } },
        ],
      }));
      searchConditions.push({ [Op.and]: nameConditions });
    } else {
      // Single word search for name parts
      searchConditions.push(
        { "$patient.firstName$": { [Op.like]: `%${trimmedSearchTerm}%` } },
        { "$patient.lastName$": { [Op.like]: `%${trimmedSearchTerm}%` } },
        { "$patient.middleName$": { [Op.like]: `%${trimmedSearchTerm}%` } }
      );
    }

    // Always include card number and phone number searches
    searchConditions.push(
      { "$patient.card_number$": { [Op.like]: `%${trimmedSearchTerm}%` } },
      { "$patient.phone$": { [Op.like]: `%${trimmedSearchTerm}%` } }
    );

    whereClause[Op.or] = searchConditions;
  }
  switch (sortBy) {
    case "patientName_asc":
      orderClause.push(
        ["patient", "firstName", "ASC"],
        ["patient", "lastName", "ASC"],
        ["patient", "middleName", "ASC"]
      );
      break;
    case "patientName_desc":
      orderClause.push(
        ["patient", "firstName", "DESC"],
        ["patient", "lastName", "DESC"],
        ["patient", "middleName", "DESC"]
      );
      break;
    case "patientId_asc":
      orderClause.push(["patient", "card_number", "ASC"]);
      break;
    case "patientId_desc":
      orderClause.push(["patient", "card_number", "DESC"]);
      break;
    // case "doctorName_asc":
    //   orderClause.push(["gender", "ASC"]);
    //   break;
    // case "sex_desc":
    //   orderClause.push(["gender", "DESC"]);
    //   break;
    case "visit_date_asc":
      orderClause.push(["visitDate", "ASC"], ["visitTime", "ASC"]);
      break;

    case "visit_date_desc":
      orderClause.push(["visitDate", "DESC"], ["visitTime", "DESC"]);
      break;
    default: {
      orderClause.push(["visitDate", "DESC"], ["visitTime", "DESC"]);
    }
  }
  const offset = (page - 1) * limit;
  const { rows: visits, count } = await PatientVisit.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "middleName",
          "card_number",
          "patient_type",
        ],
      },
      {
        model: User,
        as: "doctor",
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
        ],
        attributes: ["id"],
      },
    ],
    order: orderClause,
    offset,
    limit,
  });
  const hasMore = count > page * limit;
  return {
    visits,
    pagination: {
      currentPage: page,
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      hasMore,
    },
  };
};
/**
 * Get active patient visits
 * @param query it contains query params for pagination and sorting and search
 * @param userId is the id of the user who is logged in
 * @returns
 */
export const getActiveVisits = async (
  query: patientVisitQueryType,
  userId: number
) => {
  const { q: searchTerm, sortBy } = query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const whereClause: any = {};
  const orderClause: any = [];

  // search by patient name, patient id,
  if (searchTerm) {
    const searchConditions = [];
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm.includes(" ")) {
      // Split search term into individual words for full name search
      const terms = trimmedSearchTerm.split(/\s+/);
      const nameConditions = terms.map((term) => ({
        [Op.or]: [
          { "$patient.firstName$": { [Op.like]: `%${term}%` } },
          { "$patient.lastName$": { [Op.like]: `%${term}%` } },
          { "$patient.middleName$": { [Op.like]: `%${term}%` } },
        ],
      }));
      searchConditions.push({ [Op.and]: nameConditions });
    } else {
      // Single word search for name parts
      searchConditions.push(
        { "$patient.firstName$": { [Op.like]: `%${trimmedSearchTerm}%` } },
        { "$patient.lastName$": { [Op.like]: `%${trimmedSearchTerm}%` } },
        { "$patient.middleName$": { [Op.like]: `%${trimmedSearchTerm}%` } }
      );
    }

    // Always include card number and phone number searches
    searchConditions.push(
      { "$patient.card_number$": { [Op.like]: `%${trimmedSearchTerm}%` } },
      { "$patient.phone$": { [Op.like]: `%${trimmedSearchTerm}%` } }
    );

    whereClause[Op.or] = searchConditions;
  }
  // const user = await userService.getUserById(userId);
  // if (await user.isDoctorRole()) {
  //   whereClause["doctorId"] = userId;
  // }
  if (await userService.isDoctor(userId)) {
    whereClause.doctorId = userId;
  }
  whereClause["status"] = true;

  switch (sortBy) {
    case "patientName_asc":
      orderClause.push(
        ["patient", "firstName", "ASC"],
        ["patient", "lastName", "ASC"],
        ["patient", "middleName", "ASC"]
      );
      break;
    case "patientName_desc":
      orderClause.push(
        ["patient", "firstName", "DESC"],
        ["patient", "lastName", "DESC"],
        ["patient", "middleName", "DESC"]
      );
      break;
    case "patientId_asc":
      orderClause.push(["patient", "card_number", "ASC"]);
      break;
    case "patientId_desc":
      orderClause.push(["patient", "card_number", "DESC"]);
      break;
    // case "doctorName_asc":
    //   orderClause.push(["gender", "ASC"]);
    //   break;
    // case "sex_desc":
    //   orderClause.push(["gender", "DESC"]);
    //   break;
    case "visit_date_asc":
      orderClause.push(["visitDate", "ASC"], ["visitTime", "ASC"]);
      break;

    case "visit_date_desc":
      orderClause.push(["visitDate", "DESC"], ["visitTime", "DESC"]);
      break;
    default: {
      orderClause.push(["visitDate", "DESC"], ["visitTime", "DESC"]);
    }
  }
  const offset = (page - 1) * limit;
  const { rows: visits, count } = await PatientVisit.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Patient,
        as: "patient",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "middleName",
          "card_number",
          "patient_type",
        ],
      },
      {
        model: User,
        as: "doctor",
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
        ],
        attributes: ["id"],
      },
    ],
    order: orderClause,
    offset,
    limit,
  });
  const hasMore = count > page * limit;
  return {
    visits,
    pagination: {
      currentPage: page,
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      hasMore,
    },
  };
};
/**
 * Get patient visit by id
 * @param id patient visit id
 * @param withPatient it will include patient data
 * @param withDoctor it will include doctor data
 * @returns
 */
export const getPatientVisitById = async (
  visitId: string,
  withPatient: boolean = false,
  withDoctor: boolean = false
) => {
  const includeClause: any = [];
  if (withPatient) {
    includeClause.push({
      model: Patient,
      as: "patient",
      attributes: [
        "id",
        "firstName",
        "lastName",
        "middleName",
        "card_number",
        "patient_type",
      ],
    });
  }

  if (withDoctor) {
    includeClause.push({
      model: User,
      as: "doctor",
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName", "middleName", "lastName"],
        },
      ],
      attributes: ["id"],
    });
  }

  const visit = await PatientVisit.findByPk(visitId, {
    include: includeClause,
    // include: [
    //   {
    //     model: Patient,
    //     as: "patient",
    //     attributes: [
    //       "id",
    //       "firstName",
    //       "lastName",
    //       "middleName",
    //       "card_number",
    //       "patient_type",
    //     ],
    //   },
    //   {
    //     model: User,
    //     as: "doctor",
    //     include: [
    //       {
    //         model: Employee,
    //         as: "employee",
    //         attributes: ["id", "firstName", "middleName", "lastName"],
    //       },
    //     ],
    //     attributes: ["id"],
    //   },
    // ],
  });
  if (!visit) {
    throw new ApiError(404, "patientVisit not found");
  }
  return visit;
};

/**
 * Create patient visit
 * @param data - create patient visit data
 * @param userId - logged in user id
 */

export const createPatientVisit = async (
  data: createPatientVisitType,
  userId: number
) => {
  const { visitDate, visitTime, visitType, modeOfArrival, visitReason } = data;
  const patientId = parseInt(data.patientId);
  const activeVisit = await parientActiveMedicalRecord(patientId);
  if (activeVisit) {
    throw new ApiError(400, "Patient already have active medical record");
  }
  // console.log(visitDate, visitTime);

  const doctorId = parseInt(data.doctorId);
  const doctor = await userService.getUserById(doctorId); // Assuming getUserById is a method in your user service

  if (!(await doctor.isDoctorRole())) {
    throw new ApiError(
      400,
      // `User (${doctorId}) not a doctor role`
      `User with id (${doctorId}) is not a doctor`
    );
  }
  await checkDoctorConflictWithPatient(doctorId, visitDate, visitTime);
  const day_of_week = new Date(visitDate).toLocaleString("en-us", {
    weekday: "long",
  }) as dayOfWeekType;

  const isDoctorAvailable = await userService.isDoctorAvailable({
    date: visitDate,
    dayOfWeek: day_of_week,
    doctor: doctor,
    time: visitTime,
  });
  if (!isDoctorAvailable) {
    throw new ApiError(400, "Doctor is not available at the specified time.");
  }

  const lastVisit = await getPatientLastMedicalRecord(patientId);
  const transaction = await sequelize.transaction();
  try {
    const medicalRecord = await createMedicalRecord(patientId, transaction);
    const billing = await createMedicalBilling(
      medicalRecord.id,
      "MedicalRecord",
      transaction
    );

    const clinicInfo = await getClinicInfo();

    type visitStageType =
      | "Waiting for service fee"
      | "Waiting for triage"
      | "Waiting for doctor";

    let visitStage: visitStageType = clinicInfo.has_triage
      ? "Waiting for triage"
      : "Waiting for doctor";
    if (lastVisit) {
      const lastVisitData = lastVisit.createdAt!;

      const dayDifference = differenceInDays(new Date(), lastVisitData);
      // if (dayDifference < clinicInfo.min_days_between_visits) {
      //   throw new ApiError(
      //     400,
      //     `Patient can only visit after ${clinicInfo.min_days_between_visits} days`
      //   );
      // }
      if (dayDifference > clinicInfo.card_valid_date) {
        const registationFeeServiceItem = await getRegistationFeeServiceItem();
        const item = {
          price: registationFeeServiceItem.price,
          serviceItemId: registationFeeServiceItem.id,
        };
        await addSingleBillingItemToMedicalBilling(
          billing.id,
          item,
          userId,
          transaction
        );
        visitStage = "Waiting for service fee";
        // throw new ApiError(
        //   400,
        //   `Patient can only visit after ${clinicInfo.card_valid_date} days`
        // );
      }
    }
    if (visitType === "emergency") {
      visitStage = "Waiting for doctor";
    }
    const visit = await PatientVisit.create(
      {
        doctorId,
        medicalRecordId: medicalRecord.id,
        patientId,
        visitDate,
        visitTime,
        visitType,
        stage: visitStage,
        createdBy: userId,
        modeOfArrival: visitType === "emergency" ? modeOfArrival : null,
        reason: visitReason,
      },
      { transaction }
    );

    await transaction.commit();
    return visit;
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating patient visit " + error);
  }
};

/**
 * Update visit
 * @param visitId - visit id
 * @param  data - update patient visit data
 * @param userId - logged in user id
 * @returns {PatinetVisit} - it returns updated patient visit
 */

export const updatePatientVisit = async (
  visitId: string,
  data: updatePatientVisitType,
  userId: number
): Promise<PatientVisit> => {
  const { visitDate, visitType, modeOfArrival } = data;
  const visitTime = visitDate.toISOString().split("T")[1];
  const visit = await getPatientVisitById(visitId);

  // const doctorId = parseInt(visit.doctorId);
  const doctor = await userService.getUserById(visit.doctorId); // Assuming getUserById is a method in your user service

  await checkDoctorConflictWithPatient(
    visit.doctorId,
    visitDate,
    visitTime,
    visit.id
  );
  const day_of_week = new Date(visitDate).toLocaleString("en-us", {
    weekday: "long",
  }) as dayOfWeekType;

  const isDoctorAvailable = await userService.isDoctorAvailable({
    date: visitDate,
    dayOfWeek: day_of_week,
    doctor: doctor,
    time: visitTime,
  });
  if (!isDoctorAvailable) {
    throw new ApiError(400, "Doctor is not available at the specified time.");
  }

  await visit.update({
    visitDate: visitDate || visit.visitDate,
    visitTime: visitTime || visit.visitTime,
    visitType: visitType || visit.visitType,
    modeOfArrival: modeOfArrival || visit.modeOfArrival,
  });
  return visit;
};

/**
 * Check if doctor has other visit on the same date and time
 * @param doctorId - doctor id
 * @param visitDate -
 * @param visitTime
 * @param visitId
 * @returns
 */
export const checkDoctorConflictWithPatient = async (
  doctorId: number,
  visitDate: Date,
  visitTime: string,
  visitId?: number // optional parameter to exclude the current visit from the check if it's provided
) => {
  const whereClause: any = {
    doctorId: doctorId,
    visitDate: visitDate,
    visitTime: visitTime,
  };
  if (visitId) {
    whereClause.id = { [Op.not]: visitId };
  }
  const visit = await PatientVisit.findOne({
    where: whereClause,
  });
  if (visit) {
    throw new ApiError(400, "Doctor already scheduled with other patient");
  }
  // const hasOtherVisit = visit ? true : false;

  return false;
};
// export const updatePatientVisit = async (
//   id: number,
//   data: UpdatePatientVisitType
// ) => {
//   const visit = await getPatientVisitById(id);
//   if (!visit) {
//     throw new ApiError(404, "patientVisit not found");
//   }
//   await visit.update(data);
//   return visit;
// };
