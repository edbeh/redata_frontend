import { IPatientPopulationsFormFields } from "./PatientPopulationsForm.model";

export const cleanUpData = (data: IPatientPopulationsFormFields) => {
  return {
    patientPopulations: data.patient_populations,
  };
};
