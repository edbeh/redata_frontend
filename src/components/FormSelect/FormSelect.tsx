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
  error?: string;
  options: FormSelectModel[];
  isSearchable?: boolean;
  isClearable?: boolean;
}

const FormSelect = ({
  error,
  label,
  id,
  name,
  control,
  options,
  isSearchable,
  isClearable,
  ...rest
}: FormSelectProps) => {
  const { placeholder = "Select value", disabled, required } = rest;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="flex text-[15px]">
        {label}
        {required && <span className="text-red">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            styles={selectStyles}
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isClearable={isClearable}
            isDisabled={disabled}
            {...field}
          />
        )}
      />

      {error && <div className="text-sm mt-[2px] text-red">{error}</div>}
    </div>
  );
};

export default FormSelect;
