/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "components";
import { useLayoutEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ProgressBar, Button } from "components";

import { getOnboardingSteps } from "./Onboarding.utils";
import OnboardingIndicator from "./OnboardingIndicator/OnboardingIndicator";

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  const onboardingSteps = useMemo(() => {
    return getOnboardingSteps();
  }, []);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [initialProgress, setInitialProgress] = useState<string>("0%");
  const [currentProgress, setCurrentProgress] = useState<string>("0%");

  // *Methods
  const handleNextStep = () => {
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

  // *JSX
  return (
    <BaseLayout withTopPadding>
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
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">
            {onboardingSteps[currentStep - 1].description}
          </h1>
          <ProgressBar
            initial={initialProgress}
            progress={currentProgress}
            showProgressInText
          />

          <div className="flex self-end w-1/3 min-w-[275px] mt-11 space-x-4">
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
