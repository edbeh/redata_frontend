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
  return {
    designationId: data.designation.id,
    name: data.name,
    departmentId: data.department.id,
    mcrNo: data.mcrNo,
    primarySpecialty: data.primarySubspecialty.id,
    primarySpecialtyOthers: data.primarySubspecialtyOthers,
    secondarySpecialty: data.secondarySubspecialty.id,
    secondarySpecialtyOthers: data.secondarySubspecialtyOthers,
    bio: data.bio,
  };
};
