import { Card } from "components";
import { imgNotFound } from "assets";

import { Publication } from "api/models";

import SinglePublication from "../SinglePublication/SinglePublication";
import SinglePublicationLoading from "../SinglePublication/SinglePublication.loading";

interface PublicationsSectionProps {
  data: Publication[];
  namesToBold: string[];
}

const PublicationsSection = ({
  data,
  namesToBold,
}: PublicationsSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        {data.length === 0 ? (
          <div className="flex flex-col w-full my-10">
            <img
              className="self-center"
              src={imgNotFound}
              alt="not-found"
              width={180}
              height={180}
            />
            <p className="self-center">
              There are no saved publications in your profile yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col w-full ml-[-10px] sm:mt-2 sm:ml-0">
            {data.map((publication, i) => {
              return (
                <SinglePublication
                  publication={publication}
                  namesToBold={namesToBold}
                  key={i}
                  i={i}
                />
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default PublicationsSection;
