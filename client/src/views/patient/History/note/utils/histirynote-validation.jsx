import * as yup from "yup";
export const History_Note_schema = yup.object().shape({
  chiefcomplaint: yup.string().required("chief complaint is required"),
  HPI: yup.string().required("HPI is required"),

  assesement: yup.string().required("assesement is required"),
  plan: yup.string().required("plan is required"),
  vital: yup.object().shape({
    pulse_rate: yup.number().required("pulse_rate is required"),
    SPO2: yup.number().required("SPO2 is required"),
    // SaO2: yup.number(),
    respiration_rate: yup.number().required("respirationRate is required"),
    height: yup.number().positive(),
    weight: yup.number().positive(),
    temperature: yup.number().required("temperature is required"),
    diastolic_blood_pressure: yup
      .number()
      .required("diastolic_blood_pressure is required"),
    systolic_blood_pressure: yup
      .number()
      .required(" systolic_blood_pressure is required"),
  }),
  physicalExamination: yup.object().shape({
    general_appreance: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    cardiovascular: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),

    abdominal: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),

    HEENT: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    musculoskeletal: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    neurological: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
    respiratory: yup.object().shape({
      normal: yup.boolean(),
      remark: yup.string(),
    }),
  }),
});
