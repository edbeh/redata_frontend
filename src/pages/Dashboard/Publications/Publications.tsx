import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";
import { ImgPencilSquareOutline } from "assets";
import { useFetchMe, useFetchAllPublications } from "api/hooks";

import { publicationsNav } from "./Publications.util";
import { PublicationsSection } from "./components";
import PublicationsSectionLoading from "./components/PublicationsSection/PublicationsSectionLoading";

const Publications = () => {
  const navigate = useNavigate();

  // *Queries
  const { data: fetchMeData } = useFetchMe();
  const { data: fetchAllPublicationsData } = useFetchAllPublications();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Publications
          </h1>
          <ImgPencilSquareOutline
            onClick={() => navigate("/publications/edit")}
            width={20}
            height={20}
            className="text-white cursor-pointer"
          />
        </div>

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
