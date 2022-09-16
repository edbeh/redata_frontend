import { useForm } from "react-hook-form";

import { BaseLayout } from "wrapper-components";
import { BreadCrumbs, Card } from "components";

import { searchNav } from "./Search.util";
import { ISearchFormFields } from "./components/SearchForm/SearchForm.model";
import SearchForm from "./components/SearchForm/SearchForm";
import SearchResults from "./components/SearchResults/SearchResults";

const Search = () => {
  // *Form
  const useFormReturn = useForm<ISearchFormFields>({
    mode: "onChange",
  });

  return (
    <BaseLayout withLeftNavigation>
      <div className="w-full pb-12">
        <BreadCrumbs breadcrumbs={searchNav.breadcrumbs} />
        <h1 className="mb-2 text-4xl font-semibold tracking-tight text-white">
          Search
        </h1>

        <div className="flex flex-col w-full mt-8 space-y-6">
          <Card>
            <SearchForm useFormReturn={useFormReturn} />
            <SearchResults />
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Search;
