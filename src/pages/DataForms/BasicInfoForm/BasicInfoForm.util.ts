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
  const pubmedNamesArr = data.pubMedNames?.split(",").map((name) => {
    return name.trim();
  });

  return {
    designationId: data.designation.id,
    name: data.name,
    departmentId: data.department.id,
    pubmedNames: pubmedNamesArr,
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

export const validatePubMedNames = (
  data: string[],
  setError: UseFormSetError<IBasicInfoFormFields>
) => {
  const status = { hasErrors: false };
  if (!data || data.length === 0) return status;

  status.hasErrors = true;
  setError("pubMedNames", {
    message: `The following PubMed names are invalid: ${data.join(", ")}`,
  });

  return status;
};

export const validateDuplicateValues = (
  data: IBasicInfoFormFields,
  setError: UseFormSetError<IBasicInfoFormFields>
): ValidationStatus => {
  const hash: { [key: string]: string[] } = {};

  if (
    data.primarySubspecialty?.name &&
    data.primarySubspecialty.id !== "others"
  ) {
    const lowercase = data.primarySubspecialty.name.toLowerCase();
    hash[lowercase] = [`primarySubspecialty`];
  }
  if (data.primarySubspecialtyOthers) {
    const lowercase = data.primarySubspecialtyOthers.toLowerCase();
    hash[lowercase] = [...hash[lowercase], `primarySubspecialtyOthers`];
  }

  data.otherSubspecialties.map((item, i) => {
    if (
      item.otherSubspecialty?.name &&
      item.otherSubspecialty.id !== "others"
    ) {
      const lowercase = item.otherSubspecialty.name.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`otherSubspecialties.${i}.otherSubspecialty`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `otherSubspecialties.${i}.otherSubspecialty`,
        ];
      }
    }

    if (item.otherSubspecialtyOthers) {
      const lowercase = item.otherSubspecialtyOthers.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`otherSubspecialties.${i}.otherSubspecialtyOthers`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `otherSubspecialties.${i}.otherSubspecialtyOthers`,
        ];
      }
    }

    return null;
  });

  const status = {
    hasErrors: false,
  };

  for (const key in hash) {
    if (hash[key].length > 1) {
      hash[key].map((field: any) => {
        status.hasErrors = true;
        return setError(field, {
          message: validationMessages.validate.duplicateResearchInterest,
        });
      });
    }
  }

  return status;
};
