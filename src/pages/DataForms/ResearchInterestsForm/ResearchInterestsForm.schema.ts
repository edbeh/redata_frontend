import { validationMessages } from "const";
import * as yup from "yup";

export const schema = yup.object().shape({
  researchInterests: yup.array().of(
    yup.object().shape({
      researchInterest: yup
        .string()
        .required(validationMessages.require.generic)
        .max(50, validationMessages.validate.max50),
    })
  ),
});
