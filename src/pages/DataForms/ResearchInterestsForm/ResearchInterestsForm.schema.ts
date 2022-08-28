import { validationMessages } from "const";
import * as yup from "yup";

export const schema = yup.object().shape({
  research_interests: yup.array().of(
    yup.object().shape({
      research_interest: yup
        .string()
        .required(validationMessages.require.generic)
        .max(50, validationMessages.validate.max50),
    })
  ),
});
