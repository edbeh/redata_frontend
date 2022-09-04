import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";

export const cleanUpData = (data: IResearchInterestsFormFields) => {
  return {
    researchInterests: data.researchInterests,
  };
};

type ValidationStatus = {
  hasErrors: boolean;
};

export const validateDuplicateValues = (
  data: IResearchInterestsFormFields,
  setError: UseFormSetError<IResearchInterestsFormFields>
): ValidationStatus => {
  const hash: { [key: string]: number[] } = {};

  data.researchInterests.map((item, i) => {
    if (!hash[item.researchInterest]) {
      return (hash[item.researchInterest] = [i]);
    } else {
      return (hash[item.researchInterest] = [
        ...hash[item.researchInterest],
        i,
      ]);
    }
  });

  const status = {
    hasErrors: false,
  };

  for (const key in hash) {
    if (hash[key].length > 1) {
      hash[key].map((index) => {
        status.hasErrors = true;
        return setError(`researchInterests.${index}.researchInterest`, {
          message: validationMessages.validate.duplicateResearchInterest,
        });
      });
    }
  }

  return status;
};
