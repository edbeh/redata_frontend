import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ImgArrowUturnLeftOutline } from "assets";
import { BreadCrumbs, Button, Card } from "components";
import { BaseLayout } from "wrapper-components";
import {
  BasicInfoForm,
  ResearchInterestsForm,
  PatientPopulationsForm,
} from "pages";

import { editHomeNav } from "../../Profile.util";
import { IsSubmissionLoadingType } from "./EditProfile.model";

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
            />

            <div className="w-[180px] self-end mt-6">
              <Button
                isLoading={isSubmissionLoading.basicInfo}
                onClick={() => {
                  basicInfoSubmitRef.current?.click();
                }}
              >
                Save Changes
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              Research Interests
            </h2>
            <ResearchInterestsForm ref={researchInterestSubmitRef} />

            <div className="w-[180px] self-end mt-6">
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              Patient Populations
            </h2>
            <PatientPopulationsForm ref={patientPopulationSubmitRef} />

            <div className="w-[180px] self-end mt-6">
              <Button>Save Changes</Button>
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EditProfile;
