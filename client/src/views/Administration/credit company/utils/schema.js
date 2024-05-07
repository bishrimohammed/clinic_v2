import * as yup from "yup";
export const CompanyEmployeeschema = yup.object().shape({
  firstName: yup
    .string()
    .transform((value) => value.trim())
    .required("Name is required"),
  middleName: yup
    .string()
    .transform((value) => value.trim())
    .required("Father Name is required"),
  lastName: yup.string().transform((value) => value.trim()),
  photo_url: yup.mixed(),
  gender: yup.string().required("Gender is required"),
  position: yup.string().required("Position is required"),
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
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_1: yup
      .string()
      .matches(/^(09|07)\d{8}$/, "Phone number is invalid")
      .required("Phone number is required"),

    phone_2: yup
      .string()

      .nullable(),
  }),
});
