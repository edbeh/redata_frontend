import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";
import {
  useFetchMe,
  useFetchPubMedByNames,
  useFetchAllPublications,
} from "api/hooks";

import { mockData as mockDataHome } from "../Home/Home.util";
import { publicationsNav, mockData } from "./Publications.util";
import { PublicationsSection } from "./components";
import PublicationsSectionLoading from "./components/PublicationsSection/PublicationsSectionLoading";

const Publications = () => {
  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const {
    data: fetchPubMedByNamesData,
    isLoading: fetchPubMedByNamesIsLoading,
    isFetching: fetchPubMedByNamesIsFetching,
  } = useFetchPubMedByNames(
    mockDataHome.pubmedNames?.join(","),
    mockDataHome.pubmedNames?.length > 0
  );

  const {
    data: fetchAllPublicationsData,
    isLoading: fetchAllPublicationsIsLoading,
    isFetching: fetchAllPublicationsIsFetching,
  } = useFetchAllPublications();

  console.log("fetchMeData", fetchMeData);
  console.log("fetchAllPublicationsData", fetchAllPublicationsData);

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Publications
        </h1>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchAllPublicationsData?.data ? (
            <PublicationsSection
              data={fetchAllPublicationsData?.data?.data || []}
              namesToBold={fetchPubMedByNamesData?.namesToBold || []}
            />
          ) : (
            <PublicationsSectionLoading />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Publications;
