import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  name: yup.string().required(validationMessages.require.name),
  email: yup
    .string()
    .email(validationMessages.validate.email)
    .required(validationMessages.require.email),
  institution: yup.object().required(validationMessages.require.institution),
  password: yup.string().required(validationMessages.require.password),
  passwordConfirmation: yup
    .string()
    .test(
      "passwords-match",
      validationMessages.validate.confirmPassword,
      function (value) {
        return this.parent.password === value;
      }
    )
    .required(validationMessages.require.confirmPassword),
});
