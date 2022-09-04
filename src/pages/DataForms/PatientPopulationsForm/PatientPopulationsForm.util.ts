import { UseFormSetError } from "react-hook-form";

import { validationMessages } from "const";

import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";

export const cleanUpData = (data: IPatientPopulationsFormFields) => {
  return {
    patientPopulations: data.patientPopulations,
  };
};

type ValidationStatus = {
  hasErrors: boolean;
};

export const validateDuplicateValues = (
  data: IPatientPopulationsFormFields,
  setError: UseFormSetError<IPatientPopulationsFormFields>
): ValidationStatus => {
  const hash: { [key: string]: number[] } = {};

  data.patientPopulations.map((item, i) => {
    if (!hash[item.patientPopulation]) {
      return (hash[item.patientPopulation] = [i]);
    } else {
      return (hash[item.patientPopulation] = [
        ...hash[item.patientPopulation],
        i,
      ]);
    }
  });

  const status = {
    hasErrors: false,
  };

  for (const key in hash) {
    if (hash[key].length > 1) {
      hash[key].map((index) => {
        status.hasErrors = true;
        return setError(`patientPopulations.${index}.patientPopulation`, {
          message: validationMessages.validate.duplicatePatientPopulation,
        });
      });
    }
  }

  return status;
};
