import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";

import { publicationsNav } from "./Publications.util";

const Publications = () => {
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={publicationsNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Publications
        </h1>
      </div>
    </BaseLayout>
  );
};

export default Publications;
