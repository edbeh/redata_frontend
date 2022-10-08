/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { FormInput, FormSelect } from "components";
import { ImgPlusCircleOutline, ImgXMarkOutline } from "assets";
import { FormSelectModel } from "models";
import { useMe } from "hooks";
import { selectOthersField } from "const";
import { ME_API_KEY } from "api/keys";
import {
  useFetchMe,
  useFetchMetadataResearchInterestsByDeptId,
  useUpdateMe,
} from "api/hooks";

import { schema } from "./ResearchInterestsForm.schema";
import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";
import {
  cleanUpData,
  validateDuplicateValues,
} from "./ResearchInterestsForm.util";
import { IsSubmissionLoadingType } from "../../Dashboard/Home/components/EditHome/EditHome.model";

interface ResearchInterestsFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;

  /** display loading state parent component */
  setIsSubmissionLoading?: React.Dispatch<React.SetStateAction<any>>;

  /** determine if we're rendering this form from onboarding */
  isOnboarding?: boolean;
}

const ResearchInterestsForm = React.forwardRef<
  HTMLButtonElement,
  ResearchInterestsFormProps
>(
  (
    { onSuccessCallback, setIsSubmissionLoading, isOnboarding = false },
    ref
  ) => {
    const { departmentId } = useMe();
    const isInitialRender = useRef(true);
    const [researchInterestsOptions, setResearchInterestsOptions] = useState<
      FormSelectModel[]
    >([]);

    // *Form
    const {
      register,
      control,
      formState: { errors: formErrors },
      setError,
      handleSubmit,
      watch,
    } = useForm<IResearchInterestsFormFields>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    const {
      fields: researchInterestFields,
      append: appendResearchInterest,
      remove: removeResearchInterest,
    } = useFieldArray({
      control,
      name: "researchInterests",
    });

    // *Methods
    const handleSubmitForm = async (data: IResearchInterestsFormFields) => {
      const { hasErrors } = validateDuplicateValues(data, setError);
      if (hasErrors) return;

      const cleanData = cleanUpData(data);

      console.log(cleanData);
      console.log(JSON.stringify(cleanData, null, 2));
      updateMe.mutate(cleanData);
    };

    const handleMutationSuccess = () => {
      queryClient.invalidateQueries(ME_API_KEY);
      if (onSuccessCallback) onSuccessCallback();
      if (!isOnboarding) toast.success("Data updated successfully!");
    };

    // *Queries
    const queryClient = useQueryClient();

    const fetchMe = useFetchMe();

    const fetchMetadataResearchInterestsByDeptId =
      useFetchMetadataResearchInterestsByDeptId(
        departmentId as string,
        !!departmentId
      );

    const updateMe = useUpdateMe(handleMutationSuccess);

    // *Effects
    useEffect(() => {
      if (fetchMetadataResearchInterestsByDeptId?.data?.data?.data) {
        const apiData =
          fetchMetadataResearchInterestsByDeptId?.data?.data?.data;
        setResearchInterestsOptions([
          ...apiData,
          { id: "others", name: "Others" },
        ]);
      }
    }, [fetchMetadataResearchInterestsByDeptId.data]);

    useEffect(() => {
      if (!fetchMetadataResearchInterestsByDeptId?.data || !fetchMe?.data)
        return;

      // Pre-populate form fields
      const data = fetchMe?.data?.data?.data;

      if (isInitialRender.current) {
        if (data.researchInterests?.length === 0) {
          appendResearchInterest(
            {
              researchInterest: undefined,
              researchInterestOthers: undefined,
            },
            {
              shouldFocus: false,
            }
          );
        }

        data.researchInterests?.map((interest) => {
          if (interest.variant === "preset") {
            const option =
              fetchMetadataResearchInterestsByDeptId.data.data.data.find(
                (item) => item.id === interest.id
              );
            return appendResearchInterest(
              {
                researchInterest: option,
                researchInterestOthers: undefined,
              },
              {
                shouldFocus: false,
              }
            );
          } else {
            return appendResearchInterest(
              {
                researchInterest: selectOthersField,
                researchInterestOthers: interest.name,
              },
              {
                shouldFocus: false,
              }
            );
          }
        });

        isInitialRender.current = false;
      }
    }, [fetchMetadataResearchInterestsByDeptId, fetchMe]);

    useEffect(() => {
      if (setIsSubmissionLoading) {
        if (isOnboarding) return setIsSubmissionLoading(updateMe?.isLoading);

        return setIsSubmissionLoading(
          (currentState: IsSubmissionLoadingType) => {
            return { ...currentState, researchInterests: updateMe?.isLoading };
          }
        );
      }
    }, [updateMe.isLoading]);

    // *JSX
    return (
      <div className="flex flex-col">
        <p className="mb-6 -mt-3">
          Please keep your research interests succinct
        </p>

        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          {researchInterestFields.map((field, i) => {
            return (
              <div
                className={`flex flex-col w-full mb-4 space-y-4 
                            sm:space-y-0 sm:space-x-6 sm:flex-row
                            items-start`}
                key={field.id}
              >
                <FormSelect
                  label={`Research Interest ${i + 1}`}
                  control={control}
                  options={researchInterestsOptions}
                  isLoading={fetchMetadataResearchInterestsByDeptId?.isLoading}
                  id={`researchInterests.${i}.researchInterest`}
                  name={`researchInterests.${i}.researchInterest`}
                  required
                  autoComplete="off"
                  error={
                    formErrors?.researchInterests &&
                    formErrors?.researchInterests[i]?.researchInterest?.message
                  }
                />

                {watch(`researchInterests.${i}.researchInterest`)?.id ===
                  "others" && (
                  <FormInput
                    label="Enter Research Interest"
                    register={register}
                    id={`researchInterests.${i}.researchInterestOthers`}
                    name={`researchInterests.${i}.researchInterestOthers`}
                    autoComplete="off"
                    error={
                      formErrors?.researchInterests &&
                      formErrors?.researchInterests[i]?.researchInterestOthers
                        ?.message
                    }
                  />
                )}

                <button
                  onClick={() => {
                    removeResearchInterest(i);
                  }}
                  disabled={i === 0}
                  className="sm:!mt-8 self-end sm:self-start"
                >
                  <ImgXMarkOutline
                    width={20}
                    height={20}
                    className={`stroke-[3px] ${
                      i === 0
                        ? "text-disabled cursor-not-allowed"
                        : "text-red-500"
                    }`}
                  />
                </button>
              </div>
            );
          })}

          <div
            onClick={() =>
              appendResearchInterest(
                {
                  researchInterest: undefined,
                  researchInterestOthers: undefined,
                },
                {
                  shouldFocus: false,
                }
              )
            }
            className="flex items-center mt-2 cursor-pointer"
          >
            <ImgPlusCircleOutline
              width={30}
              height={30}
              className=" stroke-green-500"
            />
            <p className="ml-1">Add more</p>
          </div>

          <button type="submit" ref={ref} className="hidden">
            Submit
          </button>
        </form>
      </div>
    );
  }
);

export default ResearchInterestsForm;
