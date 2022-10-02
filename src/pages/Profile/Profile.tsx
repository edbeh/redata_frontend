import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { useFetchMe, useFetchAllPublications } from "api/hooks";

import {
  HeroSection,
  CommonSection,
  HeroSectionLoading,
  InfoSectionLoading,
  CommonSectionLoading,
} from "pages/Dashboard/Home/components";
import { PublicationsSection } from "pages/Dashboard/Publications/components";

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
            {fetchMe?.data?.data?.data?.researchInterests?.length > 0 && (
              <CommonSection
                title="Research Interests"
                data={fetchMe.data.data.data.researchInterests.map(
                  (interest) => interest.name
                )}
                onClickBadge={(item: string) => {
                  navigate({
                    pathname: "/search",
                    search: `?keyword=${encodeURIComponent(
                      item
                    )}&searchIn=researchInterests`,
                  });
                }}
              />
            )}

            {fetchMe?.data?.data?.data?.patientPools?.length > 0 && (
              <CommonSection
                title="Patient Populations"
                data={fetchMe.data.data.data.patientPools.map(
                  (pool) => pool.name
                )}
                onClickBadge={(item: string) => {
                  navigate({
                    pathname: "/search",
                    search: `?keyword=${encodeURIComponent(
                      item
                    )}&searchIn=patientPopulations`,
                  });
                }}
              />
            )}

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
