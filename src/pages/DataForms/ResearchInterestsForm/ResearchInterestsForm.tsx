/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { schema } from "./ResearchInterestsForm.schema";
import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";
import { Button, FormInput } from "components";
import { ImgPlusCircleOutline } from "assets";

const ResearchInterestsForm = () => {
  // *Form
  const { register, control, watch } = useForm<IResearchInterestsFormFields>({
    resolver: yupResolver(schema),
  });

  const {
    fields: researchInterestFields,
    append: appendResearchInterest,
    remove: removeResearchInterest,
  } = useFieldArray({
    control,
    name: "research_interests",
  });

  useEffect(() => {
    // min of 1 research interest required
    if (researchInterestFields?.length === 0) {
      appendResearchInterest({
        research_interest: "",
      });
    }
  }, [researchInterestFields]);

  // *JSX
  return (
    <div className="flex flex-col">
      <p className="mb-6">
        Please keep your research interests succinct (e.g. Immune therapy for
        leukemia)
      </p>

      {researchInterestFields.map((field, i) => {
        return (
          <div className="flex items-end mb-4 space-x-4" key={field.id}>
            <FormInput
              label={`Research Interest (${i + 1})`}
              key={field.id}
              register={register}
              id={`research_interests[${i}].research_interest`}
              name={`research_interests[${i}].research_interest`}
              autoComplete="off"
              required
            />
            <button
              onClick={() => removeResearchInterest(i)}
              disabled={i < 1}
              className="mb-3 text-sm font-semibold rounded-lg text-primary-500 hover:text-primary-200 disabled:cursor-not-allowed disabled:text-disabled"
            >
              REMOVE
            </button>
          </div>
        );
      })}

      <div
        onClick={() =>
          appendResearchInterest({
            research_interest: "",
          })
        }
        className="flex items-center mt-2 cursor-pointer"
      >
        <ImgPlusCircleOutline
          width={30}
          height={30}
          className=" stroke-green-500"
        />
        <p className="ml-1 text-sm">Add more</p>
      </div>
    </div>
  );
};

export default ResearchInterestsForm;
