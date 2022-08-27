import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput, FormSelect, FormTextArea } from "components";
import { getYupIsRequired } from "utils";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";
import { schema } from "./BasicInfoForm.schema";
import { designations, departments } from "./BasicInfoForm.util";

const BasicInfoForm = () => {
  // *Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<IBasicInfoFormFields>({
    resolver: yupResolver(schema),
  });

  // *JSX
  return (
    <div>
      <form>
        <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
          <FormSelect
            label="Designation"
            control={control}
            id="designation"
            name="designation"
            options={designations}
            required={getYupIsRequired(schema, "designation")}
          />

          <FormInput
            label="Name"
            register={register}
            id="name"
            name="name"
            required={getYupIsRequired(schema, "name")}
          />
        </div>

        <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
          <FormInput
            label="Email"
            register={register}
            id="email"
            type="email"
            name="email"
            required={getYupIsRequired(schema, "email")}
          />

          <FormSelect
            label="Department"
            control={control}
            id="department"
            name="department"
            options={departments}
            required={getYupIsRequired(schema, "department")}
          />
        </div>

        <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
          <FormInput
            label="Primary Subspecialty"
            register={register}
            id="primary_subspecialty"
            name="primary_subspecialty"
            required={getYupIsRequired(schema, "primary_subspecialty")}
          />

          <FormInput
            label="Secondary Subspecialty"
            register={register}
            id="secondary_subspecialty"
            name="secondary_subspecialty"
            required={getYupIsRequired(schema, "secondary_subspecialty")}
          />
        </div>

        <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
          <FormInput
            label="MCR Number"
            register={register}
            id="mcr_no"
            name="mcr_no"
            required={getYupIsRequired(schema, "mcr_no")}
          />

          <div className="w-full" />
        </div>

        <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
          <FormTextArea
            label="Bio / Short Introduction"
            register={register}
            id="bio"
            name="bio"
            required={getYupIsRequired(schema, "bio")}
          />
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;
