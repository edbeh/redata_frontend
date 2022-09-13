/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";

import { imgNotFound } from "assets";
import { FormInput, FullScreenLoader, Button, Modal } from "components";
import {
  useFetchAllPublications,
  useFetchMe,
  useFetchPubMedByIds,
  useFetchPubMedByNames,
  useSubmitPublicationsFromPubMed,
} from "api/hooks";
import { PUBLICATIONS_API_KEY } from "api/keys";
import { GetPubMedByIds } from "api/models";
import { SinglePublication } from "pages/Dashboard/Publications/components";

import { IPubMedNamesFormFields } from "./PublicationsForm.model";
import { pubMedNamesSchema } from "./PublicationsForm.schema";
import PublicationCard from "./PublicationCard/PublicationCard";

interface PublicationsFormProps {
  onSuccessCallback?: () => void;
}

const PublicationsForm = React.forwardRef<
  HTMLButtonElement,
  PublicationsFormProps
>(({ onSuccessCallback }, ref) => {
  const queryClient = useQueryClient();

  const [pubMedNamesToSearch, setPubMedNamesToSearch] = useState<string>("");
  const [pubMedIdsToSearch, setPubMedIdsToSearch] = useState<string[]>([]);
  const [namesToBold, setNamesToBold] = useState<string[]>([]);
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

  // *Form
  const {
    register: registerPubMedNames,
    handleSubmit: handleSubmitPubMedNames,
    setValue: setValuePubMedNames,
    watch: watchPubMedNames,
    formState: { errors: pubMedNamesErrors, isValid: pubmedNamesIsValid },
  } = useForm<IPubMedNamesFormFields>({
    resolver: yupResolver(pubMedNamesSchema),
    mode: "onChange",
  });

  const pubMedNames = watchPubMedNames("pubMedNames");
  const selectAll = watchPubMedNames("selectAll");

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
    if (selectAll) {
      const ids = publicationsFromPubMed.map((publication) => {
        return publication.uid;
      });
      setSelectedPubMedIds(ids);
    } else {
      setSelectedPubMedIds([]);
    }
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
  }, [selectAll]);

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
      setNamesToBold(fetchPubMedByNamesData.namesToBold);
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

  console.log("savedIds", savedPublicationIds);
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

            {publicationsFromPubMed.map((publication, i) => {
              const disabled = savedPublicationIds[publication.uid] === 1;

              return (
                <PublicationCard
                  index={i}
                  namesToBold={namesToBold}
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
                  name="selectAll"
                  id="selectAll"
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

      <p className="mb-6 -mt-3">
        Search PubMed with your aliases to add publications to your profile.
      </p>
      <form
        noValidate
        onSubmit={handleSubmitPubMedNames(handleSubmitFormPubMedNames)}
      >
        <div className="flex flex-col space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row">
          <FormInput
            register={registerPubMedNames}
            label="PubMed Names or Aliases"
            placeholder="Doe John, Doe J"
            helper="Please separate your pubMed names with comma"
            name="pubMedNames"
            id="pubMedNames"
            autoComplete="off"
            error={pubMedNamesErrors.pubMedNames?.message}
          />

          <div className="pt-0 sm:pt-6">
            <Button
              type="submit"
              variant="secondary"
              disabled={pubMedNames === "" || !pubmedNamesIsValid}
            >
              Search PubMed
            </Button>
          </div>
        </div>
      </form>

      {publicationsData ? (
        <div className="mt-6">
          <p className="mb-2 font-semibold">Saved publications: </p>
          {publicationsData.map((pub, i) => {
            return (
              <SinglePublication publication={pub} i={i} namesToBold={[]} />
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
