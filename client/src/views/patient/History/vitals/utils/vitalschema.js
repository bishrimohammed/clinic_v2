import * as yup from "yup";
export const vitalschema = yup.object().shape({
  temperature: yup.number().positive().required("temperature is required"),
  respiratoryRate: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("respiratoryRate is required"),
  SystolicBloodPressure: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("SystolicBloodPressure is required"),
  DiastolicBloodPressure: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("DiastolicBloodPressure is required"),
  heartRate: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("heartRate is required"),
  SaO2: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive(),
  SPO2: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("SPO2 is required"),
  FBS: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("FBS is required"),
  RBS: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("RBS is required"),
  height: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("height is required"),
  weight: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("temperature is required"),
  //  bodyMassIndex:  yup.number().transform((value) => (isNaN(value) ? undefined : value)).positive().required("temperature is required"),
  waistCircumference: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive(),
  headCircumference: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive(),
  pulseRate: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .required("pulseRate is required"),
});
