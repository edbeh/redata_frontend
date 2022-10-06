import { useNavigate, useParams } from "react-router-dom";

import { Card } from "components";
import { BaseLayout } from "wrapper-components";
import { useFetchUserById, useFetchUserPublicationsById } from "api/hooks";

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

            {fetchUserById?.data?.data?.data?.bio?.length > 0 && (
              <Card>
                <h2 className="mb-5 text-xl font-semibold text-gray-700">
                  Bio
                </h2>
                <p className="whitespace-pre-wrap">
                  {fetchUserById.data.data.data.bio}
                </p>
              </Card>
            )}

            {fetchUserById?.data?.data?.data?.researchInterests?.length > 0 && (
              <CommonSection
                title="Research Interests"
                data={fetchUserById.data.data.data.researchInterests.map(
                  (interest) => interest.name
                )}
                onClickBadge={(item: string) => {
                  navigate({
                    pathname: "/search",
                    search: `?q=${encodeURIComponent(
                      item
                    )}&searchIn=medicalKeywords`,
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
                    search: `?q=${encodeURIComponent(
                      item
                    )}&searchIn=medicalKeywords`,
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
