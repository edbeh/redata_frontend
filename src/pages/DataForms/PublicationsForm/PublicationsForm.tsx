/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

import { imgNotFound, ImgXCircleOutline, imgDeleteFiles } from "assets";
import { FormInput, FullScreenLoader, Button, Modal } from "components";
import {
  useFetchAllPublications,
  useFetchMe,
  useFetchPubMedByIds,
  useFetchPubMedByNames,
  useRemovePublications,
  useSubmitPublicationsFromPubMed,
} from "api/hooks";
import { PUBLICATIONS_API_KEY } from "api/keys";
import { GetPubMedByIds } from "api/models";
import { SinglePublication } from "pages/Dashboard/Publications/components";

import {
  IPubMedNamesFormFields,
  ISavedPublicationsFormFields,
} from "./PublicationsForm.model";
import PublicationCard from "./PublicationCard/PublicationCard";

interface PublicationsFormProps {
  /** callback if api call is successful */
  onSuccessCallback?: () => void;

  /** display loading state parent component */
  setIsSubmissionLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublicationsForm = React.forwardRef<
  HTMLButtonElement,
  PublicationsFormProps
>(({ onSuccessCallback }, ref) => {
  const queryClient = useQueryClient();

  const [pubMedNamesToSearch, setPubMedNamesToSearch] = useState<string>("");
  const [pubMedIdsToSearch, setPubMedIdsToSearch] = useState<string[]>([]);
  const [publicationsFromPubMed, setPublicationsFromPubMed] = useState<
    GetPubMedByIds.Publication[]
  >([]);

  const [isPublicationsModalVisible, setIsPublicationsModalVisible] =
    useState<boolean>(false);
  const [selectedPubMedIds, setSelectedPubMedIds] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [savedPublicationIds, setSavedPublicationIds] = useState<{
    [key: string]: number;
  }>({});
  const [selectedSavedPublicationIds, setSelectedSavedPublicationIds] =
    useState<string[]>([]);
  const [
    isPublicationsRemovalModalVisible,
    setIsPublicationsRemovalModalVisible,
  ] = useState<boolean>(false);

  // *Form
  const {
    register: registerPubMedNames,
    handleSubmit: handleSubmitPubMedNames,
    setValue: setValuePubMedNames,
    watch: watchPubMedNames,
  } = useForm<IPubMedNamesFormFields>({
    mode: "onChange",
  });

  const {
    register: registerSavedPublicationIds,
    handleSubmit: handleSubmitSavedPublicationIds,
    watch: watchSavedPublicationIds,
  } = useForm<ISavedPublicationsFormFields>({
    mode: "onChange",
  });

  const selectAllPublications = watchPubMedNames("selectAllPublications");
  const selectAllSavedPublications = watchSavedPublicationIds(
    "selectAllSavedPublications"
  );

  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const {
    data: fetchPubMedByNamesData,
    isLoading: fetchPubMedByNamesIsLoading,
    isFetching: fetchPubMedByNamesIsFetching,
  } = useFetchPubMedByNames(pubMedNamesToSearch, !!pubMedNamesToSearch);

  const {
    data: fetchPubMedByIdsData,
    isLoading: fetchPubMedByIdsIsLoading,
    isFetching: fetchPubMedByIdsIsFetching,
  } = useFetchPubMedByIds(pubMedIdsToSearch, pubMedIdsToSearch.length > 0);

  const {
    data: fetchAllPublicationsData,
    isLoading: fetchAllPublicationsIsLoading,
    isFetching: fetchAllPublicationsIsFetching,
  } = useFetchAllPublications();

  const publicationsData = fetchAllPublicationsData?.data?.data;

  const {
    data: submitPublicationsFromPubMedData,
    mutate: mutatePublicationsFromPubMed,
    isLoading: submitPublicationsFromPubMedIsLoading,
  } = useSubmitPublicationsFromPubMed(() => {
    queryClient.invalidateQueries(PUBLICATIONS_API_KEY);
  });

  const {
    mutate: mutateSavedPublications,
    isLoading: removePublicationsIsLoading,
  } = useRemovePublications(() => {
    setIsPublicationsRemovalModalVisible(false);
    setSelectedSavedPublicationIds([]);
    queryClient.invalidateQueries(PUBLICATIONS_API_KEY);
  });

  // *Methods
  const handleSubmitFormPubMedNames = async (data: IPubMedNamesFormFields) => {
    setRefresh((refresh) => !refresh);
    setPubMedNamesToSearch(data.pubMedNames);
  };

  const handleUpdateSelectedPubMedIds = (id: string) => {
    const updatedIds = selectedPubMedIds.includes(id)
      ? selectedPubMedIds.filter((pubMedId) => pubMedId !== id)
      : [...selectedPubMedIds, id];
    return setSelectedPubMedIds(updatedIds);
  };

  const handleSelectAllPubMedIds = () => {
    if (selectAllPublications) {
      const ids = publicationsFromPubMed.map((publication) => {
        return publication.uid;
      });
      setSelectedPubMedIds(ids);
    } else {
      setSelectedPubMedIds([]);
    }
  };

  const handleUpdateSelectedSavedPublications = (id: string) => {
    const updatedIds = selectedSavedPublicationIds.includes(id)
      ? selectedSavedPublicationIds.filter((externalId) => externalId !== id)
      : [...selectedSavedPublicationIds, id];
    return setSelectedSavedPublicationIds(updatedIds);
  };

  const handleSelectAllSavedPublicationIds = () => {
    if (!publicationsData) return;

    if (selectAllSavedPublications) {
      const ids = publicationsData.map((publication) => publication.externalId);
      setSelectedSavedPublicationIds(ids);
    } else {
      setSelectedSavedPublicationIds([]);
    }
  };

  const handleSubmitSelectedSavedPublications = () => {
    const payload = {
      ids: selectedSavedPublicationIds,
    };

    mutateSavedPublications(payload);
  };

  const handleSubmitSelectedPubMedIds = () => {
    const payload = {
      source: "pubmed",
      ids: selectedPubMedIds,
    };

    mutatePublicationsFromPubMed(payload);
  };

  // *Effects
  useEffect(() => {
    handleSelectAllPubMedIds();
  }, [selectAllPublications]);

  useEffect(() => {
    handleSelectAllSavedPublicationIds();
  }, [selectAllSavedPublications]);

  useEffect(() => {
    if (fetchMeData) {
      const pubMedNames = fetchMeData.data?.data?.pubmedNames?.join(", ");
      setValuePubMedNames("pubMedNames", pubMedNames);
    }
  }, [fetchMeData]);

  useEffect(() => {
    if (fetchPubMedByNamesIsLoading || fetchPubMedByNamesIsFetching) return;

    if (fetchPubMedByNamesData) {
      if (fetchPubMedByNamesData.ids?.length === 0) {
        toast.error(
          `There are no publications associated with this name in PubMed.`
        );
        return;
      }

      setPubMedIdsToSearch(fetchPubMedByNamesData.ids);
    }
  }, [
    fetchPubMedByNamesData,
    fetchPubMedByNamesIsLoading,
    fetchPubMedByNamesIsFetching,
  ]);

  useEffect(() => {
    if (fetchPubMedByNamesIsLoading || fetchPubMedByIdsIsLoading) return;
    if (fetchPubMedByNamesIsFetching || fetchPubMedByIdsIsFetching) return;

    if (fetchPubMedByIdsData) {
      setPublicationsFromPubMed(fetchPubMedByIdsData);

      if (fetchPubMedByIdsData.length > 0) {
        setIsPublicationsModalVisible(true);
      }
    }
  }, [
    refresh,
    fetchPubMedByIdsData,
    fetchPubMedByNamesIsLoading,
    fetchPubMedByIdsIsLoading,
    fetchPubMedByNamesIsFetching,
    fetchPubMedByIdsIsFetching,
  ]);

  useEffect(() => {
    if (submitPublicationsFromPubMedData) {
      setIsPublicationsModalVisible(false);
    }
  }, [submitPublicationsFromPubMedData]);

  useEffect(() => {
    // collect all saved publication keys in a hash for O(1) access
    if (publicationsData) {
      const object: { [key: string]: number } = {};
      publicationsData.map((publication) => {
        const externalId = publication.externalId;
        return (object[externalId] = 1);
      });
      setSavedPublicationIds(object);
    }
  }, [publicationsData]);

  console.log("publicationsData", publicationsData);

  // *JSX
  return (
    <div className="flex flex-col">
      {(fetchMeIsLoading ||
        fetchPubMedByIdsIsLoading ||
        fetchPubMedByNamesIsLoading ||
        fetchPubMedByNamesIsFetching ||
        fetchAllPublicationsIsLoading ||
        fetchAllPublicationsIsFetching) && <FullScreenLoader />}

      <Modal
        title="Add Publications"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <p className="mt-2">
              Select publications you'd like to add to your profile.
              Publications already in your profile are disabled.
            </p>

            {fetchMeData &&
              publicationsFromPubMed.map((publication, i) => {
                const disabled = savedPublicationIds[publication.uid] === 1;

                return (
                  <PublicationCard
                    index={i}
                    namesToBold={fetchMeData.data.data.correctedPubmedNames}
                    publication={publication}
                    handleSelectPublication={handleUpdateSelectedPubMedIds}
                    isSelected={selectedPubMedIds.includes(publication.uid)}
                    isDisabled={disabled}
                    key={publication.uid}
                  />
                );
              })}

            <div className="sticky flex h-[60px] bg-white -bottom-8 items-center justify-apart">
              <div className="w-full">
                <FormInput
                  register={registerPubMedNames}
                  type="checkbox"
                  label="Select all"
                  name="selectAllPublications"
                  id="selectAllPublications"
                />
              </div>

              <Button
                onClick={handleSubmitSelectedPubMedIds}
                isLoading={submitPublicationsFromPubMedIsLoading}
              >
                Add to Profile
              </Button>
            </div>
          </div>
        }
        isVisible={isPublicationsModalVisible}
        onDismiss={() => {
          setIsPublicationsModalVisible(false);
        }}
      />

      <Modal
        title="Remove Publications"
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
                You are about to remove {selectedSavedPublicationIds.length}{" "}
                publications. Are you sure you want to continue?
              </p>
              <p className="mt-2">
                You can still save these publications from PubMed again if you
                want to restore them in the future.
              </p>
            </div>

            <div className="self-center w-full">
              <Button
                variant="red"
                onClick={handleSubmitSavedPublicationIds(
                  handleSubmitSelectedSavedPublications
                )}
                isLoading={removePublicationsIsLoading}
              >
                Remove Publications
              </Button>
            </div>
          </div>
        }
        isVisible={isPublicationsRemovalModalVisible}
        onDismiss={() => setIsPublicationsRemovalModalVisible(false)}
      />

      <p className="mb-6">
        Search PubMed with your aliases to save publications to your profile.
      </p>
      <form
        noValidate
        onSubmit={handleSubmitPubMedNames(handleSubmitFormPubMedNames)}
      >
        <div className="flex flex-col space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row sm:items-center justify-between">
          <div>
            <p className="font-semibold capitalize">
              {fetchMeData?.data?.data?.pubmedNames?.join(", ")}
            </p>
            <a href="/onboarding/1" className="text-blue-500 hover:underline">
              Edit your PubMed names
            </a>
          </div>

          <div>
            <Button variant="secondary">Search PubMed</Button>
          </div>
        </div>
      </form>

      {fetchMeData && publicationsData && publicationsData?.length > 0 ? (
        <div className="mt-8">
          <div className="flex flex-wrap flex-col sm:flex-row space-x-0 sm:space-x-6 mb-3 sm:items-center">
            <div className="flex space-x-6 items-center">
              <p className="font-semibold">Saved Publications: </p>

              <FormInput
                register={registerSavedPublicationIds}
                type="checkbox"
                label="Select all"
                name="selectAllSavedPublications"
                id="selectAllSavedPublications"
              />
            </div>
            {selectedSavedPublicationIds.length > 0 && (
              <div
                className="flex space-x-1 items-center cursor-pointer"
                onClick={() => setIsPublicationsRemovalModalVisible(true)}
              >
                <ImgXCircleOutline
                  width={20}
                  height={20}
                  className="text-red-500"
                />
                <p className="text-red-500">
                  Remove {selectedSavedPublicationIds.length} selected items
                </p>
              </div>
            )}
          </div>

          {publicationsData.map((pub, i) => {
            return (
              <SinglePublication
                publication={pub}
                namesToBold={fetchMeData.data.data.correctedPubmedNames}
                isEditable
                isSelected={selectedSavedPublicationIds.includes(
                  pub.externalId
                )}
                handleSelectPublication={handleUpdateSelectedSavedPublications}
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
            src={imgNotFound}
            alt="not-found"
            width={200}
            height={200}
          />
          <p className="self-center">
            There are no publications in your profile yet
          </p>
        </div>
      )}
    </div>
  );
});

export default PublicationsForm;
