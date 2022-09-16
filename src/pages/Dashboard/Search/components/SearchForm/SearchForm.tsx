import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { FormInput, FormSelect, Button } from "components";
import { getYupIsRequired } from "utils";

import { ISearchFormFields } from "./SearchForm.model";
import { schema } from "./SearchForm.schema";
import { SearchInOptions, updateUrlQueryString } from "./SearchForm.util";
import { validationMessages } from "const";

interface SearchFormProps {
  useFormReturn: UseFormReturn<ISearchFormFields>;
}

const SearchForm = ({ useFormReturn }: SearchFormProps) => {
  const navigate = useNavigate();

  // *Form
  const {
    register,
    control,
    formState: { errors: formErrors },
    watch,
    setError,
  } = useFormReturn;

  // *Methods
  const handleUpdateUrlQueryString = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = watch();

    if (!data.keyword)
      return setError("keyword", {
        message: validationMessages.require.keyword,
      });
    if (!data?.searchIn || data?.searchIn?.length === 0)
      return setError("searchIn", {
        message: validationMessages.validate.searchIn,
      });

    updateUrlQueryString(data, navigate);
  };

  // *JSX
  return (
    <div className="flex flex-col w-full space-y-4">
      <form noValidate onSubmit={handleUpdateUrlQueryString}>
        <FormInput
          register={register}
          id="keyword"
          name="keyword"
          label="Keyword"
          error={formErrors?.keyword?.message as string}
          required={getYupIsRequired(schema, "keyword")}
          autoComplete="off"
        />

        <FormSelect
          control={control}
          options={SearchInOptions || []}
          placeholder=""
          id="searchIn"
          name="searchIn"
          label="Search In"
          isMulti
          closeMenuOnSelect={false}
          blurInputOnSelect={false}
          // error={formErrors?.institution?.message as string}
          required={getYupIsRequired(schema, "searchIn")}
          // isLoading={fetchMetadataInstitutions?.isLoading}
          error={formErrors?.searchIn?.message as string}
        />

        <div className="w-full sm:w-[150px] self-end pt-4 px-1">
          <Button variant="secondary">Search</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
