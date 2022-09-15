/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import { BaseLayout } from "wrapper-components";
import { useParams, useNavigate } from "react-router-dom";

import { ProgressBar, Button, Modal } from "components";
import { imgScientistMicroscope } from "assets";
import {
  BasicInfoForm,
  ResearchInterestsForm,
  PatientPopulationsForm,
  PublicationsForm,
} from "pages";

import { getOnboardingSteps } from "./Onboarding.utils";
import OnboardingIndicator from "./OnboardingIndicator/OnboardingIndicator";

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  const basicInfoSubmitRef = useRef<HTMLButtonElement>(null);
  const researchInterestSubmitRef = useRef<HTMLButtonElement>(null);
  const patientPopulationSubmitRef = useRef<HTMLButtonElement>(null);
  const publicationsSubmitRef = useRef<HTMLButtonElement>(null);

  const onboardingSteps = useMemo(() => {
    return getOnboardingSteps();
  }, []);

  const [isSubmissionLoading, setIsSubmissionLoading] =
    useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [initialProgress, setInitialProgress] = useState<string>("0%");
  const [currentProgress, setCurrentProgress] = useState<string>("0%");
  const [isIntroModalVisible, setIsIntroModalVisible] =
    useState<boolean>(false);

  // *Methods
  const handleNextStep = () => {
    if (currentStep === 1) return basicInfoSubmitRef.current?.click(); // submit basic info form
    if (currentStep === 2) return researchInterestSubmitRef.current?.click(); // submit research interests form
    if (currentStep === 3) return patientPopulationSubmitRef.current?.click(); // submit patient populations form
    if (currentStep === 4) return publicationsSubmitRef.current?.click(); // submit publications form
  };

  const handleFormSubmitSuccess = () => {
    return navigate(`/onboarding/${currentStep + 1}`);
  };

  const handlePrevStep = () => {
    return navigate(`/onboarding/${currentStep - 1}`);
  };

  // *Effects
  useLayoutEffect(() => {
    if (!step) return navigate("/onboarding/1");
    const stepInt = parseInt(step);

    if (onboardingSteps) {
      const allSteps: number[] = [];
      onboardingSteps.map((step) => allSteps.push(step.number));

      // return user to first step of onboarding if the step is invalid
      if (!allSteps.includes(stepInt)) return navigate("/onboarding/1");

      const initialProgress = `${
        (stepInt - 1 / onboardingSteps.length) * 100
      }%`;
      const currentProgress = `${(stepInt / onboardingSteps.length) * 100}%`;
      setInitialProgress(initialProgress);
      setCurrentProgress(currentProgress);
      setCurrentStep(stepInt);
    }
  }, [step, onboardingSteps]);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsIntroModalVisible(true);
    // }, 250);
  }, [currentStep]);

  // *JSX
  return (
    <BaseLayout>
      <Modal
        title="Welcome to ReData!"
        content={
          <div className="flex flex-col mb-2">
            <img
              className="self-center"
              src={imgScientistMicroscope}
              alt="scientist-microscope"
              width={200}
              height={200}
            />
            <p>
              We'd love to know more about you! Complete your profile now by
              filling up the following sections:
            </p>
            <ul className="my-3 ml-4 list-disc">
              <li>Basic information & bio</li>
              <li>Research interests</li>
              <li>Patient pools</li>
              <li>Publications (sync from PubMed)</li>
            </ul>
            <p>This whole process will take approximately 10 minutes.</p>
          </div>
        }
        isVisible={isIntroModalVisible}
        onDismiss={() => {
          setIsIntroModalVisible(false);
        }}
      />

      <div className="flex w-full p-6">
        <div className="hidden md:flex flex-col mx-6 align-center min-w-[200px]">
          {onboardingSteps?.map((step, i) => {
            return (
              <OnboardingIndicator
                key={step.description}
                number={step.number}
                description={step.description}
                index={i}
                isActive={currentStep > i}
              />
            );
          })}
        </div>

        <div className="flex flex-col w-full">
          <h1 className="mb-2 text-4xl font-semibold tracking-tight">
            {onboardingSteps[currentStep - 1].description}
          </h1>
          <ProgressBar
            initial={initialProgress}
            progress={currentProgress}
            showProgressInText
          />

          <div className="my-10">
            {currentStep === 1 && (
              <BasicInfoForm
                ref={basicInfoSubmitRef}
                onSuccessCallback={handleFormSubmitSuccess}
                setIsSubmissionLoading={setIsSubmissionLoading}
                isOnboarding
              />
            )}
            {currentStep === 2 && (
              <ResearchInterestsForm
                ref={researchInterestSubmitRef}
                onSuccessCallback={handleFormSubmitSuccess}
                isOnboarding
              />
            )}
            {currentStep === 3 && (
              <PatientPopulationsForm
                ref={patientPopulationSubmitRef}
                onSuccessCallback={handleFormSubmitSuccess}
                isOnboarding
              />
            )}
            {currentStep === 4 && (
              <PublicationsForm
                ref={publicationsSubmitRef}
                onSuccessCallback={handleFormSubmitSuccess}
              />
            )}
          </div>

          <div className="flex self-center md:self-end w-1/3 min-w-[275px] space-x-4">
            <Button
              variant="secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={currentStep >= onboardingSteps?.length}
              isLoading={isSubmissionLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Onboarding;
