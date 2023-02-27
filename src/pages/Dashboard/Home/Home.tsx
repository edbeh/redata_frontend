import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { BreadCrumbs, Card } from "components";
import { BaseLayout } from "wrapper-components";
import { ImgPencilSquareOutline } from "assets";

import { homeNav } from "./Home.util";
import {
  HeroSection,
  InfoSection,
  CommonSection,
  HeroSectionLoading,
  InfoSectionLoading,
  CommonSectionLoading,
  CitationSection,
} from "./components";
import { useFetchMe } from "api/hooks";
import { useEffect } from "react";
import { ME_API_KEY } from "api/keys";

const Home = () => {
  const navigate = useNavigate();

  // *Queries
  const queryClient = useQueryClient();
  const fetchMe = useFetchMe();

  // *Effects
  useEffect(() => {
    queryClient.invalidateQueries(ME_API_KEY);
  }, [queryClient]);

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={homeNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Profile
          </h1>

          <div
            className="flex space-x-1 items-center text-white cursor-pointer"
            onClick={() => navigate("/home/edit")}
          >
            <ImgPencilSquareOutline width={20} height={20} />
            <p>Edit</p>
          </div>
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchMe?.data ? (
            <>
              <HeroSection data={fetchMe?.data?.data?.data} />

              {fetchMe?.data?.data?.data?.bio?.length > 0 && (
                <Card>
                  <h2 className="mb-6 text-xl font-bold text-gray-700">Bio</h2>
                  <p className="whitespace-pre-wrap">
                    {fetchMe.data.data.data.bio}
                  </p>
                </Card>
              )}

              <InfoSection data={fetchMe?.data?.data?.data} />

              {fetchMe?.data?.data?.data?.researchInterests?.length > 0 && (
                <CommonSection
                  title="Research Interests"
                  data={fetchMe.data.data.data.researchInterests.map(
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

              {fetchMe?.data?.data?.data?.patientPools?.length > 0 && (
                <CommonSection
                  title="Patient Populations"
                  data={fetchMe.data.data.data.patientPools.map(
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
              <CitationSection />
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

export default Home;
