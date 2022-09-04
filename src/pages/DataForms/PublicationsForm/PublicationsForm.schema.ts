import { validationMessages } from "const";
import * as yup from "yup";

export const pubMedNamesSchema = yup.object().shape({
  pubmed_names: yup
    .string()
    .required(validationMessages.require.pubmedName)
    .matches(/^.{1,}\s.{1,}$/, validationMessages.validate.pubmedName),
});
