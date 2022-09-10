import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Card } from "components";

const PublicationsSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <div>
          <Skeleton count={5} height={18} className="mb-2" />
        </div>
      </Card>
    </div>
  );
};

export default PublicationsSectionLoading;
