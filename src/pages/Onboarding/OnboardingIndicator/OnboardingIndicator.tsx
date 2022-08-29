interface OnboardingIndicatorProps {
  number: number;
  description: string;
  index: number;
  isActive: boolean;
}

const OnboardingIndicator = ({
  number,
  description,
  index,
  isActive,
}: OnboardingIndicatorProps) => {
  return (
    <div className="relative flex items-center mb-5 space-x-2">
      {index > 0 ? (
        <div
          className={`border-l-2 ${
            isActive ? "border-primary-400" : "border-slate-400"
          } h-[18px] absolute bottom-[24px] left-[18.5px] z-0`}
        />
      ) : (
        <div className="h-[18px] absolute bottom-[24px] left-[18.5px] z-0" />
      )}
      <p
        className={`flex justify-center border-2 rounded-full w-7 h-7 align-center ${
          isActive
            ? "border-primary-400 text-primary-400"
            : "border-slate-400 text-slate-400"
        } z-1`}
      >
        {number}
      </p>
      <p
        className={`text-sm font-medium ${
          isActive ? "text-primary-400" : "text-slate-400"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default OnboardingIndicator;
