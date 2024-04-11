import * as yup from "yup";
export const patientSchema = yup.object().shape({
  firstName: yup.string().required("first Name is required"),
  middleName: yup.string().required("middle Name is required"),
  lastName: yup.string(),
  gender: yup.string().required("gender is required"),
  age: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .min(0)
    .max(100),

  // .required("age is required"),
  is_dependent: yup.boolean().required("is_dependent"),
  woreda: yup.string(),
  kebele: yup.string(),
  address: yup.object().shape({
    street: yup.string().required("street is required"),
    woreda_id: yup.string().required("woreda is required"),

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

  birth_date: yup
    .date()
    .transform((value, originalValue) => {
      if (originalValue && typeof originalValue === "string") {
        const parsedDate = new Date(originalValue);
        return isNaN(parsedDate) ? originalValue : parsedDate;
      }
      return value;
    })
    .max(new Date(Date.now()), "date must be less than or equal to today")
    .typeError("Type an end date"),

  is_new: yup
    .boolean()
    // .transform((value, originalValue) => {
    //   if (originalValue === "true") {
    //     return true;
    //   } else if (originalValue === "false") {
    //     return false;
    //   }
    //   return value;
    // })
    .required("patient type is required"),
  manual_card_id: yup.string().when("is_new", ([is_new], schema) => {
    if (!is_new) {
      return schema.required(
        "manual_card_id is required when patient is not new"
      );
    }
    return schema.nullable();
  }),

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
  credit_company_id: yup.string().when("is_credit", ([is_credit], schema) => {
    if (is_credit) {
      return schema.required(
        "company must be provided when payment way is credit"
      );
    }
    return schema.nullable();
  }),
  // .when("is_credit", {
  //   is: (val) => val == true,
  //   then: yup.string().required("credit company is required"),
  //   otherwise: yup.string(),
  // }),
});
