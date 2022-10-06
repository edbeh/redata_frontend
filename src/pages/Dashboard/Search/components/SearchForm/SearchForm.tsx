/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormInput, FormSelect, Button } from "components";
import { getSearchParams, getYupIsRequired } from "utils";
import { ImgMagnifyingGlassOutline } from "assets";
import { validationMessages } from "const";

import { ISearchFormFields } from "./SearchForm.model";
import { schema } from "./SearchForm.schema";
import { searchInOptions } from "./SearchForm.util";

interface SearchFormProps {
  useFormReturn: UseFormReturn<ISearchFormFields>;
}

const SearchForm = ({ useFormReturn }: SearchFormProps) => {
  const navigate = useNavigate();
  const searchParams = getSearchParams() as any;
  const q = searchParams?.q;
  const searchIn = searchParams?.searchIn;

  // *Form
  const {
    register,
    control,
    formState: { errors: formErrors },
    watch,
    setError,
    setValue,
  } = useFormReturn;

  const searchInValue = watch("searchIn");

  // *Methods
  const handleUpdateUrlQueryString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = watch();

    if (!data.q)
      return setError("q", {
        message: validationMessages.require.generic,
      });
    if (!data?.searchIn)
      return setError("searchIn", {
        message: validationMessages.validate.searchIn,
      });

    navigate({
      pathname: "/search",
      search: `?q=${data.q}&searchIn=${data.searchIn.id}`,
    });
  };

  // *Effects
  useEffect(() => {
    if (q) setValue("q", q);
    if (searchIn) {
      const option = searchInOptions.find((option) => option.id === searchIn);
      if (option) setValue("searchIn", option);
    }

    if (q && searchIn) {
      console.log(
        JSON.stringify(
          {
            q,
            category: searchIn,
          },
          null,
          2
        )
      );
    }
  }, [q, searchIn]);

  // *JSX
  return (
    <div>
      <form
        noValidate
        onSubmit={handleUpdateUrlQueryString}
        className="flex flex-col w-full space-y-4"
      >
        <FormSelect
          control={control}
          options={searchInOptions || []}
          placeholder=""
          id="searchIn"
          name="searchIn"
          label="Search by"
          required={getYupIsRequired(schema, "searchIn")}
          error={formErrors?.searchIn?.message as string}
          helper={
            searchInValue?.id === "medicalKeywords"
              ? "Search for keywords in sub-specialties, research interests & patient populations"
              : searchInValue?.id === "publications"
              ? "Search for keywords in publications"
              : ""
          }
        />

        <div className="flex space-x-3">
          <FormInput
            register={register}
            id="q"
            name="q"
            label={
              searchInValue?.id === "researcherName"
                ? "Partial or full name"
                : "Keyword"
            }
            error={formErrors?.q?.message as string}
            required={getYupIsRequired(schema, "q")}
            autoComplete="off"
          />

          <div className="max-w-[50px] mt-6">
            <Button variant="primary">
              <ImgMagnifyingGlassOutline
                width={20}
                height={20}
                className="text-white"
              />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
