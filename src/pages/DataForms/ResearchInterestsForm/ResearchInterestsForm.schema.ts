import { validationMessages } from "const";
import * as yup from "yup";

export const formSchema = {
  researchInterest: yup
    .string()
    .required(validationMessages.require.generic)
    .max(50, validationMessages.validate.max50),
};

export const schema = yup.object().shape({
  researchInterests: yup.array().of(
    yup.object().shape(formSchema)
    // .test(
    //   "duplicate-research-interests",
    //   validationMessages.validate.duplicateSubSpecialty,
    //   function (value) {
    //     const currentInterest = value?.researchInterest;
    //     const filteredInterests = this.parent.filter(
    //       (field: any) => field.researchInterest === currentInterest
    //     );
    //     return filteredInterests?.length <= 1;
    //   }
    // )
  ),
});
