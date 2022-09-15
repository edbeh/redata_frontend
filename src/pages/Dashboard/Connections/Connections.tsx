import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";

import { connectionsNav } from "./Connections.util";

const Connections = () => {
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={connectionsNav.breadcrumbs} />
        <div className="flex space-x-3 items-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Connections
          </h1>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Connections;
