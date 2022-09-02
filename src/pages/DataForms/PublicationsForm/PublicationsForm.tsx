/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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

import { IPubMedNamesFormFields, Hash } from "./PublicationsForm.model";
import { pubMedNamesSchema } from "./PublicationsForm.schema";
import { findMaxOccurrence } from "./PublicationsForm.util";
import PublicationCard from "./PublicationCard/PublicationCard";

interface PublicationsFormProps {
  onSuccessCallback?: () => void;
}

const PublicationsForm = React.forwardRef<
  HTMLButtonElement,
  PublicationsFormProps
>(({ onSuccessCallback }, ref) => {
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
  } = useForm<IPubMedNamesFormFields>({
    resolver: yupResolver(pubMedNamesSchema),
    mode: "onChange",
  });

  const pubMedNames = watchPubMedNames("pubMed_names");

  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const {
    data: fetchPubMedByNamesData,
    isLoading: fetchPubMedByNamesIsLoading,
  } = useFetchPubMedByNames(pubMedNamesToSearch, !!pubMedNamesToSearch);

  const { data: fetchPubMedByIdsData, isLoading: fetchPubMedByIdsIsLoading } =
    useFetchPubMedByIds(pubMedIdsToSearch, pubMedIdsToSearch.length > 0);

  // *Methods
  const handleSubmitFormPubMedNames = async (data: IPubMedNamesFormFields) => {
    setPubMedNamesToSearch(data.pubMed_names);
  };

  const handleUpdateSelectedPubMedIds = (id: string) => {
    const updatedIds = selectedPubMedIds.includes(id)
      ? selectedPubMedIds.filter((pubMedId) => pubMedId !== id)
      : [...selectedPubMedIds, id];
    return setSelectedPubMedIds(updatedIds);
  };

  const handleSubmitSelectedPubMedIds = () => {
    const payload = {
      source: "pubmed",
      pubmed_ids: selectedPubMedIds,
    };
    console.log(payload);
  };

  // *Effects
  useEffect(() => {
    if (fetchMeData) {
      const pubMedNames = fetchMeData.data?.data?.pubMedNames?.join(", ");
      setValuePubMedNames("pubMed_names", pubMedNames);
    }
  }, [fetchMeData]);

  useEffect(() => {
    if (fetchPubMedByNamesData) {
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

      // bold pubMed name with most occurrence
      // const hash: Hash = {};
      // fetchPubMedByIdsData.map((publication) => {
      //   const authors = publication.authors;
      //   return authors.map((author) => {
      //     if (!hash[author.name]) {
      //       return (hash[author.name] = 1);
      //     } else {
      //       return (hash[author.name] = hash[author.name] + 1);
      //     }
      //   });
      // });

      // const namesToBold = findMaxOccurrence(hash);
      // setNamesToBold(namesToBold);
    }
  }, [fetchPubMedByIdsData]);

  // *JSX
  return (
    <div className="flex flex-col">
      {(fetchMeIsLoading ||
        fetchPubMedByIdsIsLoading ||
        fetchPubMedByNamesIsLoading) && <FullScreenLoader />}

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
                  name="select_all"
                  id="select_all"
                />
              </div>

              <Button onClick={handleSubmitSelectedPubMedIds}>
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
        <div className="flex flex-col items-center space-x-0 space-y-4 sm:space-x-4 sm:space-y-0 sm:flex-row">
          <FormInput
            register={registerPubMedNames}
            label="PubMed Names or Aliases"
            placeholder="Kim S, Kim SA"
            helper="Please separate your pubMed names with comma"
            name="pubMed_names"
            id="pubMed_names"
            autoComplete="off"
          />

          <div>
            <Button
              variant="secondary"
              onClick={() => {}}
              disabled={pubMedNames === ""}
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
