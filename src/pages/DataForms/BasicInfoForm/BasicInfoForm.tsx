/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  FormInput,
  FormSelect,
  FormTextArea,
  FullScreenLoader,
} from "components";
import { ImgPlusCircleOutline, ImgXMarkOutline, imgNoProfilePic } from "assets";
import { getYupIsRequired, getSearchParams } from "utils";
import { FormSelectModel } from "models";
import { selectOthersField } from "const";
import {
  useFetchMetadataDesignations,
  useFetchMetadataSpecialtiesByDeptId,
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
  validateDuplicateValues,
  validatePubMedNames,
} from "./BasicInfoForm.util";
import { IsSubmissionLoadingType } from "../../Dashboard/Home/components/EditHome/EditHome.model";

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
    const searchParams = getSearchParams() as any;
    const isInitialRender = useRef(true);

    const [profileImage, setProfileImage] = useState<string | undefined>(
      undefined
    );
    const [specialtiesOptions, setSpecialtiesOptions] = useState<
      FormSelectModel[]
    >([]);
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
      setFocus,
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

    const watchPrimarySubspecialty = watch("primarySubspecialty");
    const watchDepartment = watch("department");
    const watchImage = watch("image");

    // *Methods
    const handleSubmitForm = async (data: IBasicInfoFormFields) => {
      if (fetchPubMedByNames?.isLoading || fetchPubMedByNames?.isFetching)
        return;

      const { hasErrors: hasDuplicateValueErrors } = validateDuplicateValues(
        data,
        setError
      );

      console.log("raw", data);
      const { hasErrors: hasInvalidPubMedNames } = validatePubMedNames(
        fetchPubMedByNames?.data?.invalidPubMedNames || [],
        setError
      );
      if (hasDuplicateValueErrors || hasInvalidPubMedNames) return;

      const cleanData = cleanUpData(data, correctedPubMedNames);

      console.log(cleanData);
      console.log(JSON.stringify(cleanData, null, 2));
      // @ts-expect-error
      updateMe.mutate(cleanData);
    };

    const handleMutationSuccess = () => {
      queryClient.invalidateQueries(ME_API_KEY);
      if (onSuccessCallback) onSuccessCallback();
    };

    // *Queries
    const queryClient = useQueryClient();

    const fetchMe = useFetchMe();

    const institutionId = fetchMe?.data?.data?.data?.institution?.id as string;
    const fetchDepartmentById = useFetchDepartmentById(
      institutionId,
      !!institutionId
    );

    const fetchMetaDataDesignations = useFetchMetadataDesignations();
    const fetchMetaDataSpecialtiesByDeptId =
      useFetchMetadataSpecialtiesByDeptId(
        watchDepartment?.id as string,
        !!watchDepartment?.id
      );
    const fetchPubMedByNames = useFetchPubMedByNames(
      pubMedNamesToSearch,
      !!pubMedNamesToSearch
    );

    const updateMe = useUpdateMe(handleMutationSuccess);

    // *Effects
    useEffect(() => {
      if (searchParams?.focus) {
        if (searchParams.focus === "") return;
        setFocus(searchParams.focus);
      }
    }, [searchParams]);

    useEffect(() => {
      if (fetchMetaDataSpecialtiesByDeptId?.data?.data?.data) {
        const apiData = fetchMetaDataSpecialtiesByDeptId?.data?.data?.data;
        setSpecialtiesOptions([...apiData, { id: "others", name: "Others" }]);
      }
    }, [fetchMetaDataSpecialtiesByDeptId.data]);

    useEffect(() => {
      if (fetchMe?.data) {
        const data = fetchMe?.data?.data?.data;
        if (isInitialRender.current && data.department) {
          setValue("department", data.department);
        }
      }
    }, [fetchMe.data]);

    useEffect(() => {
      if (
        !fetchMe?.data ||
        !fetchMetaDataDesignations?.data ||
        !fetchMetaDataSpecialtiesByDeptId?.data ||
        !fetchDepartmentById?.data
      )
        return;

      // pre-populate form fields
      if (fetchMe?.data) {
        const data = fetchMe?.data?.data?.data;

        if (isInitialRender.current) {
          if (data.image) setProfileImage(data.image);
          if (data.designation) setValue("designation", data.designation);
          if (data.name) setValue("name", data.name);
          if (data.bio) setValue("bio", data.bio);
          if (data.pubmedNames) {
            setValue("pubMedNames", data.pubmedNames.join(", "));
            setPubMedNamesToSearch(data.pubmedNames.join(", "));
          }

          if (data.primarySpecialty?.variant === "preset") {
            const option =
              fetchMetaDataSpecialtiesByDeptId?.data?.data.data.find(
                (item) => item.id === data.primarySpecialty?.id
              );
            setValue("primarySubspecialty", option as FormSelectModel);
          } else {
            setValue("primarySubspecialty", selectOthersField);
            setValue("primarySubspecialtyOthers", data.primarySpecialty?.name);
          }

          data.otherSpecialties?.map((specialty) => {
            if (specialty.variant === "preset") {
              const option =
                fetchMetaDataSpecialtiesByDeptId?.data?.data.data.find(
                  (item) => item.id === specialty.id
                );
              return appendOtherSubspecialty(
                {
                  otherSubspecialty: option,
                  otherSubspecialtyOthers: undefined,
                },
                {
                  shouldFocus: false,
                }
              );
            } else {
              return appendOtherSubspecialty(
                {
                  otherSubspecialty: selectOthersField,
                  otherSubspecialtyOthers: specialty.name,
                },
                {
                  shouldFocus: false,
                }
              );
            }
          });

          isInitialRender.current = false;
        }
      }
    }, [
      fetchMe.data,
      fetchMetaDataSpecialtiesByDeptId.data,
      fetchMetaDataDesignations.data,
      fetchDepartmentById.data,
    ]);

    useEffect(() => {
      if (setIsSubmissionLoading) {
        if (isOnboarding) return setIsSubmissionLoading(updateMe?.isLoading);

        return setIsSubmissionLoading(
          (currentState: IsSubmissionLoadingType) => {
            return { ...currentState, basicInfo: updateMe?.isLoading };
          }
        );
      }
    }, [updateMe.isLoading]);

    useEffect(() => {
      setDisplayCheckForPubMedNames(false);
    }, [pubMedNamesToSearch]);

    useEffect(() => {
      if (
        fetchPubMedByNames?.data &&
        fetchPubMedByNames?.data.invalidPubMedNames?.length > 0
      ) {
        setDisplayCheckForPubMedNames(false);
        validatePubMedNames(
          fetchPubMedByNames?.data.invalidPubMedNames,
          setError
        );
        return;
      }

      if (
        fetchPubMedByNames?.data &&
        fetchPubMedByNames?.data?.namesToBold?.length > 0
      ) {
        setCorrectedPubMedNames(fetchPubMedByNames?.data.namesToBold);
        return setDisplayCheckForPubMedNames(true);
      }
    }, [fetchPubMedByNames?.data]);

    useEffect(() => {
      if (watchImage) {
        if (typeof watchImage === "string") {
          return setProfileImage(watchImage);
        }
        const image = Array.from(watchImage)[0] as any;
        if (image) setProfileImage(URL.createObjectURL(image));
      }
    }, [watchImage]);

    // *JSX
    return (
      <div>
        {(fetchMe?.isLoading ||
          fetchDepartmentById?.isLoading ||
          fetchMetaDataDesignations?.isLoading) && <FullScreenLoader />}

        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="flex space-x-4 mb-4">
            <img
              src={profileImage || imgNoProfilePic}
              alt="profile"
              className="object-cover min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] border-2 border-white rounded-full ring-cyan-500 ring-2"
            />

            <div>
              <p>Profile picture</p>

              <button
                type="button"
                className="border-[1px] border-borderGray p-2 rounded-md my-1 cursor-pointer"
                onClick={() => document.getElementById("image")!.click()}
              >
                Choose file
              </button>
              <p className="text-sm">Supported formats: .jpg, .png</p>
            </div>

            {/* hidden input for upload image */}
            <div className="hidden">
              <FormInput
                name="image"
                register={register}
                id="image"
                type="file"
                accept="image/png, image/jpg"
                error={formErrors?.image?.message}
                disabled={fetchMe.isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormSelect
              label="Designation"
              control={control}
              id="designation"
              name="designation"
              options={fetchMetaDataDesignations?.data?.data?.data || []}
              isLoading={fetchMetaDataDesignations?.isLoading}
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
              options={fetchDepartmentById?.data?.data?.data || []}
              isLoading={fetchDepartmentById?.isLoading}
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
                fetchPubMedByNames?.isLoading || fetchPubMedByNames?.isFetching
              }
              onBlur={(e) => {
                setPubMedNamesToSearch(e.currentTarget.value);
              }}
            />
          </div>

          {/* <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
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
          </div> */}

          <div className="flex flex-col w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row">
            <FormTextArea
              label="Bio / Short Introduction"
              register={register}
              rows="10"
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
              options={specialtiesOptions}
              isLoading={fetchMetaDataSpecialtiesByDeptId?.isLoading}
              id="primarySubspecialty"
              name="primarySubspecialty"
              required={getYupIsRequired(schema, "primarySubspecialty")}
              autoComplete="off"
              error={formErrors?.primarySubspecialty?.message}
            />

            {watchPrimarySubspecialty?.name === "Others" && (
              <FormInput
                label="Enter Subspecialty"
                register={register}
                id="primarySubspecialtyOthers"
                name="primarySubspecialtyOthers"
                required={getYupIsRequired(schema, "primarySubspecialtyOthers")}
                autoComplete="off"
                error={formErrors?.primarySubspecialtyOthers?.message}
              />
            )}

            <button
              disabled
              className="sm:!mt-8 self-end sm:self-start cursor-not-allowed"
            >
              <ImgXMarkOutline
                width={20}
                height={20}
                className="stroke-[3px] text-disabled"
              />
            </button>
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
                  options={specialtiesOptions}
                  isLoading={fetchMetaDataSpecialtiesByDeptId?.isLoading}
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
                    label="Enter Subspecialty"
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
                  className="sm:!mt-8 self-end sm:self-start"
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
              appendOtherSubspecialty(
                {
                  otherSubspecialty: undefined,
                  otherSubspecialtyOthers: undefined,
                },
                {
                  shouldFocus: false,
                }
              )
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
