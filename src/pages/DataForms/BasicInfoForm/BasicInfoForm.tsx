/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import {
  FormInput,
  FormSelect,
  FormTextArea,
  FullScreenLoader,
} from "components";
import { ImgPlusCircleOutline, ImgXMarkOutline } from "assets";
import { getYupIsRequired } from "utils";
import {
  useFetchMetadataDesignations,
  useFetchMe,
  useFetchDepartmentById,
  useUpdateMe,
  useFetchPubMedByNames,
} from "api/hooks";
import { ME_API_KEY } from "api/keys";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";
import { schema } from "./BasicInfoForm.schema";
import {
  cleanUpData,
  subSpecialties,
  validateDuplicateValues,
  validatePubMedNames,
} from "./BasicInfoForm.util";
import { IsSubmissionLoadingType } from "../../Dashboard/Profile/components/EditProfile/EditProfile.model";

interface BasicInfoFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;

  /** display loading state in parent component */
  setIsSubmissionLoading?: React.Dispatch<React.SetStateAction<any>>;

  /** determine if we're rendering this form from onboarding */
  isOnboarding?: boolean;
}

const BasicInfoForm = React.forwardRef<HTMLButtonElement, BasicInfoFormProps>(
  // ref for parent component to trigger submit form
  (
    { onSuccessCallback, setIsSubmissionLoading, isOnboarding = false },
    ref
  ) => {
    const [pubMedNamesToSearch, setPubMedNamesToSearch] = useState<string>("");
    const [correctedPubMedNames, setCorrectedPubMedNames] = useState<string[]>(
      []
    );
    const [displayCheckForPubMedNames, setDisplayCheckForPubMedNames] =
      useState<boolean>(false);

    // *Form
    const {
      register,
      control,
      handleSubmit,
      formState: { errors: formErrors },
      watch,
      setValue,
      setError,
    } = useForm<IBasicInfoFormFields>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    const {
      fields: otherSubspecialtyFields,
      append: appendOtherSubspecialty,
      remove: removeOtherSubspecialty,
    } = useFieldArray({
      control,
      name: "otherSubspecialties",
    });

    const primarySubspecialty = watch("primarySubspecialty");

    // *Methods
    const handleSubmitForm = async (data: IBasicInfoFormFields) => {
      if (fetchPubMedByNamesIsLoading || fetchPubMedByNamesIsFetching) return;

      const { hasErrors: hasDuplicateValueErrors } = validateDuplicateValues(
        data,
        setError
      );
      const { hasErrors: hasInvalidPubMedNames } = validatePubMedNames(
        fetchPubMedByNamesData?.invalidPubMedNames || [],
        setError
      );
      if (hasDuplicateValueErrors || hasInvalidPubMedNames) return;

      const cleanData = cleanUpData(data, correctedPubMedNames);
      mutateMe(cleanData);
    };

    const handleMutationSuccess = () => {
      queryClient.invalidateQueries(ME_API_KEY);
      if (onSuccessCallback) onSuccessCallback();
      if (!isOnboarding) toast.success("Update successful!");
    };

    // *Queries
    const queryClient = useQueryClient();

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

    const { mutate: mutateMe, isLoading: updateMeIsLoading } = useUpdateMe(
      handleMutationSuccess
    );

    const {
      data: fetchPubMedByNamesData,
      isLoading: fetchPubMedByNamesIsLoading,
      isFetching: fetchPubMedByNamesIsFetching,
    } = useFetchPubMedByNames(pubMedNamesToSearch, !!pubMedNamesToSearch);

    // *Effects
    useEffect(() => {
      if (!fetchMetadataDesignationsData || !fetchDepartmentByIdData) return;

      if (fetchMeData) {
        const data = fetchMeData.data?.data;
        if (data.designation) setValue("designation", data.designation);
        if (data.department) setValue("department", data.department);
        if (data.name) setValue("name", data.name);
        if (data.pubmedNames) {
          setValue("pubMedNames", data.pubmedNames.join(", "));
          setPubMedNamesToSearch(data.pubmedNames.join(", "));
        }
      }
    }, [fetchMeData, fetchMetadataDesignationsData, fetchDepartmentByIdData]);

    useEffect(() => {
      if (setIsSubmissionLoading) {
        if (isOnboarding) return setIsSubmissionLoading(updateMeIsLoading);

        return setIsSubmissionLoading(
          (currentState: IsSubmissionLoadingType) => {
            return { ...currentState, basicInfo: updateMeIsLoading };
          }
        );
      }
    }, [updateMeIsLoading]);

    useEffect(() => {
      setDisplayCheckForPubMedNames(false);
    }, [pubMedNamesToSearch]);

    useEffect(() => {
      if (
        fetchPubMedByNamesData &&
        fetchPubMedByNamesData.invalidPubMedNames?.length > 0
      ) {
        setDisplayCheckForPubMedNames(false);
        validatePubMedNames(
          fetchPubMedByNamesData.invalidPubMedNames,
          setError
        );
        return;
      }

      if (
        fetchPubMedByNamesData &&
        fetchPubMedByNamesData?.namesToBold?.length > 0
      ) {
        setCorrectedPubMedNames(fetchPubMedByNamesData.namesToBold);
        return setDisplayCheckForPubMedNames(true);
      }
    }, [fetchPubMedByNamesData]);

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
              autoComplete="off"
              error={formErrors?.designation?.message}
            />

            <FormInput
              label="Name"
              register={register}
              id="name"
              name="name"
              required={getYupIsRequired(schema, "name")}
              autoComplete="off"
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
              autoComplete="off"
              error={formErrors?.department?.message}
            />

            <FormInput
              label="PubMed Names"
              register={register}
              id="pubMedNames"
              name="pubMedNames"
              required={getYupIsRequired(schema, "pubMedNames")}
              helper="Please separate your PubMed names with comma"
              autoComplete="off"
              rightCheck={displayCheckForPubMedNames}
              error={formErrors?.pubMedNames?.message}
              isLoading={
                fetchPubMedByNamesIsLoading || fetchPubMedByNamesIsFetching
              }
              onBlur={(e) => {
                setPubMedNamesToSearch(e.currentTarget.value);
              }}
            />
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormInput
              label="MCR Number"
              register={register}
              id="mcrNo"
              name="mcrNo"
              required={getYupIsRequired(schema, "mcrNo")}
              autoComplete="off"
              error={formErrors?.mcrNo?.message}
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
              autoComplete="off"
              error={formErrors?.bio?.message}
            />
          </div>

          <h2 className="mt-8 mb-4 text-xl font-semibold">Sub-specialties</h2>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormSelect
              label="Primary Subspecialty"
              control={control}
              options={subSpecialties}
              id="primarySubspecialty"
              name="primarySubspecialty"
              required={getYupIsRequired(schema, "primarySubspecialty")}
              autoComplete="off"
              error={formErrors?.primarySubspecialty?.message}
            />

            {primarySubspecialty?.name === "Others" && (
              <FormInput
                label="Primary Subspecialty (Others)"
                register={register}
                id="primarySubspecialtyOthers"
                name="primarySubspecialtyOthers"
                required={getYupIsRequired(schema, "primarySubspecialtyOthers")}
                autoComplete="off"
                error={formErrors?.primarySubspecialtyOthers?.message}
              />
            )}
          </div>

          {otherSubspecialtyFields.map((subspecialty, i) => {
            return (
              <div
                className={`flex flex-col w-full mb-4 space-y-4 
                            sm:space-y-0 sm:space-x-6 sm:flex-row
                            items-start`}
                key={subspecialty.id}
              >
                <FormSelect
                  label={`Other Subspecialty ${i + 1}`}
                  control={control}
                  options={subSpecialties}
                  id={`otherSubspecialties.${i}.otherSubspecialty`}
                  name={`otherSubspecialties.${i}.otherSubspecialty`}
                  required
                  autoComplete="off"
                  error={
                    formErrors?.otherSubspecialties &&
                    formErrors?.otherSubspecialties[i]?.otherSubspecialty
                      ?.message
                  }
                />

                {watch(`otherSubspecialties.${i}.otherSubspecialty`)?.id ===
                  "others" && (
                  <FormInput
                    label={`Other Subspecialty ${i + 1} (Others)`}
                    register={register}
                    id={`otherSubspecialties.${i}.otherSubspecialtyOthers`}
                    name={`otherSubspecialties.${i}.otherSubspecialtyOthers`}
                    autoComplete="off"
                    error={
                      formErrors?.otherSubspecialties &&
                      formErrors?.otherSubspecialties[i]
                        ?.otherSubspecialtyOthers?.message
                    }
                  />
                )}

                <button
                  onClick={() => removeOtherSubspecialty(i)}
                  className="!mt-8"
                >
                  <ImgXMarkOutline
                    width={20}
                    height={20}
                    className="stroke-[3px] text-red-500"
                  />
                </button>
              </div>
            );
          })}

          <div
            onClick={() =>
              appendOtherSubspecialty({
                otherSubspecialty: undefined,
                otherSubspecialtyOthers: undefined,
              })
            }
            className="flex items-center my-4 cursor-pointer"
          >
            <ImgPlusCircleOutline
              width={30}
              height={30}
              className="stroke-green-500"
            />
            <p className="ml-1">Add more subspecialties</p>
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
