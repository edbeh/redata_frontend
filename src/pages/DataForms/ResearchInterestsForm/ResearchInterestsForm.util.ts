import { IResearchInterestsFormFields } from "./ResearchInterestsForm.model";

export const cleanUpData = (data: IResearchInterestsFormFields) => {
  return {
    researchInterests: data.research_interests,
  };
};
