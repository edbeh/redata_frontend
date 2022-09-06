import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";

export const subSpecialties = [
  { name: "Kidney Transplant", id: "kidney_transplant" },
  {
    name: "Immunosuppression Post-transplant",
    id: "immunosuppression_post_transplant",
  },
  { name: "Others", id: "others" },
];

export const cleanUpData = (data: IBasicInfoFormFields) => {
  console.log("data", data);

  return {
    designationId: data.designation.id,
    name: data.name,
    departmentId: data.department.id,
    mcrNo: data.mcrNo,
    primarySpecialty: data.primarySubspecialty.id,
    primarySpecialtyOthers: data.primarySubspecialtyOthers,
    otherSpecialties: data.otherSubspecialties,
    bio: data.bio,
  };
};

type ValidationStatus = {
  hasErrors: boolean;
};

export const validateDuplicateValues = (
  data: IBasicInfoFormFields,
  setError: UseFormSetError<IBasicInfoFormFields>
): ValidationStatus => {
  const hash: { [key: string]: number[] } = {};

  data.otherSubspecialties.map((item, i) => {
    // if (!hash[item.otherSubspecialty]) {
    //   return (hash[item.researchInterest] = [i]);
    // } else {
    //   return (hash[item.researchInterest] = [
    //     ...hash[item.researchInterest],
    //     i,
    //   ]);
    // }
  });

  const status = {
    hasErrors: false,
  };

  for (const key in hash) {
    if (hash[key].length > 1) {
      hash[key].map((index) => {
        status.hasErrors = true;
        return setError(`otherSubspecialties.${index}.otherSubspecialty`, {
          message: validationMessages.validate.duplicateResearchInterest,
        });
      });
    }
  }

  return status;
};
