import { useNavigate } from "react-router-dom";

import { BreadCrumbs } from "components";
import { ImgPencilSquareOutline } from "assets";
import { BaseLayout } from "wrapper-components";
import { useFetchMe } from "api/hooks";

import { researchNav } from "./Research.util";
import ResearchSection from "./components/ResearchSection/ResearchSection";

const Research = () => {
  const navigate = useNavigate();

  // *Queries
  const fetchMe = useFetchMe();

  // *JSX
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={researchNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Research
          </h1>
          <div
            className="flex space-x-1 items-center text-white cursor-pointer"
            onClick={() => navigate("/research/edit")}
          >
            <ImgPencilSquareOutline width={20} height={20} />
            <p>Edit</p>
          </div>
        </div>

        <div className="flex flex-col w-full mt-8 space-y-6">
          {fetchMe?.data?.data ? <ResearchSection data={[]} /> : <div />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Research;
