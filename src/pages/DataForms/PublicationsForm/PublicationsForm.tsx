/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
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
import {
  BASE_PUBMED_API_URL,
  SEARCH_PUBMED_NAMES_PREFIX,
  SEARCH_PUBMED_IDS_PREFIX,
  SEARCH_PUBMED_NAMES_SUFFIX,
  SEARCH_PUBMED_IDS_SUFFIX,
} from "api/endpoints";
import { GetPubmedByNames, GetPubmedByIds } from "api/models";

import { IPubmedNamesFormFields, Hash } from "./PublicationsForm.model";
import { pubmedNamesSchema } from "./PublicationsForm.schema";
import { findMaxOccurrence } from "./PublicationsForm.util";
import PublicationCard from "./components/PublicationCard/PublicationCard";

interface PublicationsFormProps {
  onSuccessCallback?: () => void;
}

const PublicationsForm = React.forwardRef<
  HTMLButtonElement,
  PublicationsFormProps
>(({ onSuccessCallback }, ref) => {
  const [pubmedNamesToSearch, setPubmedNamesToSearch] = useState<string>("");
  const [pubmedIdsToSearch, setPubmedIdsToSearch] = useState<string[]>([]);
  const [publicationsFromPubmed, setPublicationsFromPubmed] = useState<
    GetPubmedByIds.Publication[]
  >([]);
  const [isPublicationsModalVisible, setIsPublicationsModalVisible] =
    useState<boolean>(false);
  const [namesToBold, setNamesToBold] = useState<string[]>([]);

  // *Form
  const {
    register: registerPubmedNames,
    handleSubmit: handleSubmitPubmedNames,
    setValue: setValuePubmedNames,
    watch: watchPubmedNames,
  } = useForm<IPubmedNamesFormFields>({
    resolver: yupResolver(pubmedNamesSchema),
    mode: "onChange",
  });

  const pubmedNames = watchPubmedNames("pubmed_names");

  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  const { data: fetchPubMedByNamesData } = useFetchPubMedByNames(
    pubmedNamesToSearch,
    !!pubmedNamesToSearch
  );

  const { data: fetchPubMedByIdsData } = useFetchPubMedByIds(
    pubmedIdsToSearch,
    pubmedIdsToSearch.length > 0
  );

  // *Methods
  const handleSubmitFormPubmedNames = async (data: IPubmedNamesFormFields) => {
    setPubmedNamesToSearch(data.pubmed_names);
  };

  // *Effects
  useEffect(() => {
    if (fetchMeData) {
      const pubmedNames = fetchMeData.data?.data?.pubmedNames?.join(", ");
      setValuePubmedNames("pubmed_names", pubmedNames);
    }
  }, [fetchMeData]);

  useEffect(() => {
    if (fetchPubMedByNamesData) {
      setPubmedIdsToSearch(fetchPubMedByNamesData);
    }
  }, [fetchPubMedByNamesData]);

  useEffect(() => {
    if (fetchPubMedByIdsData) {
      setPublicationsFromPubmed(fetchPubMedByIdsData);

      if (fetchPubMedByIdsData.length > 0) {
        setIsPublicationsModalVisible(true);
      }

      const hash: Hash = {};
      fetchPubMedByIdsData.map((publication) => {
        const authors = publication.authors;
        return authors.map((author) => {
          if (!hash[author.name]) {
            return (hash[author.name] = 1);
          } else {
            return (hash[author.name] = hash[author.name] + 1);
          }
        });
      });
      const namesToBold = findMaxOccurrence(hash);
      setNamesToBold(namesToBold);
    }
  }, [fetchPubMedByIdsData]);

  //  *JSX
  return (
    <div className="flex flex-col">
      {fetchMeIsLoading && <FullScreenLoader />}

      <Modal
        title="Add Publications"
        content={
          <div className="flex flex-col mb-2 space-y-4">
            <p className="mt-2">
              Select publications you'd like to add to your profile <br />
              (publications already in your profile are disabled):
            </p>

            {publicationsFromPubmed.map((publication, i) => {
              return (
                <PublicationCard
                  index={i}
                  namesToBold={namesToBold}
                  publication={publication}
                  handleSelectPublication={() => {}}
                  isSelected
                  key={publication.uid}
                />
              );
            })}
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
        onSubmit={handleSubmitPubmedNames(handleSubmitFormPubmedNames)}
      >
        <div className="flex flex-col items-center space-x-4 space-y-4 sm:space-y-0 sm:flex-row">
          <FormInput
            register={registerPubmedNames}
            label="PubMed Names or Aliases"
            placeholder="Kim S, Kim SA"
            helper="Please separate your pubmed names with comma"
            name="pubmed_names"
            id="pubmed_names"
            autoComplete="off"
          />

          <div>
            <Button
              variant="secondary"
              onClick={() => {}}
              disabled={pubmedNames === ""}
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
