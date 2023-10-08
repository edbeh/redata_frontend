import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import {
  getYupIsRequired,
  setAdminDeptLocalStorage,
  setAdminNameLocalStorage,
  setJwtTokenLocalStorage,
} from "utils";
import { FormInput, Button } from "components";
import { isApiError, handleApiErrorsForm } from "api/utils";
import { useSubmitAdminSession } from "api/hooks";
import { imgAppLogo } from "assets";

import { schema } from "./AdminLoginForm.schema";
import { IAdminLoginFormFields } from "./AdminLoginForm.model";

const LoginForm = () => {
  const navigate = useNavigate();

  // *Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<IAdminLoginFormFields>({
    resolver: yupResolver(schema),
  });

  // *Queries
  const submitAdminSession = useSubmitAdminSession();

  // *Methods
  const handleSubmitForm = (data: IAdminLoginFormFields) => {
    submitAdminSession.mutate(data);
  };

  // *Effects
  useEffect(() => {
    if (submitAdminSession?.data?.status === 200) {
      const jwt = submitAdminSession?.data?.data?.jwt;
      const adminName = submitAdminSession?.data?.data?.data?.name;
      const adminDept =
        submitAdminSession?.data?.data?.data?.userDepartments[0]?.department;

      setJwtTokenLocalStorage(jwt);
      setAdminNameLocalStorage(adminName);
      setAdminDeptLocalStorage(adminDept);
      navigate("/users");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitAdminSession.data]);

  useEffect(() => {
    if (isApiError(submitAdminSession?.error)) {
      handleApiErrorsForm(submitAdminSession?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitAdminSession.error]);

  // *JSX
  return (
    <>
      <div
        className="fixed flex items-center top-6 left-12 cursor-pointer"
        onClick={() => {
          const url = window.location.href
            .replace("app.", "")
            .replace("/login", "");
          return (window.location.href = url);
        }}
      >
        <img
          className="h-10 w-auto sm:h-12 hover:rotate-[360deg] transition-all duration-1000"
          src={imgAppLogo}
          alt="app_logo"
        />
        <span className="ml-2 text-xl lg:text-2xl font-semibold">ReData</span>
      </div>
      <div className="flex items-center justify-center flex-1">
        <form
          noValidate
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full p-[12%] md:p-[18%]"
        >
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold text-blue-900">ADMIN LOGIN</h1>

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
              isLoading={submitAdminSession?.isLoading}
              loadingText="Logging In..."
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
