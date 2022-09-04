import { FormSelectModel } from "models";

export interface IBasicInfoFormFields {
  designation: FormSelectModel;
  name: string;
  department: FormSelectModel;
  primarySubspecialty: FormSelectModel;
  primarySubspecialtyOthers: string;
  secondarySubspecialty: FormSelectModel;
  secondarySubspecialtyOthers: string;
  mcrNo: string;
  bio: string;
}
