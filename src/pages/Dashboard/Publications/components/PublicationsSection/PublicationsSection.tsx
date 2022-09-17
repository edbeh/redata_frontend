import { Card } from "components";
import { imgNoData } from "assets";
import { Publication } from "api/models";

import SinglePublication from "../SinglePublication/SinglePublication";

interface PublicationsSectionProps {
  data: Publication[];
  namesToBold: string[];
  withHeader?: boolean;
}

const PublicationsSection = ({
  data,
  namesToBold,
  withHeader = false,
}: PublicationsSectionProps) => {
  return (
    <div className="w-full">
      <Card>
        {withHeader && (
          <h2 className="mb-5 text-xl font-semibold text-gray-700">
            Publications
          </h2>
        )}

        {data.length === 0 ? (
          <div className="flex flex-col w-full my-10">
            <img
              className="self-center"
              src={imgNoData}
              alt="not-found"
              width={130}
              height={130}
            />
            <p className="text-center font-semibold mt-4">
              No publications found
            </p>
            <p className="text-center mt-2">
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
