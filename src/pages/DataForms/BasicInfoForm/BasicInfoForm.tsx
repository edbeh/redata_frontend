import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput, FormSelect, FormTextArea } from "components";
import { getYupIsRequired } from "utils";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";
import { schema } from "./BasicInfoForm.schema";
import {
  designations,
  departments,
  subSpecialties,
} from "./BasicInfoForm.util";
import { getValue } from "@testing-library/user-event/dist/utils";

interface BasicInfoFormProps {
  /** callback if api call is successful */
  onSuccess?: () => void;
}

const BasicInfoForm = React.forwardRef<HTMLButtonElement, BasicInfoFormProps>(
  // ref for parent component to trigger submit form
  ({ onSuccess }, ref) => {
    // *Form
    const {
      register,
      control,
      handleSubmit,
      formState: { errors: formErrors },
      watch,
      trigger,
      setError,
    } = useForm<IBasicInfoFormFields>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    // *Methods
    const handleSubmitForm = async (data: IBasicInfoFormFields) => {
      console.log(data);
      // if (onSuccess) onSuccess();
    };

    // *JSX
    return (
      <div>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormSelect
              label="Designation"
              control={control}
              id="designation"
              name="designation"
              options={designations}
              required={getYupIsRequired(schema, "designation")}
              error={formErrors?.designation?.message}
            />

            <FormInput
              label="Name"
              register={register}
              id="name"
              name="name"
              required={getYupIsRequired(schema, "name")}
              error={formErrors?.name?.message}
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
              error={formErrors?.email?.message}
            />

            <FormSelect
              label="Department"
              control={control}
              id="department"
              name="department"
              options={departments}
              required={getYupIsRequired(schema, "department")}
              error={formErrors?.department?.message}
            />
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <div className="w-full space-y-4">
              <FormSelect
                label="Primary Subspecialty"
                control={control}
                options={subSpecialties}
                id="primary_subspecialty"
                name="primary_subspecialty"
                required={getYupIsRequired(schema, "primary_subspecialty")}
                error={formErrors?.primary_subspecialty?.message}
              />
              {watch("primary_subspecialty")?.value === "others" && (
                <FormInput
                  label="Primary Subspecialty (Others)"
                  register={register}
                  id="primary_subspecialty_others"
                  name="primary_subspecialty_others"
                  required
                  error={formErrors?.primary_subspecialty_others?.message}
                />
              )}
            </div>

            <div className="w-full space-y-4">
              <FormSelect
                label="Secondary Subspecialty"
                control={control}
                options={subSpecialties}
                id="secondary_subspecialty"
                name="secondary_subspecialty"
                required={getYupIsRequired(schema, "secondary_subspecialty")}
                error={formErrors?.secondary_subspecialty?.message}
              />
              {watch("secondary_subspecialty")?.value === "others" && (
                <FormInput
                  label="Secondary Subspecialty (Others)"
                  register={register}
                  id="secondary_subspecialty_others"
                  name="secondary_subspecialty_others"
                  required
                  error={formErrors?.secondary_subspecialty_others?.message}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormInput
              label="MCR Number"
              register={register}
              id="mcr_no"
              name="mcr_no"
              required={getYupIsRequired(schema, "mcr_no")}
              error={formErrors?.mcr_no?.message}
            />

            <div className="hidden w-full md:block" />
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormTextArea
              label="Bio / Short Introduction"
              register={register}
              id="bio"
              name="bio"
              required={getYupIsRequired(schema, "bio")}
              error={formErrors?.bio?.message}
            />
          </div>

          <button type="submit" ref={ref} className="hidden">
            Submit
          </button>
        </form>
      </div>
    );
  }
);

export default BasicInfoForm;
