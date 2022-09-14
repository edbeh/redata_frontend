interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  error?: string;
  label?: string;
  id: string;
}

const FormTextArea = ({
  register,
  error,
  label,
  id,
  ...rest
}: FormInputProps) => {
  const { required } = rest;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="flex">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        id={id}
        className={`mt-0 border-[1px] border-borderGray 
          outline-none p-[10px] rounded-md overflow-hidden 
          text-ellipsis disabled:opacity-50 disabled:cursor-not-allowed
          hover:border-primary-600 hover:ring-1 hover:ring-primary-600
          ${error ? "border-red hover:ring-red hover:border-red" : ""}`}
        {...register(id)}
        {...rest}
      />

      {error && <div className="mt-[2px] text-red-500">{error}</div>}
    </div>
  );
};

export default FormTextArea;
