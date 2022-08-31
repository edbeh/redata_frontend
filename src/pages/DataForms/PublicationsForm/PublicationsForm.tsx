/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormInput, FullScreenLoader } from "components";
import { useFetchMe } from "api/hooks";
import { PUBMED_BASE_URL, PUBMED_URL_SUFFIX } from "const";

import { IPubmedNamesFormFields } from "./PublicationsForm.model";
import { pubmedNamesSchema } from "./PublicationsForm.schema";

interface PublicationsFormProps {
  onSuccessCallback?: () => void;
}

const PublicationsForm = React.forwardRef<
  HTMLButtonElement,
  PublicationsFormProps
>(({ onSuccessCallback }, ref) => {
  const axiosInstance = axios.create({
    baseURL: "",
  });

  // *Form
  const {
    register: registerPubmedNames,
    handleSubmit: handleSubmitPubmedNames,
    setValue: setValuePubmedNames,
  } = useForm<IPubmedNamesFormFields>({
    resolver: yupResolver(pubmedNamesSchema),
    mode: "onChange",
  });

  // *Queries
  const { data: fetchMeData, isLoading: fetchMeIsLoading } = useFetchMe();

  // *Methods
  const handleSubmitFormPubmedNames = async (data: IPubmedNamesFormFields) => {
    const endpoints = data.pubmed_names?.split(",").map((name) => {
      const updatedName = name.replace(" ", "%20").trim();
      return `${PUBMED_BASE_URL}${updatedName}${PUBMED_URL_SUFFIX}`;
    });

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((data) => console.log(data));
  };

  // *Effects
  useEffect(() => {
    if (fetchMeData) {
      const pubmedNames = fetchMeData.data?.data?.pubmedNames?.join(", ");
      setValuePubmedNames("pubmed_names", pubmedNames);
    }
  }, [fetchMeData]);

  //  *JSX
  return (
    <div className="flex flex-col">
      {fetchMeIsLoading && <FullScreenLoader />}

      <form
        noValidate
        onSubmit={handleSubmitPubmedNames(handleSubmitFormPubmedNames)}
      >
        <div className="flex space-x-4">
          <FormInput
            register={registerPubmedNames}
            label="PubMed Names or Aliases"
            placeholder="Alice ST, ST Alice, Alice"
            helper="Please separate your pubmed names with comma"
            name="pubmed_names"
            id="pubmed_names"
          />
          <button
            onClick={() => {}}
            className={`font-semibold rounded-lg text-primary-500 hover:text-primary-200 disabled:cursor-not-allowed disabled:text-disabled mt-4}`}
          >
            Search PubMed
          </button>
        </div>
      </form>
    </div>
  );
});

export default PublicationsForm;
