import { FormSelectModel } from "models";

export interface IRegisterFormFields {
  name: string;
  email: string;
  institution: FormSelectModel;
  password: string;
  passwordConfirmation: string;
}
