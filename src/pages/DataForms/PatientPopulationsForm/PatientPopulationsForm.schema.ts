import { validationMessages } from "const";
import * as yup from "yup";

export const patientPopulationSchema = {
  patientPopulation: yup
    .string()
    .required(validationMessages.require.generic)
    .max(50, validationMessages.validate.max50),
};

export const schema = yup.object().shape({
  patientPopulations: yup
    .array()
    .of(yup.object().shape(patientPopulationSchema)),
});
