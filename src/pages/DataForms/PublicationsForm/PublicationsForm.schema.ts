import { validationMessages } from "const";
import * as yup from "yup";

export const pubMedNamesSchema = yup.object().shape({
  pubMed_names: yup.string().required(),
});
