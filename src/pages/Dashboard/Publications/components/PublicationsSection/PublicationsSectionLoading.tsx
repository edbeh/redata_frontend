import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card } from "components";

const PublicationsSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <h2 className="mb-5 text-xl font-semibold text-gray-700">
          My Publications
        </h2>

        <div>
          <Skeleton count={3} height={18} className="mb-2" />
        </div>
      </Card>
    </div>
  );
};

export default PublicationsSectionLoading;
