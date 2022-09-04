import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  designation: yup.object().required(validationMessages.require.designation),
  name: yup.string().required(validationMessages.require.name),
  department: yup.object().required(validationMessages.require.department),
  primarySubspecialty: yup
    .object()
    .required(validationMessages.require.primarySpecialty)
    .test(
      "duplicate-subspecialty",
      validationMessages.validate.duplicateSubSpecialty,
      function (value) {
        if (value?.id === "others") return true;
        return this.parent.secondarySubspecialty !== value;
      }
    ),
  primarySubspecialtyOthers: yup
    .string()
    .when("primarySubspecialty", {
      is: (value: any) => {
        return value?.id === "others";
      },
      then: yup.string().required(validationMessages.require.generic),
      otherwise: yup.string(),
    })
    .test(
      "duplicate-subspecialty",
      validationMessages.validate.duplicateSubSpecialty,
      function (value) {
        return this.parent.secondarySubspecialtyOthers !== value;
      }
    ),
  secondarySubspecialty: yup
    .object()
    .test(
      "duplicate-subspecialty",
      validationMessages.validate.duplicateSubSpecialty,
      function (value) {
        if (value?.id === "others") return true;
        return this.parent.primarySubspecialty !== value;
      }
    ),
  secondarySubspecialtyOthers: yup
    .string()
    .when("secondarySubspecialty", {
      is: (value: any) => {
        return value?.id === "others";
      },
      then: yup.string().required(validationMessages.require.generic),
      otherwise: yup.string(),
    })
    .test(
      "duplicate-subspecialty",
      validationMessages.validate.duplicateSubSpecialty,
      function (value) {
        console.log("value", value);
        return this.parent.primarySubspecialtyOthers !== value;
      }
    ),
  mcrNo: yup.string(),
  bio: yup.string().max(150, validationMessages.validate.max150),
});
