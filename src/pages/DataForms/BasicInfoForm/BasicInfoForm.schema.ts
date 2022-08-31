import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  designation: yup.object().required(validationMessages.require.designation),
  name: yup.string().required(validationMessages.require.name),
  department: yup.object().required(validationMessages.require.department),
  primary_subspecialty: yup
    .object()
    .required(validationMessages.require.primarySpecialty),
  primary_subspecialty_others: yup.string().when("primary_subspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
  secondary_subspecialty: yup
    .object()
    .shape({ id: yup.string(), name: yup.string() }),
  secondary_subspecialty_others: yup.string().when("secondary_subspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
  mcr_no: yup.string(),
  bio: yup.string().max(150, validationMessages.validate.max150),
});
