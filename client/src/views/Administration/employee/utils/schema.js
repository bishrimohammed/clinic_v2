import * as yup from "yup";
export const Employeeschema = yup.object().shape({
  firstName: yup
    .string()
    .transform((value) => value.trim())
    .required("First Name is required"),
  middleName: yup
    .string()
    .transform((value) => value.trim())
    .required("Father Name is required"),
  lastName: yup.string().transform((value) => value.trim()),
  photo: yup.mixed(),
  digital_signature: yup.mixed(),
  gender: yup.string().required("Gender is required"),
  position: yup.string().required("Position is required"),
  other_position: yup
    .string()
    .transform((value) => value.trim())
    .when("position", ([position], schema) => {
      if (position === "Other") {
        return schema.required("New position is required");
      }
      return schema.nullable();
    }),
  date_of_birth: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })

    .nullable()
    .required("Date of Birth is required"),
  date_of_hire: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue === "") {
        return undefined; // Return undefined for empty string
      }
      return value;
    })
    .nullable()
    .required("Date of Hire is required"),
  address: yup.object().shape({
    street: yup.string(),
    region_id: yup.string().required("Region is required"),
    city_id: yup.string().required("City is required"),
    subcity_id: yup.string().required("Subcity is required"),
    woreda_id: yup.string().required("Woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
  Emergency: yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    middleName: yup.string().required("Middle Name is required"),
    lastName: yup.string(),
    the_same_address_as_employee: yup.boolean(),
    phone: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .nullable(),
    // .when(
    //   "the_same_address_as_employee",
    //   ([the_same_address_as_employee], schema) => {
    //     if (the_same_address_as_employee) {
    //       return schema
    //         .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    //         .nullable()
    //         .notRequired();
    //       // .required("Phone Number is required");
    //     }
    //     // return schema.nullable();
    //   }
    // ),

    // .nullable(),
    // .required("Phone number is required"),
    relation: yup
      .string()
      .required("Relationship is required")
      .transform((value) => value.trim()),
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
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Region is required");
          }
          return schema.nullable();
        }
      ),
    city_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("City is required");
          }
          return schema.nullable();
        }
      ),
    subcity_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Subcity is required");
          }
          return schema.nullable();
        }
      ),
    woreda_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Woreda is required");
          }
          return schema.nullable();
        }
      ),
    house_number: yup.string().transform((value) => value.trim()),
    // phone_1: yup
    //   .string()
    //   .when(
    //     "the_same_address_as_employee",
    //     ([the_same_address_as_employee], schema) => {
    //       // console.log(the_same_address_as_employee);
    //       if (!the_same_address_as_employee) {
    //         return schema
    //           .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
    //           .required("phone number is required");
    //       }
    //       return schema.nullable();
    //     }
    //   ),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
});

export const EditEmployeeschema = yup.object().shape({
  firstName: yup
    .string()
    .transform((value) => value.trim())
    .required("First Name is required"),
  middleName: yup
    .string()
    .transform((value) => value.trim())
    .required("Father Name is required"),
  lastName: yup.string().transform((value) => value.trim()),
  photo: yup.mixed(),
  gender: yup.string().required("Gender is required"),
  position: yup
    .string()
    .transform((value) => value.trim())
    .required("Position is required"),
  other_position: yup
    .string()
    .transform((value) => value && value.trim())
    .when("position", ([position], schema) => {
      if (position === "Other") {
        return schema.required("position is required");
      }
      return schema.nullable();
    }),
  date_of_birth: yup.date().required("Date of Birth is required"),
  date_of_hire: yup.date().required("Date of Hire is required"),
  addressId: yup.number(),
  address: yup.object().shape({
    id: yup.number(),
    street: yup.string(),
    region_id: yup.string().required("Region is required"),
    city_id: yup.string().required("City is required"),
    subcity_id: yup.string().required("Subcity is required"),
    woreda_id: yup.string().required("Woreda is required"),
    house_number: yup.string(),
    email: yup.string().email("Invalid email"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()

      .nullable(),
  }),
  Emergency: yup.object().shape({
    id: yup.number(),
    addressId: yup.number(),
    firstName: yup
      .string()
      .transform((value) => value.trim())
      .required("First Name is required"),
    middleName: yup
      .string()
      .transform((value) => value.trim())
      .required("Middle Name is required"),
    lastName: yup.string().transform((value) => value.trim()),
    phone: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),
    the_same_address_as_employee: yup.boolean(),
    relation: yup
      .string()
      .transform((value) => value.trim())
      .required("Relationship is required"),
    other_relation: yup
      .string()

      .when("relation", ([relation], schema) => {
        if (relation === "Other") {
          return schema.required("Relationship type is required");
        }
        return schema.nullable();
      })
      .transform((value) => value && value.trim()),
    region_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Region is required");
          }
          return schema.nullable();
        }
      ),
    city_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("City is required");
          }
          return schema.nullable();
        }
      ),
    subcity_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Subcity is required");
          }
          return schema.nullable();
        }
      ),
    woreda_id: yup
      .string()
      .when(
        "the_same_address_as_employee",
        ([the_same_address_as_employee], schema) => {
          if (!the_same_address_as_employee) {
            return schema.required("Woreda is required");
          }
          return schema.nullable();
        }
      ),
    house_number: yup.string().transform((value) => value.trim()),
    phone_1: yup.string(),

    // validate phone number start with 09 or 07 it must me 10 digit
    phone_2: yup
      .string()
      // .matches(/^(09|07)?\d{8}$/, "Phone number is invalid")
      .nullable(),
  }),
});
