import * as yup from "yup";

export const schema = yup.object({
  designation: yup.string().required("Designation is required"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  department: yup.string().required("Department is required"),
  primary_subspecialty: yup
    .string()
    .required("Primary subspecialty is required"),
  secondary_subspecialty: yup.string(),
  mcr_no: yup.string(),
  bio: yup.string(),
});
