interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  error?: string;
  label?: string;
  id: string;
}

const FormInput = ({ register, error, label, id, ...rest }: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="flex flex-col text-[15px]">
        {label}
      </label>

      <input
        id={id}
        className={`mt-0 border-[1px] border-borderGray 
        outline-none p-[10px] rounded-md overflow-hidden 
        text-ellipsis text-sm disabled:opacity-50 disabled:cursor-not-allowed
        hover:border-primary-600 hover:ring-1 hover:ring-primary-600
        ${error ? "border-red" : ""}`}
        {...register(id)}
        {...rest}
      />

      {error && <div className="text-sm mt-[2px] text-red">{error}</div>}
    </div>
  );
};

export default FormInput;
