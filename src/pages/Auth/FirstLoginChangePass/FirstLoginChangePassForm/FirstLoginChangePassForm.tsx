import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { getYupIsRequired, setJwtTokenLocalStorage } from "utils";
import { FormInput, Button } from "components";
import { isApiError, handleApiErrorsForm } from "api/utils";
import {
  useFetchMe,
  useSubmitSession,
  useSubmitUserActivation,
} from "api/hooks";
import { imgAppLogo } from "assets";
import { PostUserActivation } from "api/models";

import { schema } from "./FirstLoginChangePassForm.schema";
import { IFirstLoginChangePassFormFields } from "./FirstLoginChangePassForm.model";

const FirstLoginChangePassForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [shouldFetchMe, setShouldFetchMe] = useState<boolean>(false);

  // *Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    setError,
  } = useForm<IFirstLoginChangePassFormFields>({
    resolver: yupResolver(schema),
  });

  // *Queries
  const submitSession = useSubmitSession();
  const submitUserActivation = useSubmitUserActivation();
  const fetchMe = useFetchMe(shouldFetchMe);

  // *Methods
  const handleSubmitForm = (data: IFirstLoginChangePassFormFields) => {
    const payload: PostUserActivation.PayLoad = {
      token: token as string,
      name: data.name,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    };
    submitUserActivation.mutate(payload);
    // submitSession.mutate(data);
  };

  // *Effects
  useEffect(() => {
    if (token) {
      setJwtTokenLocalStorage(token);
      setShouldFetchMe(true);
    }
  }, [token]);

  useEffect(() => {
    if (fetchMe?.data?.data?.data) {
      const { email, name } = fetchMe.data.data.data;
      setValue("email", email);
      setValue("name", name || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMe]);

  useEffect(() => {
    if (submitUserActivation?.status === "success") {
      navigate("/onboarding/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitUserActivation]);

  useEffect(() => {
    if (isApiError(submitUserActivation?.error)) {
      handleApiErrorsForm(submitUserActivation?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitUserActivation.error]);

  useEffect(() => {
    if (isApiError(submitSession?.error)) {
      handleApiErrorsForm(submitSession?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.error]);

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
            <h1 className="text-4xl font-bold text-blue-900">
              UPDATE PASSWORD
            </h1>
            <p>
              As this is your first login, please update the password for your
              account.
            </p>

            <FormInput
              register={register}
              id="email"
              name="email"
              type="email"
              label="Email"
              required={getYupIsRequired(schema, "email")}
              readOnly
              disabled
            />

            <FormInput
              register={register}
              id="name"
              name="name"
              type="name"
              label="Name"
              autoComplete="off"
              error={formErrors?.name?.message as string}
              required={getYupIsRequired(schema, "name")}
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
              label="Confirm password"
              error={formErrors?.passwordConfirmation?.message as string}
              required={getYupIsRequired(schema, "passwordConfirmation")}
            />
          </div>

          <div className="mt-[30px]">
            <Button
              isLoading={submitUserActivation?.isLoading}
              loadingText="Logging In..."
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FirstLoginChangePassForm;
