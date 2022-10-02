/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { FormInput, FormSelect } from "components";
import { useMe } from "hooks";
import { FormSelectModel } from "models";
import { selectOthersField } from "const";
import { ImgPlusCircleOutline, ImgXMarkOutline } from "assets";
import {
  useFetchMe,
  useUpdateMe,
  useFetchMetadataPatientPools,
} from "api/hooks";
import { ME_API_KEY } from "api/keys";

import { schema } from "./PatientPopulationsForm.schema";
import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";
import {
  cleanUpData,
  validateDuplicateValues,
} from "./PatientPopulationsForm.util";
import { IsSubmissionLoadingType } from "../../Dashboard/Home/components/EditHome/EditHome.model";

interface PatientPopulationsFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;

  /** display loading state parent component */
  setIsSubmissionLoading?: React.Dispatch<React.SetStateAction<any>>;

  /** determine if we should focus on newly added fields based on whether it's onboarding */
  isOnboarding?: boolean;
}

const PatientPopulationsForm = React.forwardRef<
  HTMLButtonElement,
  PatientPopulationsFormProps
>(
  (
    { onSuccessCallback, setIsSubmissionLoading, isOnboarding = false },
    ref
  ) => {
    const { departmentId } = useMe();
    const isInitialRender = useRef(true);
    const [patientPopulationOptions, setPatientPopulationOptions] = useState<
      FormSelectModel[]
    >([]);

    // *Form
    const {
      register,
      control,
      formState: { errors: formErrors },
      setError,
      watch,
      handleSubmit,
    } = useForm<IPatientPopulationsFormFields>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    const {
      fields: patientPopulationFields,
      append: appendPatientPopulation,
      remove: removePatientPopulation,
    } = useFieldArray({
      control,
      name: "patientPopulations",
    });

    // *Methods
    const handleSubmitForm = async (data: IPatientPopulationsFormFields) => {
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

    const fetchMetadataPatientPools = useFetchMetadataPatientPools(
      departmentId as string,
      !!departmentId
    );

    const updateMe = useUpdateMe(handleMutationSuccess);

    // *Effects
    useEffect(() => {
      if (fetchMetadataPatientPools?.data?.data?.data) {
        const apiData = fetchMetadataPatientPools?.data?.data?.data;
        setPatientPopulationOptions([
          ...apiData,
          { id: "others", name: "Others" },
        ]);
      }
    }, [fetchMetadataPatientPools.data]);

    useEffect(() => {
      if (!fetchMetadataPatientPools?.data || !fetchMe?.data) return;

      // Pre-populate form fields
      const data = fetchMe?.data?.data?.data;

      if (isInitialRender.current) {
        data.patientPools?.map((pool) => {
          if (pool.variant === "preset") {
            const option = fetchMetadataPatientPools.data.data.data.find(
              (item) => item.id === pool.id
            );
            return appendPatientPopulation(
              {
                patientPopulation: option,
                patientPopulationOthers: undefined,
              },
              {
                shouldFocus: isOnboarding,
              }
            );
          } else {
            return appendPatientPopulation(
              {
                patientPopulation: selectOthersField,
                patientPopulationOthers: pool.name,
              },
              {
                shouldFocus: isOnboarding,
              }
            );
          }
        });

        isInitialRender.current = false;
      }
    }, [fetchMetadataPatientPools, fetchMe]);

    useEffect(() => {
      if (setIsSubmissionLoading) {
        if (isOnboarding) return setIsSubmissionLoading(updateMe?.isLoading);

        return setIsSubmissionLoading(
          (currentState: IsSubmissionLoadingType) => {
            return { ...currentState, patientPopulations: updateMe?.isLoading };
          }
        );
      }
    }, [updateMe.isLoading]);

    // *JSX
    return (
      <div className="flex flex-col">
        <p className="mb-6 -mt-3">
          A patient population refers to a patient group that you are currently
          seeing in your clinic (e.g. Leukemia)
        </p>

        <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
          {patientPopulationFields.map((field, i) => {
            return (
              <div
                className={`flex flex-col w-full mb-4 space-y-4 
                            sm:space-y-0 sm:space-x-6 sm:flex-row
                            items-start`}
                key={field.id}
              >
                <FormSelect
                  label={`Patient Population ${i + 1}`}
                  control={control}
                  options={patientPopulationOptions}
                  isLoading={fetchMetadataPatientPools?.isLoading}
                  id={`patientPopulations.${i}.patientPopulation`}
                  name={`patientPopulations.${i}.patientPopulation`}
                  required
                  autoComplete="off"
                  error={
                    formErrors?.patientPopulations &&
                    formErrors?.patientPopulations[i]?.patientPopulation
                      ?.message
                  }
                />

                {watch(`patientPopulations.${i}.patientPopulation`)?.id ===
                  "others" && (
                  <FormInput
                    label="Enter Patient Population"
                    register={register}
                    id={`patientPopulations.${i}.patientPopulationOthers`}
                    name={`patientPopulations.${i}.patientPopulationOthers`}
                    autoComplete="off"
                    error={
                      formErrors?.patientPopulations &&
                      formErrors?.patientPopulations[i]?.patientPopulationOthers
                        ?.message
                    }
                  />
                )}

                <button
                  onClick={() => removePatientPopulation(i)}
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
              appendPatientPopulation(
                {
                  patientPopulation: undefined,
                  patientPopulationOthers: undefined,
                },
                {
                  shouldFocus: isOnboarding,
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

export default PatientPopulationsForm;
