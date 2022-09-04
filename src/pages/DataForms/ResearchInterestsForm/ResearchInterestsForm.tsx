/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput } from "components";
import { ImgPlusCircleOutline } from "assets";

import { schema } from "./ResearchInterestsForm.schema";
import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";
import {
  cleanUpData,
  validateDuplicateValues,
} from "./ResearchInterestsForm.util";

interface ResearchInterestsFormProps {
  onSuccessCallback?: () => void;
}

const ResearchInterestsForm = React.forwardRef<
  HTMLButtonElement,
  ResearchInterestsFormProps
>(({ onSuccessCallback }, ref) => {
  // *Form
  const {
    register,
    control,
    formState: { errors: formErrors },
    setError,
    clearErrors,
    handleSubmit,
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
    if (researchInterestFields?.length === 0) {
      appendResearchInterest({
        researchInterest: "",
      });
    }
  }, [researchInterestFields]);

  // *JSX
  return (
    <div className="flex flex-col">
      <p className="mb-6 -mt-3">
        Please keep your research interests succinct (e.g. Immune therapy for
        leukemia)
      </p>

      <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
        {researchInterestFields.map((field, i) => {
          return (
            <div
              className={`flex mb-4 space-x-4 ${
                formErrors?.researchInterests &&
                formErrors?.researchInterests[i]?.researchInterest?.message
                  ? "items-center"
                  : "items-end"
              }`}
              key={field.id}
            >
              <FormInput
                label={`Research Interest (${i + 1})`}
                key={field.id}
                register={register}
                id={`researchInterests.${i}.researchInterest`}
                name={`researchInterests.${i}.researchInterest`}
                error={
                  formErrors?.researchInterests &&
                  formErrors?.researchInterests[i]?.researchInterest?.message
                }
                autoComplete="off"
                required
              />
              <button
                onClick={() => removeResearchInterest(i)}
                disabled={i < 1}
                className={`font-semibold rounded-lg text-primary-500 hover:text-primary-200 disabled:cursor-not-allowed disabled:text-disabled ${
                  formErrors?.researchInterests &&
                  formErrors?.researchInterests[i]?.researchInterest?.message
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
            appendResearchInterest({
              researchInterest: "",
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

export default ResearchInterestsForm;
