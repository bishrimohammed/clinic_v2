import * as yup from "yup";
export const patientSchema = yup.object().shape({
  patientId: yup.string(),
  registrationDate: yup.date(),
  firstName: yup
    .string()
    .transform((value) => value.trim())
    .required("Patient name is required"),
  middleName: yup
    .string()
    .transform((value) => value.trim())
    .required("Father Name is required"),
  lastName: yup.string().transform((value) => value.trim()),
  gender: yup.string().required("Sex is required"),
  is_new_born: yup.boolean(),
  blood_type: yup.string(),
  nationality: yup.string(),
  marital_status: yup.string(),
  // other_marital_status: yup.string()
  guardian_name: yup
    .string()
    .transform((value) => (value ? value.trim() : undefined)),
  guardian_relationship: yup.string().transform((value) => value.trim()),
  occupation: yup.string().transform((value) => value.trim()),
  has_phone: yup.boolean(),
  phone: yup
    .string()
    .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    .required("Phone is required"),
  // .when("has_phone", ([has_phone], schema) => {
  //   if (has_phone) {
  //     return schema
  //       .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
  //       .required("Phone is required");
  //   }
  //   return schema;
  // }),

  birth_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .max(new Date(Date.now()), "Date must be less than or equal to today")

    .required("Date of Birth is required"),

  // .typeError("Type an end date"),

  is_new: yup.boolean().required("patient type is required"),
  manual_card_id: yup.string(),
  //       .when("is_new", ([is_new], schema) => {
  //     if (!is_new) {
  //       return schema.required(
  //         "manual_card_id is required when patient is not new"
  //       );
  //     }
  //     return schema.nullable();
  //   }),

  is_credit: yup
    .boolean()
    .transform((value, originalValue) => {
      if (originalValue === "true") {
        return true;
      } else if (originalValue === "false") {
        return false;
      }
      return value;
    })
    .required("payment way is required"),
  //   required("Phone is required"),

  // .required("age is required"),

  address: yup.object({
    street: yup.string(),
    region_id: yup
      .string()
      // .transform((value) => parseInt(value))
      .required("Region is required"),
    city_id: yup.string().required("City is required"),
    subcity_id: yup.string().required("Subcity is required"),
    woreda_id: yup.string().required("woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    // phone_1: yup
    //   .string()
    //   .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    //   .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      .test("phone_2", "Phone number is invalid", (value) => {
        if (value === null || value === undefined || value === "") {
          return true; // Allow null or empty values
        }
        return /^(07|09)\d{8}$/.test(value);
      }),
    // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
    // .nullable(),
  }),
  emergency: yup.object().shape({
    firstName: yup
      .string()
      .transform((value) => value.trim())
      .required("Name is required"),
    middleName: yup
      .string()
      .transform((value) => value.trim())
      .required("Father Name is required"),
    lastName: yup.string().transform((value) => value.trim()),
    relation: yup.string().required("Relationship is required"),
    phone: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    the_same_address_as_patient: yup.boolean(),
    other_relation: yup
      .string()
      .transform((value) => value.trim())
      .when("relation", ([relation], schema) => {
        if (relation === "Other") {
          return schema.required("Relationship type is required");
        }
        return schema.nullable();
      }),
    region_id: yup
      .string()
      .when(
        "the_same_address_as_patient",
        ([the_same_address_as_patient], schema) => {
          if (!the_same_address_as_patient) {
            return schema.required("Region is required");
          }
          return schema.nullable();
        }
      ),
    city_id: yup
      .string()
      .when(
        "the_same_address_as_patient",
        ([the_same_address_as_patient], schema) => {
          if (!the_same_address_as_patient) {
            return schema.required("City is required");
          }
          return schema.nullable();
        }
      ),
    subcity_id: yup
      .string()
      .when(
        "the_same_address_as_patient",
        ([the_same_address_as_patient], schema) => {
          if (!the_same_address_as_patient) {
            return schema.required("Subcity is required");
          }
          return schema.nullable();
        }
      ),
    woreda_id: yup
      .string()
      .when(
        "the_same_address_as_patient",
        ([the_same_address_as_patient], schema) => {
          if (!the_same_address_as_patient) {
            return schema.required("Woreda is required");
          }
          return schema.nullable();
        }
      ),
    house_number: yup.string().transform((value) => value.trim()),
  }),
  // credit_company_id: yup.string().when("is_credit", ([is_credit], schema) => {
  //   if (is_credit) {
  //     return schema.required(
  //       "Company must be provided when payment way is credit"
  //     );
  //   }
  //   return schema.nullable();
  // }),
  isUpdate: yup.boolean().default(false),
  company_id: yup.string().when("is_credit", ([is_credit], schema) => {
    if (is_credit) {
      return schema.required("Company name is required");
    }
    return schema.nullable();
  }),
  employeeId: yup.string().when("company_id", ([company_id], schema) => {
    if (company_id) {
      return schema.required("Employee is required");
    }
    return schema.nullable();
  }),
  employeeId_doc: yup
    .mixed()
    .when(["is_credit", "isUpdate"], ([is_credit, isUpdate], schema) => {
      // console.log(f);
      // console.log(is_credit);
      // console.log(isUpdate);
      if (is_credit && !isUpdate) {
        return schema.test(
          "conditionalRequired",
          "Employee ID is required",
          function (value) {
            console.log(value);
            if (value.length == 0) {
              return this.createError({
                path: "employeeId_doc",
                message: "Employee ID is required",
              });
            }
            return true;
          }
        );
      }
      return schema.nullable();
    })

    .nullable(),
  letter_doc: yup.mixed(),

  // .when("is_credit", {
  //   is: (val) => val == true,
  //   then: yup.string().required("credit company is required"),
  //   otherwise: yup.string(),
  // }),
});
