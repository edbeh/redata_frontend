import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";

export const cleanUpData = (data: IPatientPopulationsFormFields) => {
  const patientPopulations = data.patientPopulations?.map((item) => ({
    id:
      item.patientPopulation?.id === "others"
        ? null
        : (item.patientPopulation?.id as string),
    name:
      item.patientPopulation?.id === "others"
        ? (item.patientPopulationOthers as string)
        : null,
  }));

  return {
    patientPools: patientPopulations,
  };
};

type ValidationStatus = {
  hasErrors: boolean;
};

export const validateDuplicateValues = (
  data: IPatientPopulationsFormFields,
  setError: UseFormSetError<IPatientPopulationsFormFields>
): ValidationStatus => {
  const hash: { [key: string]: string[] } = {};

  data.patientPopulations.map((item, i) => {
    if (
      item.patientPopulation?.name &&
      item.patientPopulation.id !== "others"
    ) {
      const lowercase = item.patientPopulation.name.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`patientPopulations.${i}.patientPopulation`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `patientPopulations.${i}.patientPopulation`,
        ];
      }
    }

    if (item.patientPopulationOthers) {
      const lowercase = item.patientPopulationOthers.toLowerCase();
      if (!hash[lowercase]) {
        hash[lowercase] = [`patientPopulations.${i}.patientPopulationOthers`];
      } else {
        hash[lowercase] = [
          ...hash[lowercase],
          `patientPopulations.${i}.patientPopulationOthers`,
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
          message: validationMessages.validate.duplicatePatientPopulation,
        });
      });
    }
  }

  return status;
};
