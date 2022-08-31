import { validationMessages } from "const";
import * as yup from "yup";

export const pubmedNamesSchema = yup.object().shape({
  pubmed_names: yup.string().required(),
});
