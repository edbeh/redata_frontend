import { Button, Input } from "components";

import { useFetchTrialsByKeywords } from "api/hooks/useClinicalTrialsGovQuery";
import { useState } from "react";

const SearchTrialsForm = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  // *Queries
  const fetchTrialsByKeywords = useFetchTrialsByKeywords(
    searchKeywords,
    !!setSearchKeywords
  );

  // *Methods
  const handleSearchClinicalTrialsGov = () => {
    setSearchKeywords(keywords);
  };

  console.log("data", fetchTrialsByKeywords?.data?.data?.StudyFieldsResponse);

  // *JSX
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 w-full">
      <Input
        label="Keywords"
        name="keywords"
        id="keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.currentTarget.value)}
        autoComplete="off"
        required
      />

      <div className="pt-2">
        <Button
          variant="secondary"
          loadingText="Searching..."
          onClick={handleSearchClinicalTrialsGov}
        >
          Search ClinicalTrials.gov
        </Button>
      </div>
    </div>
  );
};

export default SearchTrialsForm;
