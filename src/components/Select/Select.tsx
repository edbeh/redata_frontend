import React, { useState, memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Combobox } from "@headlessui/react";

import { ImgChevronDownOutline } from "assets";
import { FormSelectModel } from "models";

import Virtualized from "./Virtualized/Virtualized";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: any;
  id: string;
  name: string;
  label?: string;
  helper?: string; // text displayed below the input for extra info
  error?: string;
  options: FormSelectModel[];
  isLoading?: boolean;
}

const Select = memo(
  ({
    control,
    id,
    name,
    label,
    helper,
    error,
    options,
    isLoading,
    ...rest
  }: SelectProps) => {
    const { placeholder = "Select value", disabled, required } = rest;

    const [query, setQuery] = useState<string>("");
    // const [selectedOption, setSelectedOption] =
    //   useState<FormSelectModel>(undefined);

    const filteredOptionList = query
      ? options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        )
      : options;

    // *Effects
    // useEffect(() => {
    //   if (selected) {
    //     return setQuery(selected.name);
    //   }
    // }, [selected]);

    // *JSX
    return (
      <div className="flex flex-col w-full hover:cursor-pointer">
        <label htmlFor={id} className="flex">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            console.log("field", field);

            return (
              <Combobox
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
              >
                <div className="relative">
                  <Combobox.Button className="w-full outline-none">
                    <Combobox.Input
                      displayValue={(option: FormSelectModel) => option?.name}
                      placeholder={placeholder}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setQuery(e.currentTarget.value);
                        field.onChange(e);
                      }}
                      onBlur={field.onBlur}
                      autoComplete="off"
                      className={`w-full min-h-[42px] py-3 pl-3 pr-4 border-[1px] rounded-lg 
                                  hover:cursor-pointer border-borderGray hover:ring-1
                                  ${
                                    error
                                      ? "border-red hover:ring-red hover:border-red"
                                      : "hover:border-primary-600 hover:ring-primary-600"
                                  }`}
                    />

                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <ImgChevronDownOutline width={18} height={18} />
                    </span>
                  </Combobox.Button>

                  <Combobox.Options className="absolute inset-x-0 top-[42px] right-0 z-20 bg-white border-borderGray mt-2 max-h-[244px] py-1 w-fit min-w-full overflow-auto no-scrollbar rounded-lg border-[1px]">
                    {filteredOptionList?.length === 0 ? (
                      <p>No results</p>
                    ) : (
                      <Virtualized options={filteredOptionList} />
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            );
          }}
        />

        {error && <div className="mt-[2px] text-red-500 text-sm">{error}</div>}
        {helper && (
          <div className="mt-[2px] text-slate-500 text-sm">{helper}</div>
        )}
      </div>
    );
  }
);

export default Select;
