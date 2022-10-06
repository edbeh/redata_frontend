import * as yup from "yup";

import { validationMessages } from "const";

export const otherSubspecialtySchema = {
  otherSubspecialty: yup.object().required(),
  otherSubspecialtyOthers: yup.string().when("otherSubspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
};

export const schema = yup.object({
  designation: yup.object().required(validationMessages.require.designation),
  name: yup.string().required(validationMessages.require.name),
  department: yup.object().required(validationMessages.require.department),
  primarySubspecialty: yup
    .object()
    .required(validationMessages.require.primarySpecialty),
  primarySubspecialtyOthers: yup.string().when("primarySubspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
  otherSubspecialties: yup
    .array()
    .of(yup.object().shape(otherSubspecialtySchema)),
  pubMedNames: yup.string(),
  mcrNo: yup.string(),
  bio: yup.string().max(1500, validationMessages.validate.max1500),
});
