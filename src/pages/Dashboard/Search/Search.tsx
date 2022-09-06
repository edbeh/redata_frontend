import { BaseLayout } from "wrapper-components";
import { BreadCrumbs } from "components";

import { searchNav } from "./Search.util";

const Search = () => {
  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={searchNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Search
        </h1>
      </div>
    </BaseLayout>
  );
};

export default Search;
