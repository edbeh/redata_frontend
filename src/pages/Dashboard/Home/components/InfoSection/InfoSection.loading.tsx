import Skeleton from "react-loading-skeleton";

import { Card } from "components";

const InfoSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <div className="mb-5">
          <Skeleton width={100} height={30} />
        </div>

        <Skeleton width={250} height={20} />

        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="basis-1/3 min-w-[125px]">
              <Skeleton width={90} height={20} />
            </div>
            <div className="basis-2/3">
              <Skeleton width={120} height={20} />
            </div>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="basis-1/3 min-w-[125px]">
              <Skeleton width={60} height={20} />
            </div>
            <div className="basis-2/3">
              <Skeleton width={160} height={20} />
            </div>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="basis-1/3 min-w-[125px]">
              <Skeleton width={80} height={20} />
            </div>
            <div className="basis-2/3">
              <Skeleton width={100} height={20} />
            </div>
          </div>

          <div className="flex flex-col justify-between space-x-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="basis-1/3 min-w-[125px]">
              <Skeleton width={170} height={20} />
            </div>
            <div className="basis-2/3">
              <Skeleton width={110} height={20} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InfoSectionLoading;
