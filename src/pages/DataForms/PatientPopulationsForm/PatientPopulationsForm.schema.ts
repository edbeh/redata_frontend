import { validationMessages } from "const";
import * as yup from "yup";

export const schema = yup.object().shape({
  patient_populations: yup.array().of(
    yup.object().shape({
      patient_population: yup
        .string()
        .required(validationMessages.require.generic)
        .max(50, validationMessages.validate.max50),
    })
  ),
});
