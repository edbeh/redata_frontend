import { Card } from "components";

import { imgNoProfilePic } from "assets";
import { GetMe, GetUserById } from "api/models";

interface HeroSectionProps {
  data: GetMe.Data | GetUserById.Data;
  withProfileDetails?: boolean;
}

const HeroSection = ({
  data,
  withProfileDetails = false,
}: HeroSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center sm:items-start flex-col sm:flex-row p-2 space-x-0 sm:space-x-6">
          <img
            src={data.image || imgNoProfilePic}
            alt="profile"
            className="object-cover min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />

          <div className="text-center sm:text-left mt-3 sm:mt-0">
            <h1 className="text-2xl font-semibold">{data?.name}</h1>
            <p className="pt-1">{data?.designation?.name}</p>

            <p className="pt-2 sm:pt-4 text-base">
              {`${data?.department?.name}, ${data?.institution?.name}`}
            </p>
          </div>
        </div>

        {withProfileDetails && (
          <div className="flex flex-col mt-8 space-y-4">
            <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <p className="font-semibold basis-1/3 min-w-[125px]">
                Full Name:
              </p>
              <p className="basis-2/3">{data?.name}</p>
            </div>

            <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <p className="font-semibold basis-1/3 min-w-[125px]">Email:</p>
              <p className="basis-2/3">{data?.email}</p>
            </div>

            {/* {data?.mcrNumber && (
              <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
                <p className="font-semibold basis-1/3 min-w-[125px]">
                  MCR No.:
                </p>
                <p className="basis-2/3">{data.mcrNumber}</p>
              </div>
            )} */}

            {data?.primarySpecialty && (
              <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
                <p className="font-semibold basis-1/3 min-w-[125px]">
                  Primary Subspecialty:
                </p>
                <p className="basis-2/3">
                  {data.primarySpecialty?.name || "No data"}
                </p>
              </div>
            )}

            {data?.otherSpecialties && (
              <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
                <p className="font-semibold basis-1/3 min-w-[125px]">
                  Other Subspecialties:
                </p>
                <p className="basis-2/3">
                  {data.otherSpecialties
                    ?.map((speciality) => speciality.name)
                    ?.join(", ") || "No data"}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HeroSection;
