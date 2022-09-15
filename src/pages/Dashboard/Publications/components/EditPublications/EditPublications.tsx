import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card } from "components";
import { ImgArrowUturnLeftOutline } from "assets";
import { PublicationsForm } from "pages";

import { editPublicationsNav } from "../../Publications.util";

const EditPublications = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={editPublicationsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Edit Publications
          </h1>
          <ImgArrowUturnLeftOutline
            onClick={() => navigate("/publications")}
            width={20}
            height={20}
            className="text-white cursor-pointer"
          />
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <Card>
            <div className="w-full pb-4 pt-2 px-2">
              <PublicationsForm />
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EditPublications;
