import { FormSelectModel } from "models";

type PatientPopulation = {
  patientPopulation: FormSelectModel | undefined;
  patientPopulationOthers: string | undefined;
};

export interface IPatientPopulationsFormFields {
  patientPopulations: PatientPopulation[];
}
