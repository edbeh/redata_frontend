import { useNavigate } from "react-router-dom";

import { BreadCrumbs } from "components";
import { BaseLayout } from "wrapper-components";
import { ImgPencilSquareOutline } from "assets";

import { homeNav, mockData } from "./Profile.util";
import {
  HeroSection,
  InfoSection,
  CommonSection,
  PubMedNamesSection,
  HeroSectionLoading,
  InfoSectionLoading,
  CommonSectionLoading,
} from "./components";
import { useFetchMe } from "api/hooks";

const Profile = () => {
  const navigate = useNavigate();

  // *Queries
  const fetchMe = useFetchMe();

  console.log("fetchMe.data", fetchMe?.data);

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={homeNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Profile
          </h1>
          <ImgPencilSquareOutline
            onClick={() => navigate("/home/edit")}
            width={20}
            height={20}
            className="text-white cursor-pointer"
          />
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchMe?.data ? (
            <>
              <HeroSection data={fetchMe?.data?.data?.data} />
              <InfoSection data={fetchMe?.data?.data?.data} />
              <CommonSection
                title="Research Interests"
                data={mockData.researchInterests}
              />
              <CommonSection
                title="Patient Populations"
                data={mockData.patientPopulations}
              />
              <PubMedNamesSection data={fetchMe.data?.data?.data} />
            </>
          ) : (
            <>
              <HeroSectionLoading />
              <InfoSectionLoading />
              <CommonSectionLoading />
              <CommonSectionLoading />
            </>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Profile;
