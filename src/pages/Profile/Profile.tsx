import { useNavigate } from "react-router-dom";

import { Card } from "components";
import { BaseLayout } from "wrapper-components";
import { useFetchMe, useFetchAllPublications } from "api/hooks";

import {
  HeroSection,
  InfoSection,
  CommonSection,
  HeroSectionLoading,
  InfoSectionLoading,
  CommonSectionLoading,
} from "pages/Dashboard/Home/components";
import { PublicationsSection } from "pages/Dashboard/Publications/components";
import { mockData } from "pages/Dashboard/Home/Home.util";
import Publications from "pages/Dashboard/Publications/Publications";

const Profile = () => {
  const navigate = useNavigate();

  // *Queries
  const fetchMe = useFetchMe();
  const fetchAllPublications = useFetchAllPublications();

  return (
    <BaseLayout withLeftNavigation withBackdrop>
      <div className="w-full space-y-6 pb-12 mt-0 sm:mt-[29px]">
        {fetchMe?.data ? (
          <>
            <HeroSection data={fetchMe?.data?.data?.data} withProfileDetails />
            <CommonSection
              title="Research Interests"
              data={mockData.researchInterests}
              onClickBadge={(item: string) => {
                navigate({
                  pathname: "/search",
                  search: `?keyword=${encodeURIComponent(
                    item
                  )}&searchIn=researchInterests`,
                });
              }}
            />
            <CommonSection
              title="Patient Populations"
              data={mockData.patientPopulations}
              onClickBadge={(item: string) => {
                navigate({
                  pathname: "/search",
                  search: `?keyword=${encodeURIComponent(
                    item
                  )}&searchIn=patientPopulations`,
                });
              }}
            />
            {fetchAllPublications?.data?.data?.data && (
              <PublicationsSection
                data={fetchAllPublications?.data?.data?.data || []}
                namesToBold={
                  fetchMe?.data?.data?.data?.correctedPubmedNames || []
                }
                withHeader
              />
            )}
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
    </BaseLayout>
  );
};

export default Profile;
