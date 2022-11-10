import { FeatureModel } from "pages/About/About.model";

interface FeatureProps extends FeatureModel {}

const Feature = ({
  number,
  tagline,
  title,
  gradientStart,
  gradientEnd,
  content,
}: FeatureProps) => {
  return (
    <section className="w-full flex flex-col items-center mt-10 mb-[150px] lg:mb-[200px]">
      <span
        className={`h-[100px] text-white bg-black w-[1px] -mb-8 from-${gradientStart} to-white  bg-gradient-radial`}
      />
      <div
        className={`flex justify-center items-center min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] from-${gradientStart} to-${gradientEnd} bg-gradient-to-r rounded-full`}
      >
        <span className="font-bold text-lg text-white">{number}</span>
      </div>

      <p
        className={`mt-4 font-bold text-transparent bg-clip-text text-[2.0rem] lg:text-[2.5rem] tracking-tight from-${gradientStart} to-${gradientEnd} bg-gradient-to-r`}
      >
        {tagline}
      </p>

      <p className="mt-4 text-center font-bold text-[2.5rem] lg:text-[3.0rem] tracking-tight">
        {title}
      </p>

      {content}
    </section>
  );
};

export default Feature;
