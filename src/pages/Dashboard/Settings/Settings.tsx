import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";

import { settingsNav } from "./Settings.util";

const Settings = () => {
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={settingsNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Settings
        </h1>
      </div>
    </BaseLayout>
  );
};

export default Settings;
