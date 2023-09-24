import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import { getYupIsRequired, setJwtTokenLocalStorage } from "utils";
import { FormInput, Button } from "components";
import { isApiError, handleApiErrorsForm } from "api/utils";
import { useFetchMe, useSubmitSession } from "api/hooks";
import { imgAppLogo } from "assets";

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
    setError,
  } = useForm<IFirstLoginChangePassFormFields>({
    resolver: yupResolver(schema),
  });

  // *Queries
  const submitSession = useSubmitSession();
  const fetchMe = useFetchMe(shouldFetchMe);

  // *Methods
  const handleSubmitForm = (data: IFirstLoginChangePassFormFields) => {
    // submitSession.mutate(data);
  };

  // *Effects
  useEffect(() => {
    if (isApiError(submitSession?.error)) {
      handleApiErrorsForm(submitSession?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.error]);

  useEffect(() => {
    if (fetchMe?.data?.data?.data) {
      const { name, researchInterests, patientPools } = fetchMe.data.data.data;
      if (!name) navigate("/onboarding/1");
      if (researchInterests?.length === 0) navigate("/onboarding/2");
      if (patientPools?.length === 0) navigate("/onboarding/3");
      navigate("/home");
    }
  }, [fetchMe, navigate]);

  console.log("token", token);
  console.log("fetchMe", fetchMe?.data?.data?.data);

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

            {/* <FormInput
              register={register}
              id="email"
              name="email"
              type="email"
              label="Email"
              error={formErrors?.email?.message as string}
              required={getYupIsRequired(schema, "email")}
            /> */}

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
            {/* <p className="mt-3 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 underline">
                Create one here
              </Link>
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default FirstLoginChangePassForm;
