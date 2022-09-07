import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";
import { useFetchMe, useFetchPubMedByNames } from "api/hooks";

import { publicationsNav, mockData } from "./Publications.util";
import { PubMedNamesSection, PublicationsSection } from "./components";
import PublicationsSectionLoading from "./components/PublicationsSection/PublicationsSectionLoading";

const Publications = () => {
  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const {
    data: fetchPubMedByNamesData,
    isLoading: fetchPubMedByNamesIsLoading,
    isFetching: fetchPubMedByNamesIsFetching,
  } = useFetchPubMedByNames(
    mockData.pubmedNames?.join(","),
    mockData.pubmedNames?.length > 0
  );

  console.log("fetchMeData", fetchMeData);
  console.log("fetchPubMedByNamesData", fetchPubMedByNamesData);

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Publications
        </h1>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <PubMedNamesSection data={mockData.pubmedNames} />
          {fetchPubMedByNamesData?.namesToBold ? (
            <PublicationsSection
              data={mockData.publications}
              namesToBold={fetchPubMedByNamesData.namesToBold}
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
