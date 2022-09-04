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
import { cleanUpData, subSpecialties } from "./BasicInfoForm.util";

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

    const primarySubspecialty = watch("primarySubspecialty");
    const secondarySubspecialty = watch("secondarySubspecialty");

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
      const cleanData = cleanUpData(data);
      console.log(cleanData);
      if (onSuccessCallback) onSuccessCallback();
    };

    // *Effects
    useEffect(() => {
      if (!fetchMetadataDesignationsData || !fetchDepartmentByIdData) return;

      if (fetchMeData) {
        const data = fetchMeData.data?.data;
        setValue("designation", data.designation || undefined);
        setValue("department", data.department || undefined);
        setValue("name", data.name);
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
              id="mcrNo"
              name="mcrNo"
              required={getYupIsRequired(schema, "mcrNo")}
              error={formErrors?.mcrNo?.message}
            />
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <div className="w-full space-y-4">
              <FormSelect
                label="Primary Subspecialty"
                control={control}
                options={subSpecialties}
                id="primarySubspecialty"
                name="primarySubspecialty"
                required={getYupIsRequired(schema, "primarySubspecialty")}
                error={formErrors?.primarySubspecialty?.message}
              />

              {primarySubspecialty?.name === "Others" && (
                <FormInput
                  label="Primary Subspecialty (Others)"
                  register={register}
                  id="primarySubspecialtyOthers"
                  name="primarySubspecialtyOthers"
                  required={getYupIsRequired(
                    schema,
                    "primarySubspecialtyOthers"
                  )}
                  error={formErrors?.primarySubspecialtyOthers?.message}
                />
              )}
            </div>

            <div className="w-full space-y-4">
              <FormSelect
                label="Secondary Subspecialty"
                control={control}
                options={subSpecialties}
                id="secondarySubspecialty"
                name="secondarySubspecialty"
                required={getYupIsRequired(schema, "secondarySubspecialty")}
                error={formErrors?.secondarySubspecialty?.message}
              />
              {secondarySubspecialty?.name === "Others" && (
                <FormInput
                  label="Secondary Subspecialty (Others)"
                  register={register}
                  id="secondarySubspecialtyOthers"
                  name="secondarySubspecialtyOthers"
                  required={getYupIsRequired(
                    schema,
                    "secondarySubspecialtyOthers"
                  )}
                  error={formErrors?.secondarySubspecialtyOthers?.message}
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
