import * as yup from "yup";

export const schema = yup.object().shape({
  patient_populations: yup.array().of(
    yup.object().shape({
      patient_population: yup
        .string()
        .required("This field is required")
        .max(50, "Please keep this field below 50 characters"),
    })
  ),
});
