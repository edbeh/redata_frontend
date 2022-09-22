/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { FormInput, Button, FormSelect } from "components";
import { getYupIsRequired, setJwtTokenLocalStorage } from "utils";
import { isApiError, handleApiErrorsForm } from "api/utils";
import {
  useSubmitSession,
  useSubmitUser,
  useFetchMetadataInstitutions,
} from "api/hooks";

import { schema } from "./RegisterForm.schema";
import { IRegisterFormFields } from "./RegisterForm.model";
import { cleanUpData } from "./RegisterForm.util";

const RegisterForm = () => {
  const navigate = useNavigate();

  // *Form
  const {
    register,
    control,
    formState: { errors: formErrors },
    setError,
    handleSubmit,
    getValues,
  } = useForm<IRegisterFormFields>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // *Queries
  const fetchMetadataInstitutions = useFetchMetadataInstitutions();
  const submitUser = useSubmitUser();
  const submitSession = useSubmitSession();

  // *Methods
  const handleSubmitForm = (data: IRegisterFormFields) => {
    const cleanData = cleanUpData(data);
    submitUser?.mutate(cleanData);
  };

  // *Effects
  useEffect(() => {
    if (submitUser?.data) {
      const email = getValues("email");
      const password = getValues("password");
      submitSession?.mutate({ email, password });
    }
  }, [submitUser.data]);

  useEffect(() => {
    if (submitSession?.data?.status === 200) {
      const jwt = submitSession?.data?.data?.jwt;
      setJwtTokenLocalStorage(jwt);
      navigate("/onboarding/1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.data]);

  useEffect(() => {
    if (isApiError(submitUser?.error)) {
      handleApiErrorsForm(submitUser?.error, setError);
    }
  }, [submitUser.error]);

  // *JSX
  return (
    <div className="flex items-center justify-center flex-1 overflow-auto">
      <form
        noValidate
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full p-[12%] md:p-[18%]"
      >
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">REGISTER</h1>

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

          <FormSelect
            control={control}
            options={fetchMetadataInstitutions?.data?.data?.data || []}
            placeholder=""
            id="institution"
            name="institution"
            label="Institution"
            error={formErrors?.institution?.message as string}
            required={getYupIsRequired(schema, "institution")}
            isLoading={fetchMetadataInstitutions?.isLoading}
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
          <Button
            isLoading={submitUser?.isLoading || submitSession?.isLoading}
            loadingText="Registering..."
          >
            Register
          </Button>
          <p className="mt-3 text-center">
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
