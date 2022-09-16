import * as yup from "yup";

import { validationMessages } from "const";

const searchInSchema = {
  subSpecialties: yup.object().required(),
  researchInterests: yup.object().required(),
  patientPopulations: yup.object().required(),
  publications: yup.object().required(),
};

export const schema = yup.object({
  keyword: yup.string().required(validationMessages.require.keyword),
  searchIn: yup
    .array()
    .of(yup.object().shape(searchInSchema))
    .required(validationMessages.validate.searchIn),
});
