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
  // secondarySubspecialty: FormSelectModel;
  // secondarySubspecialtyOthers: string;
  mcrNo: string;
  bio: string;
}
