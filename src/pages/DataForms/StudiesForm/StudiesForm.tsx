import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

import { imgDeleteFiles, imgNoData } from "assets";
import { Button, FormInput, FullScreenLoader, Input, Modal } from "components";
import { useFetchStudiesByKeywords } from "api/hooks/useClinicalTrialsGovQuery";
import { GetStudiesByKeywords } from "api/models";
import {
  useFetchAllStudies,
  useRemoveStudies,
  useSubmitStudies,
} from "api/hooks";
import { STUDIES_API_KEY } from "api/keys";

import { ISavedStudiesFormFields } from "./StudiesForm.model";

import StudyCard from "pages/Dashboard/Studies/components/StudyCard/StudyCard";
import SingleStudy from "pages/Dashboard/Studies/components/SingleStudy/SingleStudy";

const SearchStudiesForm = () => {
  const [keywords, setKeywords] = useState<string>("");
  const [searchKeywords, setSearchKeywords] = useState<string>("");
  const [studies, setStudies] = useState<GetStudiesByKeywords.StudyField[]>([]);

  const [isAddStudiesModalVisible, setIsAddStudiesModalVisible] =
    useState<boolean>(false);
  const [selectedStudyExternalIds, setSelectedStudyExternalIds] = useState<
    string[]
  >([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [savedStudyExternalIds, setSavedStudyExternalIds] = useState<{
    [key: string]: number;
  }>({});
  // use internal ids for deletion request
  const [selectedSavedStudyInternalIds, setSelectedSavedStudyInternalIds] =
    useState<string[]>([]);
  const [isStudiesRemovalModalVisible, setIsStudiesRemovalModalVisible] =
    useState<boolean>(false);

  const [error, setError] = useState<string>("");

  // *Forms
  const {
    register: registerSavedStudyInternalIds,
    handleSubmit: handleSubmitSavedStudyInternalIds,
    watch: watchSavedStudyInternalIds,
  } = useForm<ISavedStudiesFormFields>({
    mode: "onChange",
  });

  const selectAllSavedStudies = watchSavedStudyInternalIds(
    "selectAllSavedStudies"
  );

  // *Queries
  const queryClient = useQueryClient();

  const fetchStudiesByKeywords = useFetchStudiesByKeywords(
    searchKeywords,
    !!searchKeywords
  );

  const fetchAllStudies = useFetchAllStudies();
  const studiesData = fetchAllStudies?.data?.data?.data;

  console.log("fetchStudiesByKeywords", fetchStudiesByKeywords?.data?.data);

  const submitStudies = useSubmitStudies(() => {
    queryClient.invalidateQueries(STUDIES_API_KEY);
    toast.success("Studies added successfully!");
  });

  const removeStudies = useRemoveStudies(() => {
    setIsStudiesRemovalModalVisible(false);
    setSelectedSavedStudyInternalIds([]);
    queryClient.invalidateQueries(STUDIES_API_KEY);
    toast.success("Studies removed successfully!");
  });

  // *Methods
  const handleSearchClinicalTrialsGov = () => {
    setRefresh(!refresh);
    setSearchKeywords(keywords);
  };

  const handleUpdateSelectedStudyExternalIds = (nctId: string) => {
    const updatedIds = selectedStudyExternalIds.includes(nctId)
      ? selectedStudyExternalIds.filter((studyId) => studyId !== nctId)
      : [...selectedStudyExternalIds, nctId];
    return setSelectedStudyExternalIds(updatedIds);
  };

  const handleUpdateSelectedSavedStudyInternalIds = (id: string) => {
    const updatedInternalIds = selectedSavedStudyInternalIds.includes(id)
      ? selectedSavedStudyInternalIds.filter((internalId) => internalId !== id)
      : [...selectedSavedStudyInternalIds, id];
    return setSelectedSavedStudyInternalIds(updatedInternalIds);
  };

  const handleSubmitSelectedStudies = () => {
    let studyIdsHash: Record<string, number> = {};
    selectedStudyExternalIds.map((id) => (studyIdsHash[id] = 1));

    const payload = studies
      .filter((study) => studyIdsHash[study.NCTId[0]] === 1)
      .map((selected) => ({
        type: "study",
        nctId: selected.NCTId[0],
        title: selected.OfficialTitle[0],
        protocolId: selected.OrgStudyId[0],
        studyType: selected.StudyType[0],
        initiatedBy: selected?.ResponsiblePartyType[0] || "Unspecified",
        sponsorName: selected.LeadSponsorName[0],
        pmid:
          selected.ReferenceType[0] === "result" &&
          selected.ReferencePMID?.length
            ? selected.ReferencePMID[0]
            : "",
      }));

    submitStudies.mutate(payload);
  };

  const handleSelectAllSavedStudiesInternalIds = () => {
    if (!studiesData) return;

    if (selectAllSavedStudies) {
      const ids = studiesData.map((study) => study.id);
      setSelectedSavedStudyInternalIds(ids);
    } else {
      setSelectedSavedStudyInternalIds([]);
    }
  };

  const handleDeleteSelectedSavedStudies = () => {
    const payload = {
      ids: selectedSavedStudyInternalIds,
    };

    removeStudies?.mutate(payload);
  };

  // *Effects
  useEffect(() => {
    handleSelectAllSavedStudiesInternalIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAllSavedStudies]);

  useEffect(() => {
    if (fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse?.StudyFields) {
      setStudies(
        fetchStudiesByKeywords.data.data.StudyFieldsResponse.StudyFields
      );
      setIsAddStudiesModalVisible(true);
      setError("");
    }

    if (
      fetchStudiesByKeywords?.data?.data?.StudyFieldsResponse
        ?.NStudiesReturned === 0
    ) {
      setStudies([]);
      setIsAddStudiesModalVisible(false);
      setError("No studies found. Please try another keyword.");
    }
  }, [refresh, fetchStudiesByKeywords.data]);

  useEffect(() => {
    if (submitStudies?.data) {
      setIsAddStudiesModalVisible(false);
    }
  }, [submitStudies.data]);

  useEffect(() => {
    // collect all saved studies nctIds in a hash for O(1) access
    if (studiesData) {
      const object: { [key: string]: number } = {};
      studiesData.map((study) => {
        const nctId = study.nctId;
        return (object[nctId] = 1);
      });
      setSavedStudyExternalIds(object);
    }
  }, [studiesData]);

  // *JSX
  return (
    <div className="flex flex-col">
      {(fetchAllStudies?.isLoading ||
        fetchAllStudies?.isFetching ||
        fetchStudiesByKeywords?.isLoading ||
        fetchStudiesByKeywords?.isFetching) && <FullScreenLoader />}

      <Modal
        title="Add Studies"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <p className="mt-2">
              Select studies you'd like to add to your profile. Studies already
              in your profile are disabled.
            </p>

            {studies.map((study, i) => {
              const disabled =
                study.NCTId && savedStudyExternalIds[study.NCTId[0]] === 1;

              return (
                <StudyCard
                  index={i}
                  study={study}
                  handleSelectStudy={handleUpdateSelectedStudyExternalIds}
                  isSelected={selectedStudyExternalIds.includes(study.NCTId[0])}
                  isDisabled={disabled}
                  key={study.NCTId[0]}
                />
              );
            })}

            <div className="sticky flex h-[60px] bg-white -bottom-8 items-center justify-apart">
              <Button
                onClick={handleSubmitSelectedStudies}
                isLoading={submitStudies?.isLoading}
                loadingText="Processing..."
              >
                Add to Profile
              </Button>
            </div>
          </div>
        }
        isVisible={isAddStudiesModalVisible}
        onDismiss={() => {
          setIsAddStudiesModalVisible(false);
        }}
      />

      <Modal
        title="Remove Studies"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <img
              className="self-center mt-2"
              src={imgDeleteFiles}
              alt="delete-files"
              width={230}
              height={230}
            />

            <div>
              <p className="mt-2">
                You are about to remove {selectedSavedStudyInternalIds.length}{" "}
                studies. Are you sure you want to continue?
              </p>
              <p className="mt-2">
                You may save some of these studies from ClinicalTrials.gov in
                the future, but any edits you've made to your existing studies
                will be lost.
              </p>
            </div>

            <div className="self-center w-full">
              <Button
                variant="red"
                onClick={handleSubmitSavedStudyInternalIds(
                  handleDeleteSelectedSavedStudies
                )}
                isLoading={removeStudies?.isLoading}
                loadingText="Removing..."
              >
                Remove Studies
              </Button>
            </div>
          </div>
        }
        isVisible={isStudiesRemovalModalVisible}
        onDismiss={() => setIsStudiesRemovalModalVisible(false)}
      />

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
          helper={
            "Try to include sponsor name or protocol ID in the keywords for more specific results"
          }
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
      </div>

      <div className="border-b-[1px] border-b-slate-200 my-6" />

      {studiesData && studiesData?.length > 0 ? (
        <div>
          <div className="flex flex-wrap flex-col sm:flex-row space-x-0 sm:space-x-6 mb-3 sm:items-center">
            <div className="flex space-x-6 items-center">
              <p className="font-semibold">Saved Studies: </p>

              <FormInput
                register={registerSavedStudyInternalIds}
                type="checkbox"
                label="Select all"
                name="selectAllSavedStudies"
                id="selectAllSavedStudies"
              />
            </div>
            {selectedSavedStudyInternalIds.length > 0 && (
              <div
                className="flex text-red-500 space-x-1 mt-2 sm:mt-0 justify-center cursor-pointer p-2 rounded-lg border-[1px] border-red-500"
                onClick={() => setIsStudiesRemovalModalVisible(true)}
              >
                <p>
                  Remove {selectedSavedStudyInternalIds.length} selected items
                </p>
              </div>
            )}
          </div>

          {studiesData.map((study, i) => {
            return (
              <SingleStudy
                study={study}
                isEditable
                isSelected={selectedSavedStudyInternalIds.includes(study.id)}
                handleSelectStudy={handleUpdateSelectedSavedStudyInternalIds}
                key={i}
                i={i}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col w-full mt-10">
          <img
            className="self-center"
            src={imgNoData}
            alt="not-found"
            width={130}
            height={130}
          />
          <p className="text-center mt-4 font-semibold">No studies found</p>
          <p className="text-center mt-2">
            There are no saved studies in the profile yet
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchStudiesForm;
