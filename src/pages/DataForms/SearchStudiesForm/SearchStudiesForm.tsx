import { Button, Input, Modal } from "components";

import { useFetchStudiesByKeywords } from "api/hooks/useClinicalTrialsGovQuery";
import { useEffect, useState } from "react";

import StudyCard from "pages/Dashboard/Studies/components/StudyCard/StudyCard";

const SearchStudiesForm = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [isAddResearchModalVisible, setIsAddResearchModalVisible] =
    useState<boolean>(false);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // *Queries
  const fetchStudiesByKeywords = useFetchStudiesByKeywords(
    searchKeywords,
    !!searchKeywords
  );

  // *Methods
  const handleSearchClinicalTrialsGov = () => {
    setRefresh(!refresh);
    setSearchKeywords(keywords);
  };

  // *Effects
  useEffect(() => {
    if (fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse?.StudyFields) {
      setIsAddResearchModalVisible(true);
    }
  }, [refresh, fetchStudiesByKeywords.data]);

  console.log(
    "data",
    fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse?.StudyFields
  );

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
      <div className="pt-2 min-w-[200px]">
        <Button
          isLoading={
            fetchStudiesByKeywords?.isLoading ||
            fetchStudiesByKeywords?.isFetching
          }
          disabled={keywords?.length === 0}
          variant="secondary"
          loadingText="Searching..."
          onClick={handleSearchClinicalTrialsGov}
        >
          Search ClinicalTrials.gov
        </Button>
      </div>

      <Modal
        title="Add Studies"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <p className="mt-2">
              Select studies you'd like to add to your profile. Studies already
              in your profile are disabled.
            </p>

            {fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse
              ?.StudyFields &&
              fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse?.StudyFields.map(
                (study, i) => {
                  return (
                    <StudyCard
                      index={i}
                      study={study}
                      handleSelectStudy={() => {}}
                      isSelected={false}
                      isDisabled={false}
                      key={study.NCTId[0]}
                    />
                  );
                }
              )}

            <div className="sticky flex h-[60px] bg-white -bottom-8 items-center justify-apart">
              <Button
                // onClick={handleSubmitSelectedPubMedIds}
                // isLoading={submitPublicationsFromPubMed?.isLoading}
                loadingText="Processing..."
              >
                Add to Profile
              </Button>
            </div>
          </div>
        }
        isVisible={isAddResearchModalVisible}
        onDismiss={() => {
          setIsAddResearchModalVisible(false);
        }}
      />
    </div>
  );
};

export default SearchStudiesForm;
