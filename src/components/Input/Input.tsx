interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  suggestion?: string;
  helper?: string;
}

const Input = ({
  id,
  label,
  required,
  error,
  suggestion,
  helper,
  ...rest
}: InputProps) => {
  return (
    <div className="relative flex flex-col w-full">
      <label htmlFor={id} className="flex">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={id}
        className={`mt-0 border-[1px] border-borderGray 
                  outline-none p-[10px] pb-[11px] rounded-md overflow-hidden 
                  text-ellipsis disabled:opacity-50 disabled:cursor-not-allowed hover:ring-1
                  ${
                    error
                      ? "border-red-500 hover:ring-red-500 hover:border-red-500"
                      : "hover:border-primary-600 hover:ring-primary-600"
                  } `}
        {...rest}
      />

      {suggestion && (
        <div className="mt-[2px] text-sm text-green-600">{suggestion}</div>
      )}
      {error && <div className="mt-[2px] text-sm text-red-500">{error}</div>}
      {helper && (
        <div className="mt-[2px] text-slate-500 text-sm">{helper}</div>
      )}
    </div>
  );
};

export default Input;
