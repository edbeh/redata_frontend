import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  getYupIsRequired,
  isApiError,
  handleApiErrorsForm,
  setJwtTokenLocalStorage,
} from "utils";
import { FormInput, Button } from "components";
import { useSubmitSession } from "hooks";

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
  const {
    data: submitSessionData,
    mutate: mutateSession,
    isLoading: submitSessionIsLoading,
    error: submitSessionError,
  } = useSubmitSession();

  // *Methods
  const handleSubmitForm = (data: ILoginFormFields) => {
    mutateSession(data);
  };

  // *Effects
  useEffect(() => {
    if (submitSessionData?.status === 200) {
      const jwt = submitSessionData.data.jwt;
      setJwtTokenLocalStorage(jwt);
      navigate("/onboarding/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSessionData]);

  useEffect(() => {
    if (isApiError(submitSessionError)) {
      handleApiErrorsForm(submitSessionError, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSessionError]);

  // *JSX
  return (
    <div className="flex items-center justify-center flex-1">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full p-[12%] md:p-[18%]"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-blue-900">LOGIN</h1>

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
          <Button isLoading={submitSessionIsLoading}>Login</Button>
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
