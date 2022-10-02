import Skeleton from "react-loading-skeleton";

import { Card } from "components";

const SingleConnectionLoading = () => {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 sm:items-center max-w-full">
        <div className="flex space-x-4 sm:space-x-8 items-center">
          <Skeleton height={80} width={80} circle />

          <div className="flex-1">
            <Skeleton height={20} className="w-[70px]" />
            <Skeleton height={16} className="w-[130px]" />
            <Skeleton height={16} className="w-[100px]" />
            <Skeleton height={16} className="w-[200px]" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleConnectionLoading;
