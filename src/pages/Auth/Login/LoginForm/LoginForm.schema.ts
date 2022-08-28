import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  email: yup
    .string()
    .email(validationMessages.validate.email)
    .required(validationMessages.require.email),
  password: yup.string().required(validationMessages.require.password),
});
