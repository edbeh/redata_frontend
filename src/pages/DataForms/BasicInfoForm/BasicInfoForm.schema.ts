import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  designation: yup.object().required(validationMessages.require.designation),
  name: yup.string().required(validationMessages.require.name),
  email: yup
    .string()
    .email(validationMessages.validate.email)
    .required(validationMessages.require.email),
  department: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .required(validationMessages.require.department),
  primary_subspecialty: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .required(validationMessages.require.primarySpecialty),
  primary_subspecialty_others: yup
    .string()
    .test(
      "required",
      validationMessages.require.generic,
      function (value, context) {
        return !(
          context.parent.primary_subspecialty.value === "others" && value === ""
        );
      }
    ),
  secondary_subspecialty: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() }),
  secondary_subspecialty_others: yup
    .string()
    .test(
      "required",
      validationMessages.require.generic,
      function (value, context) {
        return !(
          context.parent.secondary_subspecialty.value === "others" &&
          value === ""
        );
      }
    ),
  mcr_no: yup.string(),
  bio: yup.string().max(150, validationMessages.validate.max150),
});
