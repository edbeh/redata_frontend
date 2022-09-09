import { Card } from "components";
import { imgNotFound } from "assets";

import SinglePublication from "../SinglePublication/SinglePublication";
import { Publication } from "api/models";

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
        <h2 className="mb-5 text-xl font-semibold text-gray-700">
          My Publications
        </h2>

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
              There are no publications in your profile yet
            </p>
          </div>
        ) : (
          data.map((publication, i) => {
            return (
              <SinglePublication
                key={i}
                publication={publication}
                i={i}
                namesToBold={namesToBold}
              />
            );
          })
        )}
      </Card>
    </div>
  );
};

export default PublicationsSection;
