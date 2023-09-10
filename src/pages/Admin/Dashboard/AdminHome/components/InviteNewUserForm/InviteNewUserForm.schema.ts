import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  emails: yup
    .string()
    .email(validationMessages.validate.email)
    .required(validationMessages.require.email),
});
