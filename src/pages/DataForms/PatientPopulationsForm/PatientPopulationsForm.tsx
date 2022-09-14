/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput } from "components";
import { ImgPlusCircleOutline, ImgXMarkOutline } from "assets";

import { schema } from "./PatientPopulationsForm.schema";
import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";
import {
  cleanUpData,
  validateDuplicateValues,
} from "./PatientPopulationsForm.util";

interface PatientPopulationsFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;

  /** display loading state parent component */
  setIsSubmissionLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientPopulationsForm = React.forwardRef<
  HTMLButtonElement,
  PatientPopulationsFormProps
>(({ onSuccessCallback }, ref) => {
  // *Form
  const {
    register,
    control,
    formState: { errors: formErrors },
    setError,
    clearErrors,
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
    clearErrors();
    const { hasErrors } = validateDuplicateValues(data, setError);
    if (hasErrors) return;

    const cleanData = cleanUpData(data);

    console.log(cleanData);
    if (onSuccessCallback) onSuccessCallback();
  };

  // *Effects
  useEffect(() => {
    // min of 1 research interest required
    if (patientPopulationFields?.length === 0) {
      appendPatientPopulation({
        patientPopulation: "",
      });
    }
  }, [patientPopulationFields]);

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
              className={`flex mb-4 space-x-3 ${
                formErrors?.patientPopulations &&
                formErrors?.patientPopulations[i]?.patientPopulation?.message
                  ? "items-center"
                  : "items-end"
              }`}
              key={field.id}
            >
              <FormInput
                label={`Patient Population ${i + 1}`}
                key={field.id}
                register={register}
                id={`patientPopulations[${i}].patientPopulation`}
                name={`patientPopulations[${i}].patientPopulation`}
                error={
                  formErrors?.patientPopulations &&
                  formErrors?.patientPopulations[i]?.patientPopulation?.message
                }
                autoComplete="off"
                required
              />
              <button
                onClick={() => removePatientPopulation(i)}
                disabled={i < 1}
                className={`disabled:cursor-not-allowed ${
                  formErrors?.patientPopulations &&
                  formErrors?.patientPopulations[i]?.patientPopulation?.message
                    ? "mb-1"
                    : "mb-4"
                }`}
              >
                <ImgXMarkOutline
                  width={20}
                  height={20}
                  className={`stroke-[3px] ${
                    i < 1 ? "text-slate-300" : "text-red-500"
                  }`}
                />
              </button>
            </div>
          );
        })}

        <div
          onClick={() =>
            appendPatientPopulation({
              patientPopulation: "",
            })
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
});

export default PatientPopulationsForm;
