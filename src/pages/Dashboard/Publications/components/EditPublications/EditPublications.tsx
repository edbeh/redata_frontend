import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useMe } from "hooks";
import { isSampleProfile } from "utils";
import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card } from "components";
import { ImgArrowUturnLeftOutline } from "assets";
import { PublicationsForm } from "pages";

import { editPublicationsNav } from "../../Publications.util";

const EditPublications = () => {
  const { email } = useMe();
  const navigate = useNavigate();

  /** Effects */
  useEffect(() => {
    if (isSampleProfile(email)) {
      navigate("/publications");
    }
  }, [navigate, email]);

  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={editPublicationsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Edit Publications
          </h1>
          <div
            className="flex space-x-1 items-center text-white cursor-pointer"
            onClick={() => navigate("/publications")}
          >
            <ImgArrowUturnLeftOutline width={20} height={20} />
            <p>Back</p>
          </div>
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
