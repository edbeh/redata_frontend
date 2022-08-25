import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { FormInput, Button } from "components";
import { getYupIsRequired } from "utils";

const schema = yup.object({
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

const RegisterForm = () => {
  const {
    register,
    formState: { errors: formErrors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex items-center justify-center flex-1">
      <form className="w-full p-[12%] md:p-[18%]">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-blue-900">REGISTER</h1>

          <FormInput
            register={register}
            id="name"
            name="name"
            type="text"
            label="Full name"
            error={formErrors?.name?.message as string}
            required={getYupIsRequired(schema, "name")}
          />

          <FormInput
            register={register}
            id="email"
            name="email"
            type="email"
            label="Email"
            error={formErrors?.email?.message as string}
            required={getYupIsRequired(schema, "email")}
          />

          <FormInput
            register={register}
            id="password"
            name="password"
            type="password"
            label="Password"
            error={formErrors?.password?.message as string}
            required={getYupIsRequired(schema, "password")}
          />

          <FormInput
            register={register}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            label="Confirm Password"
            error={formErrors?.passwordConfirmation?.message as string}
            required={getYupIsRequired(schema, "passwordConfirmation")}
          />
        </div>

        <div className="mt-[30px]">
          <Button>Register</Button>
          <p className="mt-3 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
