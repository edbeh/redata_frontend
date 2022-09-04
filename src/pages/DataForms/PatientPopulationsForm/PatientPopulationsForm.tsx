/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput } from "components";
import { ImgPlusCircleOutline } from "assets";

import { schema } from "./PatientPopulationsForm.schema";
import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";
import { cleanUpData } from "./PatientPopulationsForm.util";

interface PatientPopulationsFormProps {
  onSuccessCallback?: () => void;
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
    name: "patient_populations",
  });

  // *Methods
  const handleSubmitForm = async (data: IPatientPopulationsFormFields) => {
    const cleanData = cleanUpData(data);
    console.log(cleanData);
    if (onSuccessCallback) onSuccessCallback();
  };

  // *Effects
  useEffect(() => {
    // min of 1 research interest required
    if (patientPopulationFields?.length === 0) {
      appendPatientPopulation({
        patient_population: "",
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
              className={`flex mb-4 space-x-4 ${
                formErrors?.patient_populations &&
                formErrors?.patient_populations[i]?.patient_population?.message
                  ? "items-center"
                  : "items-end"
              }`}
              key={field.id}
            >
              <FormInput
                label={`Patient Population (${i + 1})`}
                key={field.id}
                register={register}
                id={`patient_populations[${i}].patient_population`}
                name={`patient_populations[${i}].patient_population`}
                error={
                  formErrors?.patient_populations &&
                  formErrors?.patient_populations[i]?.patient_population
                    ?.message
                }
                autoComplete="off"
                required
              />
              <button
                onClick={() => removePatientPopulation(i)}
                disabled={i < 1}
                className={`font-semibold rounded-lg text-primary-500 hover:text-primary-200 disabled:cursor-not-allowed disabled:text-disabled ${
                  formErrors?.patient_populations &&
                  formErrors?.patient_populations[i]?.patient_population
                    ?.message
                    ? "mb-1"
                    : "mb-4"
                }`}
              >
                REMOVE
              </button>
            </div>
          );
        })}

        <div
          onClick={() =>
            appendPatientPopulation({
              patient_population: "",
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
