import { useNavigate } from "react-router-dom";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card } from "components";
import { ImgArrowUturnLeftOutline } from "assets";

import { editResearchNav } from "../../Research.util";

import SearchTrialsForm from "pages/DataForms/SearchTrialsForm/SearchTrialsForm";

const EditResearch = () => {
  const navigate = useNavigate();

  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={editResearchNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Edit Research
          </h1>
          <div
            className="flex space-x-1 items-center text-white cursor-pointer"
            onClick={() => navigate("/research")}
          >
            <ImgArrowUturnLeftOutline width={20} height={20} />
            <p>Back</p>
          </div>
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <Card>
            <div className="w-full pb-4 pt-2 px-2">
              <SearchTrialsForm />
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default EditResearch;
