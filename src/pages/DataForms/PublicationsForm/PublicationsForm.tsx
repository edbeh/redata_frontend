/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { imgNotFound } from "assets";
import { FormInput, FullScreenLoader, Button, Modal } from "components";
import {
  useFetchMe,
  useFetchPubMedByIds,
  useFetchPubMedByNames,
} from "api/hooks";
import { GetPubMedByIds } from "api/models";
import { PUBMED_NAMES_API_KEY } from "api/keys";

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
  const fetchPubMedByNamesQuery: any = queryClient.getQueryData([
    PUBMED_NAMES_API_KEY,
    pubMedNamesToSearch,
  ]);

  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const {
    data: fetchPubMedByNamesData,
    isLoading: fetchPubMedByNamesIsLoading,
    isFetching: fetchPubMedByNamesIsFetching,
  } = useFetchPubMedByNames(pubMedNamesToSearch, !!pubMedNamesToSearch);

  const { data: fetchPubMedByIdsData, isLoading: fetchPubMedByIdsIsLoading } =
    useFetchPubMedByIds(pubMedIdsToSearch, pubMedIdsToSearch.length > 0);

  // *Methods
  const handleSubmitFormPubMedNames = async (data: IPubMedNamesFormFields) => {
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
      pubmedIds: selectedPubMedIds,
    };
    console.log(payload);
  };

  // *Effects
  useEffect(() => {
    handleSelectAllPubMedIds();
  }, [selectAll]);

  useEffect(() => {
    if (fetchMeData) {
      const pubMedNames = fetchMeData.data?.data?.pubMedNames?.join(", ");
      setValuePubMedNames("pubMedNames", pubMedNames);
    }
  }, [fetchMeData]);

  useEffect(() => {
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
  }, [fetchPubMedByNamesData]);

  useEffect(() => {
    if (fetchPubMedByIdsData) {
      setPublicationsFromPubMed(fetchPubMedByIdsData);

      if (fetchPubMedByIdsData.length > 0) {
        setIsPublicationsModalVisible(true);
      }
    }
  }, [fetchPubMedByIdsData]);

  // *JSX
  return (
    <div className="flex flex-col">
      {(fetchMeIsLoading ||
        fetchPubMedByIdsIsLoading ||
        fetchPubMedByNamesIsLoading ||
        fetchPubMedByNamesIsFetching) && <FullScreenLoader />}

      <Modal
        title="Add Publications"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <p className="mt-2">
              Select publications you'd like to add to your profile <br />
              (publications already in your profile are disabled):
            </p>

            {publicationsFromPubMed.map((publication, i) => {
              return (
                <PublicationCard
                  index={i}
                  namesToBold={namesToBold}
                  publication={publication}
                  handleSelectPublication={handleUpdateSelectedPubMedIds}
                  isSelected={selectedPubMedIds.includes(publication.uid)}
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

              <Button onClick={handleSubmitSelectedPubMedIds}>
                Add to Profile
              </Button>
            </div>
          </div>
        }
        isVisible={
          isPublicationsModalVisible &&
          !fetchPubMedByIdsIsLoading &&
          !fetchPubMedByNamesIsLoading
        }
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
        <div className="flex flex-col items-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row">
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

          <div>
            <Button
              variant="secondary"
              disabled={pubMedNames === "" || !pubmedNamesIsValid}
            >
              Search PubMed
            </Button>
          </div>
        </div>
      </form>

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
    </div>
  );
});

export default PublicationsForm;
