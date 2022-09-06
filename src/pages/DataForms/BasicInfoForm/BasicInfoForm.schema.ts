import * as yup from "yup";

import { validationMessages } from "const";

export const otherSubspecialtySchema = {
  otherSubspecialty: yup.object(),
  otherSubspecialtyOthers: yup.string(),
};

export const schema = yup.object({
  designation: yup.object().required(validationMessages.require.designation),
  name: yup.string().required(validationMessages.require.name),
  department: yup.object().required(validationMessages.require.department),
  primarySubspecialty: yup
    .object()
    .required(validationMessages.require.primarySpecialty),
  // .test(
  //   "duplicate-subspecialty",
  //   validationMessages.validate.duplicateSubSpecialty,
  //   function (value) {
  //     if (value?.id === "others") return true;
  //     return this.parent.secondarySubspecialty !== value;
  //   }
  // ),
  primarySubspecialtyOthers: yup.string().when("primarySubspecialty", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
  // .test(
  //   "duplicate-subspecialty",
  //   validationMessages.validate.duplicateSubSpecialty,
  //   function (value) {
  //     return this.parent.secondarySubspecialtyOthers !== value;
  //   }
  // ),
  otherSubspecialties: yup
    .array()
    .of(yup.object().shape(otherSubspecialtySchema)),
  mcrNo: yup.string(),
  bio: yup.string().max(150, validationMessages.validate.max150),
});
