import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ImgArrowUturnLeftOutline } from "assets";
import { BreadCrumbs, Button, Card } from "components";
import { BaseLayout } from "wrapper-components";
import {
  BasicInfoForm,
  ResearchInterestsForm,
  PatientPopulationsForm,
} from "pages";

import { editHomeNav } from "../../Home.util";
import {
  IsSubmissionLoadingType,
  IsSubmissionSuccessfulType,
} from "./EditHome.model";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const basicInfoSubmitRef = useRef<HTMLButtonElement>(null);
  const researchInterestSubmitRef = useRef<HTMLButtonElement>(null);
  const patientPopulationSubmitRef = useRef<HTMLButtonElement>(null);

  const [isSubmissionLoading, setIsSubmissionLoading] =
    useState<IsSubmissionLoadingType>({
      basicInfo: false,
      researchInterests: false,
      patientPopulations: false,
    });
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] =
    useState<IsSubmissionSuccessfulType>({
      basicInfo: false,
      researchInterests: false,
      patientPopulations: false,
    });

  // *Effects
  useEffect(() => {
    if (
      isSubmissionSuccessful.basicInfo &&
      isSubmissionSuccessful.researchInterests &&
      isSubmissionSuccessful.patientPopulations
    ) {
      toast.success("Data updated successfully");
      navigate("/home");
    }
  }, [
    isSubmissionSuccessful.basicInfo,
    isSubmissionSuccessful.researchInterests,
    isSubmissionSuccessful.patientPopulations,
    navigate,
  ]);

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={editHomeNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Edit Profile
          </h1>
          <ImgArrowUturnLeftOutline
            onClick={() => navigate("/home")}
            width={20}
            height={20}
            className="text-white cursor-pointer"
          />
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <Card>
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              Basic Information
            </h2>
            <BasicInfoForm
              ref={basicInfoSubmitRef}
              setIsSubmissionLoading={setIsSubmissionLoading}
              onSuccessCallback={() => {
                setIsSubmissionSuccessful(
                  (currentState: IsSubmissionSuccessfulType) => {
                    return { ...currentState, basicInfo: true };
                  }
                );
              }}
            />

            <h2 className="text-3xl font-semibold tracking-tight my-6">
              Research Interests
            </h2>
            <ResearchInterestsForm
              ref={researchInterestSubmitRef}
              setIsSubmissionLoading={setIsSubmissionLoading}
              onSuccessCallback={() => {
                setIsSubmissionSuccessful(
                  (currentState: IsSubmissionSuccessfulType) => {
                    return { ...currentState, researchInterests: true };
                  }
                );
              }}
            />

            <h2 className="text-3xl font-semibold tracking-tight mb-6 mt-12">
              Patient Populations
            </h2>
            <PatientPopulationsForm
              ref={patientPopulationSubmitRef}
              setIsSubmissionLoading={setIsSubmissionLoading}
              onSuccessCallback={() => {
                setIsSubmissionSuccessful(
                  (currentState: IsSubmissionSuccessfulType) => {
                    return { ...currentState, patientPopulations: true };
                  }
                );
              }}
            />

            <div className="w-[180px] self-end mb-6 mt-12">
              <Button
                isLoading={
                  isSubmissionLoading.basicInfo ||
                  isSubmissionLoading.researchInterests ||
                  isSubmissionLoading.patientPopulations
                }
                loadingText="Saving..."
                onClick={() => {
                  basicInfoSubmitRef.current?.click();
                  researchInterestSubmitRef.current?.click();
                  patientPopulationSubmitRef.current?.click();
                }}
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EditProfile;
