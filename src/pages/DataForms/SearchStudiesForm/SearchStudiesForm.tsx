import { Button, FullScreenLoader, Input, Modal } from "components";

import { useFetchStudiesByKeywords } from "api/hooks/useClinicalTrialsGovQuery";
import { useEffect, useState } from "react";

import StudyCard from "pages/Dashboard/Studies/components/StudyCard/StudyCard";
import { GetStudiesByKeywords } from "api/models";

const SearchStudiesForm = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [studies, setStudies] = useState<GetStudiesByKeywords.StudyField[]>([]);

  const [isAddResearchModalVisible, setIsAddResearchModalVisible] =
    useState<boolean>(false);
  const [selectedStudyIds, setSelectedStudyIds] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [savedStudyIds, setSavedStudyIds] = useState<{
    [key: string]: string;
  }>({});
  const [selectedSavedStudyIds, setSelectedSavedStudyIds] = useState<string[]>(
    []
  );
  const [isStudiesRemovalModalVisible, setIsStudiesRemovalModalVisible] =
    useState<boolean>(false);

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

  const handleUpdateSelectedStudyIds = (id: string) => {
    const updatedIds = selectedStudyIds.includes(id)
      ? selectedStudyIds.filter((studyId) => studyId !== id)
      : [...selectedStudyIds, id];
    return setSelectedStudyIds(updatedIds);
  };

  const handleSubmitSelectedStudies = () => {
    let studyIdsHash: Record<string, number> = {};
    selectedStudyIds.map((id) => (studyIdsHash[id] = 1));

    const selectedStudies = studies
      .filter((study) => studyIdsHash[study.NCTId[0]] === 1)
      .map((selected) => ({
        nctId: selected.NCTId[0],
        title: selected.OfficialTitle[0],
        protocolId: selected.OrgStudyId[0],
        studyType: selected.StudyType[0],
        initiatedBy: selected.ResponsiblePartyType[0],
        sponsorName: selected.LeadSponsorName[0],
        pmid: selected.ReferencePMID?.length ? selected.ReferencePMID[0] : "",
      }));

    console.log(JSON.stringify(selectedStudies, null, 2));
  };

  // *Effects
  useEffect(() => {
    if (fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse?.StudyFields) {
      setStudies(
        fetchStudiesByKeywords.data.data.StudyFieldsResponse.StudyFields
      );
      setIsAddResearchModalVisible(true);
      setError("");
    }

    if (
      fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse
        ?.NStudiesReturned === 0
    ) {
      setStudies([]);
      setIsAddResearchModalVisible(false);
      setError("No studies found. Please try another keyword.");
    }
  }, [refresh, fetchStudiesByKeywords.data]);

  // *JSX
  return (
    <>
      {(fetchStudiesByKeywords?.isLoading ||
        fetchStudiesByKeywords?.isFetching) && <FullScreenLoader />}

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 w-full">
        <Input
          label="Keywords"
          name="keywords"
          id="keywords"
          value={keywords}
          onChange={(e) => {
            setKeywords(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchClinicalTrialsGov();
            }
          }}
          autoComplete="off"
          error={error}
          required
        />
        <div className="pt-2 min-w-[200px]">
          <Button
            disabled={keywords?.length <= 2}
            variant="secondary"
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
                Select studies you'd like to add to your profile. Studies
                already in your profile are disabled.
              </p>

              {studies.map((study, i) => {
                return (
                  <StudyCard
                    index={i}
                    study={study}
                    handleSelectStudy={handleUpdateSelectedStudyIds}
                    isSelected={selectedStudyIds.includes(study.NCTId[0])}
                    isDisabled={false}
                    key={study.NCTId[0]}
                  />
                );
              })}

              <div className="sticky flex h-[60px] bg-white -bottom-8 items-center justify-apart">
                <Button
                  onClick={handleSubmitSelectedStudies}
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
    </>
  );
};

export default SearchStudiesForm;
