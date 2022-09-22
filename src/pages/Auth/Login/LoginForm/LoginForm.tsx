import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getYupIsRequired, setJwtTokenLocalStorage } from "utils";
import { FormInput, Button } from "components";
import { isApiError, handleApiErrorsForm } from "api/utils";
import { useSubmitSession } from "api/hooks";

import { schema } from "./LoginForm.schema";
import { ILoginFormFields } from "./LoginForm.model";

const LoginForm = () => {
  const navigate = useNavigate();

  // *Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<ILoginFormFields>({
    resolver: yupResolver(schema),
  });

  // *Queries
  const submitSession = useSubmitSession();

  // *Methods
  const handleSubmitForm = (data: ILoginFormFields) => {
    submitSession.mutate(data);
  };

  // *Effects
  useEffect(() => {
    if (submitSession?.data?.status === 200) {
      const jwt = submitSession?.data?.data?.jwt;
      setJwtTokenLocalStorage(jwt);
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.data]);

  useEffect(() => {
    if (isApiError(submitSession?.error)) {
      handleApiErrorsForm(submitSession?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.error]);

  // *JSX
  return (
    <div className="flex items-center justify-center flex-1">
      <form
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full p-[12%] md:p-[18%]"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">LOGIN</h1>

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
        </div>

        <div className="mt-[30px]">
          <Button
            isLoading={submitSession?.isLoading}
            loadingText="Logging In..."
          >
            Login
          </Button>
          <p className="mt-3 text-center">
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
