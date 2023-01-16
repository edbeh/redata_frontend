import { validationMessages } from "const";
import * as yup from "yup";

export const researchInterestSchema = {
  researchInterest: yup.object().required(validationMessages.require.generic),
  researchInterestOthers: yup.string().when("researchInterest", {
    is: (value: any) => {
      return value?.id === "others";
    },
    then: yup.string().required(validationMessages.require.generic),
    otherwise: yup.string(),
  }),
};

export const schema = yup.object().shape({
  researchInterests: yup.array().of(yup.object().shape(researchInterestSchema)),
});
