import { FormSelectModel } from "models";

type OtherSubspecialties = {
  otherSubspecialty: FormSelectModel | undefined;
  otherSubspecialtyOthers: string | undefined;
};

export interface IBasicInfoFormFields {
  designation: FormSelectModel;
  name: string;
  department: FormSelectModel;
  primarySubspecialty: FormSelectModel;
  primarySubspecialtyOthers: string;
  otherSubspecialties: OtherSubspecialties[];
  pubMedNames: string;
  mcrNo: string;
  bio: string;
  image: string;
}
