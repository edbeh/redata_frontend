import { useNavigate, useParams } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import {
  useFetchUserById,
  useFetchAllPublications,
  useFetchUserPublicationsById,
} from "api/hooks";

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
  const { id } = useParams();

  // *Queries
  const fetchUserById = useFetchUserById(id as string, !!id);
  const fetchUserPublicationsById = useFetchUserPublicationsById(
    id as string,
    !!id
  );

  // *JSX
  return (
    <BaseLayout withLeftNavigation withBackdrop>
      <div className="w-full space-y-6 pb-12 mt-0 sm:mt-[29px]">
        {fetchUserById?.data ? (
          <>
            <HeroSection
              data={fetchUserById?.data?.data?.data}
              withProfileDetails
            />
            {fetchUserById?.data?.data?.data?.researchInterests?.length > 0 && (
              <CommonSection
                title="Research Interests"
                data={fetchUserById.data.data.data.researchInterests.map(
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

            {fetchUserById?.data?.data?.data?.patientPools?.length > 0 && (
              <CommonSection
                title="Patient Populations"
                data={fetchUserById.data.data.data.patientPools.map(
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

            {fetchUserPublicationsById?.data?.data?.data && (
              <PublicationsSection
                data={fetchUserPublicationsById?.data?.data?.data || []}
                namesToBold={
                  fetchUserById?.data?.data?.data?.correctedPubmedNames || []
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
