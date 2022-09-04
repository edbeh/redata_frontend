import * as yup from "yup";

import { validationMessages } from "const";

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
  secondarySubspecialty: yup
    .object()
    .shape({ id: yup.string(), name: yup.string() }),
  secondarySubspecialtyOthers: yup.string().when("secondarySubspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
  mcrNo: yup.string(),
  bio: yup.string().max(150, validationMessages.validate.max150),
});
