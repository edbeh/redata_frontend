import Skeleton from "react-loading-skeleton";

import { Card } from "components";

const HeroSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <div className="flex items-center sm:items-start flex-col sm:flex-row p-2 space-x-0 sm:space-x-6">
          <Skeleton width={100} height={100} circle />

          <div className="text-center sm:text-left mt-3 sm:mt-0">
            <Skeleton width={140} height={30} />
            <Skeleton width={120} height={20} />

            <div className="pt-2 sm:pt-4">
              <Skeleton width={280} height={20} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HeroSectionLoading;
