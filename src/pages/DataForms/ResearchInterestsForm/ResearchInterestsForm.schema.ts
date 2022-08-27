import * as yup from "yup";

export const schema = yup.object({
  research_interest: yup.string().required("This field is required").max(10),
});
