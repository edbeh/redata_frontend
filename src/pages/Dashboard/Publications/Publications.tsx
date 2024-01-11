import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";
import { ImgPencilSquareOutline } from "assets";
import { useFetchMe, useFetchAllPublications } from "api/hooks";

import { publicationsNav } from "./Publications.util";
import { PublicationsSection, PublicationsSectionLoading } from "./components";
import { useMe } from "hooks";
import { isSampleProfile } from "utils";

const Publications = () => {
  const navigate = useNavigate();
  const { email } = useMe();

  // *Queries
  const fetchMe = useFetchMe();
  const fetchAllPublications = useFetchAllPublications();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Publications
          </h1>
          {!isSampleProfile(email) && (
            <div
              className="flex space-x-1 items-center text-white cursor-pointer"
              onClick={() => navigate("/publications/edit")}
            >
              <ImgPencilSquareOutline width={20} height={20} />
              <p>Edit</p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchMe?.data?.data && fetchAllPublications?.data?.data ? (
            <PublicationsSection
              data={fetchAllPublications?.data?.data?.data || []}
              namesToBold={
                fetchMe?.data?.data?.data?.correctedPubmedNames || []
              }
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
