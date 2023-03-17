import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card, Modal } from "components";
import { ImgArrowUturnLeftOutline } from "assets";

import { editStudyNav } from "../../Studies.util";

import StudiesForm from "pages/DataForms/StudiesForm/StudiesForm";

const EditStudy = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={editStudyNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Edit Studies
          </h1>
          <div
            className="flex space-x-1 items-center text-white cursor-pointer"
            onClick={() => navigate("/studies")}
          >
            <ImgArrowUturnLeftOutline width={20} height={20} />
            <p>Back</p>
          </div>
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <Card>
            <div className="w-full pb-4 pt-2 px-2">
              <StudiesForm />
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EditStudy;
