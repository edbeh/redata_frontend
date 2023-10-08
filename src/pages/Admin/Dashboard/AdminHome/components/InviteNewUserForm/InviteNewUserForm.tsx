import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAdminDeptLocalStorage, getYupIsRequired } from "utils";
import { FormInput, Button } from "components";
import { isApiError, handleApiErrorsForm } from "api/utils";
import { useSubmitNewInvitation } from "api/hooks";

import { schema } from "./InviteNewUserForm.schema";
import { IInviteNewUserFormFields } from "./InviteNewUserForm.model";

const InviteNewUserForm = () => {
  // *Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<IInviteNewUserFormFields>({
    resolver: yupResolver(schema),
  });

  // *Queries
  const submitNewInvitation = useSubmitNewInvitation();

  // *Methods
  const handleSubmitForm = (data: IInviteNewUserFormFields) => {
    submitNewInvitation.mutate(data);
  };

  // *Effects
  useEffect(() => {
    if (submitNewInvitation?.data?.data?.success === true) {
      window.location.reload();
    }
  }, [submitNewInvitation.data]);

  useEffect(() => {
    if (isApiError(submitNewInvitation?.error)) {
      handleApiErrorsForm(submitNewInvitation?.error, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitNewInvitation.error]);

  // *JSX
  return (
    <>
      <div className="flex items-center justify-center flex-1">
        <form
          noValidate
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full"
        >
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold mb-6">
              Invite New User ({getAdminDeptLocalStorage()?.name})
            </h1>

            <FormInput
              register={register}
              id="emails"
              name="emails"
              type="emails"
              label="Email"
              error={formErrors?.emails?.message as string}
              required={getYupIsRequired(schema, "emails")}
            />
          </div>

          <div className="mt-[30px]">
            <Button
              isLoading={submitNewInvitation?.isLoading}
              loadingText="Submitting..."
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InviteNewUserForm;
