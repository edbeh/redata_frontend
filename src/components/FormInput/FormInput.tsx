import PulseLoader from "react-spinners/PulseLoader";

import { ImgCheckCircleOutline } from "assets";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  key?: string;
  register: any;
  suggestion?: string; // display a suggestion string below input box
  error?: string;
  label?: string;
  helper?: string; // text displayed below the input for extra info
  id: string;
  isLoading?: boolean;
  rightCheck?: boolean;
}

const FormInput = ({
  register,
  suggestion,
  error,
  label,
  helper,
  id,
  isLoading,
  rightCheck,
  ...rest
}: FormInputProps) => {
  const { type, required } = rest;

  if (type === "checkbox") {
    return (
      <div className="flex space-x-2">
        <input id={id} {...register(id)} {...rest} />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full">
      <label htmlFor={id} className="flex">
        {label}
        {required && <span className="text-red">*</span>}
      </label>

      <input
        id={id}
        className={`mt-0 border-[1px] border-borderGray 
                    outline-none p-[10px] pb-[11px] rounded-md overflow-hidden 
                    text-ellipsis disabled:opacity-50 disabled:cursor-not-allowed hover:ring-1
                    ${
                      error
                        ? "border-red hover:ring-red hover:border-red"
                        : "hover:border-primary-600 hover:ring-primary-600"
                    } ${rightCheck ? "pr-[35px]" : ""}`}
        {...register(id)}
        {...rest}
      />

      {isLoading && (
        <PulseLoader
          className={`absolute right-4 ${
            label || required ? "top-11" : "top-5"
          }`}
          size={4}
          color="#D8D8D8"
          speedMultiplier={0.7}
        />
      )}

      {!isLoading && rightCheck && (
        <ImgCheckCircleOutline
          className={`absolute right-[8px] top-[30px] text-green-600 
                      ${label || required ? "top-11" : "top-5"}`}
          width={25}
          height={25}
        />
      )}

      {suggestion && (
        <div className="mt-[2px] text-sm text-green-600">{suggestion}</div>
      )}
      {error && <div className="mt-[2px] text-sm text-red">{error}</div>}
      {helper && (
        <div className="mt-[2px] text-slate-500 text-sm">{helper}</div>
      )}
    </div>
  );
};

export default FormInput;
