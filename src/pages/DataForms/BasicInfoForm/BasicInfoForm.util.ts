import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IBasicInfoFormFields } from "./BasicInfoForm.model";
import { toast } from "react-toastify";

export const cleanUpData = (
  data: IBasicInfoFormFields,
  correctedPubMedNames: string[]
) => {
  const appendPubmedNames = (form: FormData) => {
    const arr = data.pubMedNames.split(", ");
    if (arr.length === 0) return;

    for (var i = 0; i < arr.length; i++) {
      form.append("pubmedNames[]", arr[i]);
    }
  };

  const appendCorrectedPubmedNames = (form: FormData) => {
    if (correctedPubMedNames.length === 0) return;

    for (let i = 0; i < correctedPubMedNames.length; i++) {
      form.append("correctedPubmedNames[]", correctedPubMedNames[i]);
    }
  };

  const appendPrimarySpecialty = (form: FormData) => {
    form.append(
      "primarySpecialty[id]",
      data.primarySubspecialty?.id === "others"
        ? ""
        : data.primarySubspecialty.id
    );
    form.append(
      "primarySpecialty[name]",
      data.primarySubspecialty?.id === "others"
        ? data.primarySubspecialtyOthers
        : ""
    );
  };

  const appendOtherSpecialties = (form: FormData) => {
    if (data.otherSubspecialties?.length === 0) return;

    const otherSpecialties = data.otherSubspecialties.map((item) => ({
      id:
        item.otherSubspecialty?.id === "others"
          ? null
          : (item.otherSubspecialty?.id as string),
      name:
        item.otherSubspecialty?.id === "others"
          ? (item.otherSubspecialtyOthers as string)
          : null,
    }));

    for (let i = 0; i < otherSpecialties.length; i++) {
      Object.entries(otherSpecialties[i]).map(([key, value]) =>
        form.append(`otherSpecialties[][${key}]`, value || "")
      );
    }
  };

  const form = new FormData();
  appendPubmedNames(form);
  appendCorrectedPubmedNames(form);
  appendPrimarySpecialty(form);
  appendOtherSpecialties(form);

  form.append("designationId", data.designation.id);
  form.append("name", data.name);
  form.append("departmentId", data.department.id);
  form.append("mcrNumber", data.mcrNo);
  form.append("googleScholarUrl", data.googleScholarUrl);
  form.append("bio", data.bio);
  form.append(
    "image",
    data.image && data.image.length > 0 ? data.image[0] : ""
  );

  return form;
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

  // filter duplicate names
  const filtered = data.filter((name, index, self) => {
    return self.indexOf(name) === index;
  });

  status.hasErrors = true;
  setError("pubMedNames", {
    message: `The following PubMed names are invalid: ${filtered.join(", ")}`,
  });
  toast.error("Please correct invalid PubMed names");

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
    if (!hash[lowercase]) {
      hash[lowercase] = [`primarySubspecialty`];
    } else {
      hash[lowercase] = [...hash[lowercase], `primarySubspecialty`];
    }
  }
  if (data.primarySubspecialtyOthers) {
    const lowercase = data.primarySubspecialtyOthers.toLowerCase();
    if (!hash[lowercase]) {
      hash[lowercase] = [`primarySubspecialtyOthers`];
    } else {
      hash[lowercase] = [...hash[lowercase], `primarySubspecialtyOthers`];
    }
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
          message: validationMessages.validate.duplicateSubSpecialty,
        });
      });
    }
  }

  return status;
};
