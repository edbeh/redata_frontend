import { useNavigate } from "react-router-dom";

import { BreadCrumbs } from "components";
import { ImgPencilSquareOutline } from "assets";
import { BaseLayout } from "wrapper-components";
import { useFetchAllStudies, useFetchMe } from "api/hooks";

import { studiesNav } from "./Studies.util";
import StudiesSection from "./components/StudiesSection/StudiesSection";
import { isSampleProfile } from "utils";
import { useMe } from "hooks";

const Studies = () => {
  const navigate = useNavigate();
  const { email } = useMe();

  // *Queries
  const fetchAllStudies = useFetchAllStudies();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={studiesNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Studies
          </h1>
          {!isSampleProfile(email) && (
            <div
              className="flex space-x-1 items-center text-white cursor-pointer"
              onClick={() => navigate("/studies/edit")}
            >
              <ImgPencilSquareOutline width={20} height={20} />
              <p>Edit</p>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchAllStudies?.data?.data?.data ? (
            <StudiesSection data={fetchAllStudies.data.data.data} />
          ) : (
            <div />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Studies;
