import { Op, Sequelize } from "sequelize";
import { patientVisitQueryType } from "../types/visit";
import { Employee, Patient, PatientVisit, User } from "../models";
import { userService } from ".";
import { ApiError } from "../shared/error/ApiError";

/**
 * Get All patient visits
 * @param query - query params
 * @returns  - patient visits
 */
export const getVisits = async (query: patientVisitQueryType) => {
  const { q, sortBy } = query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const searchTerm = q?.trim();
  const whereClause: any = {};
  const orderClause: any = [];

  // search by patient name, patient id,
  if (searchTerm) {
    whereClause[Op.or] = [
      {
        [Op.or]: [
          { "$patient.firstName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.lastName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.middleName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.card_number$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.phone$": { [Op.like]: `%${searchTerm}%` } },
        ],
      },
      Sequelize.literal(
        `CONCAT(patient.firstName, ' ', patient.middleName, ' ', patient.lastName) LIKE '%${searchTerm}%'`
      ),
      Sequelize.literal(
        `CONCAT(patient.firstName, ' ', patient.middleName) LIKE '%${searchTerm}%'`
      ),
    ];
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
  const { q, sortBy } = query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const searchTerm = q?.trim();
  const whereClause: any = {};
  const orderClause: any = [];

  // search by patient name, patient id,
  if (searchTerm) {
    whereClause[Op.or] = [
      {
        [Op.or]: [
          { "$patient.firstName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.lastName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.middleName$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.card_number$": { [Op.like]: `%${searchTerm}%` } },
          { "$patient.phone$": { [Op.like]: `%${searchTerm}%` } },
        ],
      },
      Sequelize.literal(
        `CONCAT(patient.firstName, ' ', patient.middleName, ' ', patient.lastName) LIKE '%${searchTerm}%'`
      ),
      Sequelize.literal(
        `CONCAT(patient.firstName, ' ', patient.middleName) LIKE '%${searchTerm}%'`
      ),
    ];
  }
  const user = await userService.getUserById(userId);
  if (await user.isDoctorRole()) {
    whereClause["doctorId"] = userId;
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
  id: number,
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

  const visit = await PatientVisit.findByPk(id, {
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

// export const createPatientVisit = async (
//   data: CreatePatientVisitType
// ) => {
//   const visit = await PatientVisit.create(data);
//   return visit;
// };

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
