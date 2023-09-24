import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  token: yup.string().required(validationMessages.require.generic),
  name: yup.string().required(validationMessages.require.name),
  password: yup.string().required(validationMessages.require.password),
  passwordConfirmation: yup
    .string()
    .required(validationMessages.require.confirmPassword),
});
