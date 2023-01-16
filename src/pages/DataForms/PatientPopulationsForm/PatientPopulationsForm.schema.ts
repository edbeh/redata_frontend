import { validationMessages } from "const";
import * as yup from "yup";

export const patientPopulationSchema = {
  patientPopulation: yup.object().required(validationMessages.require.generic),
  patientPopulationOthers: yup.string().when("patientPopulation", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
};

export const schema = yup.object().shape({
  patientPopulations: yup
    .array()
    .of(yup.object().shape(patientPopulationSchema)),
});
