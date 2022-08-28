/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput } from "components";
import { ImgPlusCircleOutline } from "assets";

import { schema } from "./PatientPopulationsForm.schema";
import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";

interface PatientPopulationsFormProps {
  onSuccess?: () => void;
}

const PatientPopulationsForm = React.forwardRef<
  HTMLButtonElement,
  PatientPopulationsFormProps
>(({ onSuccess }, ref) => {
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
    console.log(data);
    // if (onSuccess) onSuccess();
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

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {patientPopulationFields.map((field, i) => {
          return (
            <div className="flex items-end mb-4 space-x-4" key={field.id}>
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
                className="mb-3 font-semibold rounded-lg text-primary-500 hover:text-primary-200 disabled:cursor-not-allowed disabled:text-disabled"
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
