import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Confirm password is required"),
});
