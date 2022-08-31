/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormInput,
  FormSelect,
  FormTextArea,
  FullScreenLoader,
} from "components";
import { getYupIsRequired } from "utils";
import {
  useFetchMetadataDesignations,
  useFetchMe,
  useFetchDepartmentById,
} from "api/hooks";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";
import { schema } from "./BasicInfoForm.schema";
import { subSpecialties } from "./BasicInfoForm.util";

interface BasicInfoFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;
}

const BasicInfoForm = React.forwardRef<HTMLButtonElement, BasicInfoFormProps>(
  // ref for parent component to trigger submit form
  ({ onSuccessCallback }, ref) => {
    // *Form
    const {
      register,
      control,
      handleSubmit,
      formState: { errors: formErrors, isValid: formIsValid },
      watch,
      getValues,
      setValue,
      setError,
      clearErrors,
    } = useForm<IBasicInfoFormFields>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    const primarySubspecialty = watch("primary_subspecialty");
    const secondarySubspecialty = watch("secondary_subspecialty");

    // *Queries
    const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();
    const institutionId = fetchMeData?.data?.data?.institution?.id as string;

    const {
      data: fetchDepartmentByIdData,
      isLoading: fetchDepartmentByIdDataIsLoading,
    } = useFetchDepartmentById(institutionId, !!institutionId);

    const {
      data: fetchMetadataDesignationsData,
      isLoading: fetchMetadataDesignationsIsLoading,
    } = useFetchMetadataDesignations();

    // *Methods
    const handleSubmitForm = async (data: IBasicInfoFormFields) => {
      if (onSuccessCallback) onSuccessCallback();
    };

    // *Effects
    useEffect(() => {
      if (!fetchMetadataDesignationsData || !fetchDepartmentByIdData) return;

      if (fetchMeData) {
        const data = fetchMeData.data?.data;
        setValue("designation", data.designation);
        setValue("name", data.name);
        setValue("department", data.department);
      }
    }, [fetchMeData, fetchMetadataDesignationsData, fetchDepartmentByIdData]);

    // *JSX
    return (
      <div>
        {(fetchMeIsLoading ||
          fetchDepartmentByIdDataIsLoading ||
          fetchMetadataDesignationsIsLoading) && <FullScreenLoader />}

        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormSelect
              label="Designation"
              control={control}
              id="designation"
              name="designation"
              options={fetchMetadataDesignationsData?.data?.data || []}
              isLoading={fetchMetadataDesignationsIsLoading}
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
            <FormSelect
              label="Department"
              control={control}
              id="department"
              name="department"
              options={fetchDepartmentByIdData?.data?.data || []}
              isLoading={fetchDepartmentByIdDataIsLoading}
              required={getYupIsRequired(schema, "department")}
              error={formErrors?.department?.message}
            />

            <FormInput
              label="MCR Number"
              register={register}
              id="mcr_no"
              name="mcr_no"
              required={getYupIsRequired(schema, "mcr_no")}
              error={formErrors?.mcr_no?.message}
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

              {primarySubspecialty?.name === "Others" && (
                <FormInput
                  label="Primary Subspecialty (Others)"
                  register={register}
                  id="primary_subspecialty_others"
                  name="primary_subspecialty_others"
                  required={getYupIsRequired(
                    schema,
                    "primary_subspecialty_others"
                  )}
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
              {secondarySubspecialty?.name === "Others" && (
                <FormInput
                  label="Secondary Subspecialty (Others)"
                  register={register}
                  id="secondary_subspecialty_others"
                  name="secondary_subspecialty_others"
                  required={getYupIsRequired(
                    schema,
                    "secondary_subspecialty_others"
                  )}
                  error={formErrors?.secondary_subspecialty_others?.message}
                />
              )}
            </div>
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
