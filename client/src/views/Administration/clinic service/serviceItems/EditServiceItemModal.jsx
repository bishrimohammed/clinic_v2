import React from "react";
import * as yup from "yup";
const serviceItemSchema = yup.object().shape({
  id: yup.number(),
  service_name: yup.string().required("Service Name is required"),
  allowgroup: yup.boolean(),
  islab: yup.boolean(),
  serviceGroup: yup.string().when("allowgroup", ([allowgroup], schema) => {
    if (allowgroup) {
      return schema.required("Service Group is required");
    }
    return schema.nullable();
  }),
  // .required("Service Group is required"),
  unit: yup.string(),
  referenceRange: yup.string(),
  lab: yup
    .object()
    .shape({
      isFixed: yup.boolean(),
      underPanel: yup.boolean(),
      isPanel: yup.boolean(),
      childService: yup.array().of(yup.number()),
    })
    .when("islab", ([islab], schema) => {
      // console.log(islab);
      if (islab) {
        return schema.required("rew is required");
      }
      return schema.nullable();
    }),
  price: yup
    .number()
    .transform((value) => {
      if (isNaN(value)) {
        return 0;
      }
      return parseInt(value);
    })
    .min(0)
    // .positive()
    // .round(1)
    // .typeError("Invalid price")
    .when("lab.underPanel", ([underPanel], schema) => {
      console.log(underPanel);
      if (!underPanel) {
        return schema.required("Price is required");
      }
      return schema.nullable();
    }),
});
const EditServiceItemModal = () => {
  return <div>EditServiceItemModal</div>;
};

export default EditServiceItemModal;
