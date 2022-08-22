import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { FormInput, Button } from "components";

const schema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex items-center justify-center flex-1">
      <form className="w-full p-[18%]">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-blue-900">LOGIN</h1>

          <FormInput
            register={register}
            id="email"
            name="email"
            type="email"
            label="Email"
            error={formErrors?.email?.message as string}
          />
          <FormInput
            register={register}
            id="password"
            name="password"
            type="password"
            label="Password"
            error={formErrors?.password?.message as string}
          />
        </div>

        <div className="mt-[30px]">
          <Button>Login</Button>
          <p className="mt-3 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Create one here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
