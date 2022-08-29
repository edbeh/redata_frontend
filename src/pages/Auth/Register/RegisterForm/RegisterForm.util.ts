import { PostUser } from "api/models";
import { IRegisterFormFields } from "pages/Auth/Register/RegisterForm/RegisterForm.model";

export const cleanUpData = (data: IRegisterFormFields): PostUser.PayLoad => {
  return {
    name: data.name,
    email: data.email,
    institutionId: data.institution.id,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
  };
};
