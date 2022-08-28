import { FormSelectModel } from "models";

export interface IBasicInfoFormFields {
  designation: string;
  name: string;
  email: string;
  department: FormSelectModel;
  primary_subspecialty: FormSelectModel;
  primary_subspecialty_others: string;
  secondary_subspecialty: FormSelectModel;
  secondary_subspecialty_others: string;
  mcr_no: string;
  bio: string;
}
