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
    mcrNo: data.mcr_no,
    primarySpecialty: data.primary_subspecialty.id,
    primarySpecialtyOthers: data.primary_subspecialty_others,
    secondarySpecialty: data.secondary_subspecialty.id,
    secondarySpecialtyOthers: data.secondary_subspecialty_others,
    bio: data.bio,
  };
};
