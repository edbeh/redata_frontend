import { FormSelectModel } from "models";

type ResearchInterest = {
  researchInterest: FormSelectModel | undefined;
  researchInterestOthers: string | undefined;
};

export interface IResearchInterestsFormFields {
  researchInterests: ResearchInterest[];
}
