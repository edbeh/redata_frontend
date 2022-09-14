import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";
import { useFetchMe, useFetchAllPublications } from "api/hooks";

import { publicationsNav } from "./Publications.util";
import { PublicationsSection } from "./components";
import PublicationsSectionLoading from "./components/PublicationsSection/PublicationsSectionLoading";

const Publications = () => {
  // *Queries
  const { data: fetchMeData } = useFetchMe();
  const { data: fetchAllPublicationsData } = useFetchAllPublications();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Publications
        </h1>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchMeData?.data && fetchAllPublicationsData?.data ? (
            <PublicationsSection
              data={fetchAllPublicationsData?.data?.data || []}
              namesToBold={fetchMeData?.data?.data?.correctedPubmedNames || []}
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
