import { Card } from "components";

import SinglePublicationLoading from "../SinglePublication/SinglePublication.loading";

const PublicationsSectionLoading = () => {
  return (
    <div className="w-full">
      <Card>
        <div className="flex flex-col space-y-6">
          <SinglePublicationLoading />
          <SinglePublicationLoading />
          <SinglePublicationLoading />
        </div>
      </Card>
    </div>
  );
};

export default PublicationsSectionLoading;
