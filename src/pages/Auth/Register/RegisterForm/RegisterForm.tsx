import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { FormInput, Button } from "components";
import { getYupIsRequired, isApiError, handleApiErrorsForm } from "utils";
import { useSubmitUser } from "hooks/apis/useUsersQuery";

import { schema } from "./RegisterForm.schema";
import { IRegisterFormFields } from "./RegisterForm.model";
import { useEffect } from "react";

const RegisterForm = () => {
  const {
    register,
    formState: { errors: formErrors },
    setError,
    handleSubmit,
  } = useForm<IRegisterFormFields>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // *Queries
  const {
    mutate: mutateUser,
    isLoading: submitUserIsLoading,
    isError: submitUserIsError,
    error: submitUserError,
  } = useSubmitUser();

  // *Methods
  const handleSubmitForm = (data: IRegisterFormFields) => {
    mutateUser(data);
  };

  useEffect(() => {
    if (submitUserIsError && isApiError(submitUserError)) {
      handleApiErrorsForm(submitUserError, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitUserError, submitUserIsError]);

  // *JSX
  return (
    <div className="flex items-center justify-center flex-1">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="w-full p-[12%] md:p-[18%]"
      >
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
          <Button isLoading={submitUserIsLoading}>Register</Button>
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
