import Skeleton from "react-loading-skeleton";

import { Card } from "components";

const CommonSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <div className="mb-5">
          <Skeleton width={180} height={30} />
        </div>

        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <div>
            <Skeleton width={120} height={35} borderRadius={6} />
          </div>
          <div>
            <Skeleton width={80} height={35} borderRadius={6} />
          </div>
          <div>
            <Skeleton width={180} height={35} borderRadius={6} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommonSectionLoading;
