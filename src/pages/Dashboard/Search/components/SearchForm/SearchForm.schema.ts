import * as yup from "yup";

import { validationMessages } from "const";

export const schema = yup.object({
  q: yup.string().required(validationMessages.require.generic),
  searchIn: yup.string().required(validationMessages.require.generic),
});
