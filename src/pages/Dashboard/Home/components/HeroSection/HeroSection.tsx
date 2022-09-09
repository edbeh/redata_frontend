import { Card } from "components";

import { imgJohnDoe } from "assets";

const HeroSection = () => {
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center sm:items-start flex-col sm:flex-row p-2 space-x-0 sm:space-x-6">
          <img
            src={imgJohnDoe}
            alt="profile"
            className="object-cover min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />

          <div className="text-center sm:text-left mt-3 sm:mt-0">
            <h1 className="text-2xl font-semibold">Dr. John Doe</h1>
            <p className="pt-1">Senior Consultant</p>

            <p className="pt-2 sm:pt-4 text-base">
              Renal Department, Sample General Hospital
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSection;
