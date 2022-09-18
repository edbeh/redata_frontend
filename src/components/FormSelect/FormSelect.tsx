import Select from "react-select";
import { Controller } from "react-hook-form";

import { FormSelectModel } from "models";

import { selectStyles } from "./FormSelect.styles";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: any;
  id: string;
  name: string;
  label?: string;
  helper?: string; // text displayed below the input for extra info
  error?: string;
  options: FormSelectModel[];
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  closeMenuOnSelect?: boolean;
  blurInputOnSelect?: boolean;
}

const FormSelect = ({
  error,
  label,
  id,
  name,
  helper,
  control,
  options,
  isSearchable,
  isClearable,
  isLoading,
  isMulti = false,
  closeMenuOnSelect = true,
  blurInputOnSelect = true,
  ...rest
}: FormSelectProps) => {
  const { placeholder = "Select value", disabled, required } = rest;

  return (
    <div className="flex flex-col w-full hover:cursor-pointer">
      <label htmlFor={id} className="flex">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            styles={selectStyles}
            className={`border-[1px] border-borderGray rounded-lg hover:ring-1
             ${
               error
                 ? "border-red hover:ring-red hover:border-red "
                 : "hover:border-primary-600 hover:ring-primary-600"
             }`}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isDisabled={disabled}
            isLoading={isLoading}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            isMulti={isMulti}
            closeMenuOnSelect={closeMenuOnSelect}
            blurInputOnSelect={blurInputOnSelect}
            hideSelectedOptions={false}
            {...field}
          />
        )}
      />

      {error && <div className="mt-[2px] text-red-500 text-sm">{error}</div>}
      {helper && (
        <div className="mt-[2px] text-slate-500 text-sm">{helper}</div>
      )}
    </div>
  );
};

export default FormSelect;
