/* eslint-disable react-hooks/exhaustive-deps */
import { BaseLayout } from "components";
import { useLayoutEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOnboardingSteps } from "./Onboarding.utils";
import OnboardingIndicator from "./OnboardingIndicator/OnboardingIndicator";

const Onboarding = () => {
  const navigate = useNavigate();
  const { step } = useParams();

  const onboardingSteps = useMemo(() => {
    return getOnboardingSteps();
  }, []);

  const [currentStep, setCurrentStep] = useState<number>(1);

  // *Effects
  useLayoutEffect(() => {
    if (!step) return navigate("/onboarding/1");

    if (onboardingSteps) {
      const allSteps: number[] = [];
      onboardingSteps.map((step) => allSteps.push(step.number));
      if (!allSteps.includes(parseInt(step as string)))
        return navigate("/onboarding/1");
    }

    setCurrentStep(parseInt(step));
  }, [step, onboardingSteps]);

  // *JSX
  return (
    <BaseLayout withTopPadding>
      <div className="flex">
        <div className="flex flex-col mx-11 align-center">
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

        <h1 className="text-4xl font-semibold">Onboarding</h1>
      </div>
    </BaseLayout>
  );
};

export default Onboarding;
