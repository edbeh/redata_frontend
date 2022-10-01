import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";

export const cleanUpData = (data: IResearchInterestsFormFields) => {
  const researchInterests = data.researchInterests?.map((item) => ({
    id:
      item.researchInterest?.id === "others"
        ? null
        : (item.researchInterest?.id as string),
    name:
      item.researchInterest?.id === "others"
        ? (item.researchInterestOthers as string)
        : null,
  }));

  return {
    researchInterests,
  };
};

type ValidationStatus = {
  hasErrors: boolean;
};

export const validateDuplicateValues = (
  data: IResearchInterestsFormFields,
  setError: UseFormSetError<IResearchInterestsFormFields>
): ValidationStatus => {
  const hash: { [key: string]: string[] } = {};

  data.researchInterests.map((item, i) => {
    if (item.researchInterest?.name && item.researchInterest.id !== "others") {
      const lowercase = item.researchInterest.name.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`researchInterests.${i}.researchInterest`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `researchInterests.${i}.researchInterest`,
        ];
      }
    }

    if (item.researchInterestOthers) {
      const lowercase = item.researchInterestOthers.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`researchInterests.${i}.researchInterestOthers`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `researchInterests.${i}.researchInterestOthers`,
        ];
      }
    }

    return null;
  });

  const status = {
    hasErrors: false,
  };

  for (const key in hash) {
    if (hash[key].length > 1) {
      hash[key].map((field: any) => {
        status.hasErrors = true;
        return setError(field, {
          message: validationMessages.validate.duplicateResearchInterest,
        });
      });
    }
  }

  return status;
};
