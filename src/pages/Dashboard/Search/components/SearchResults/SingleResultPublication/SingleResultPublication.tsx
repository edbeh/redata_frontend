import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { imgNoProfilePic } from "assets";
import { Highlighted, Badge } from "components";
import { GetSearchPublications } from "api/models";

interface SingleResultPublicationProps {
  q: string;
  data: GetSearchPublications.Datum[];
}

const SingleResultPublication = ({ q, data }: SingleResultPublicationProps) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map((result) => {
        return (
          <div
            className="flex flex-col sm:flex-row px-0 sm:px-0 py-6 border-b-[1px] space-y-2 sm:space-y-0 border-b-gray-200 space-x-0 sm:space-x-6"
            key={result.id}
          >
            <div className="flex flex-row sm:flex-col space-y-2 space-x-4 sm:space-x-0 mb-3 sm:mb-0 w-full sm:min-w-[150px] sm:max-w-[150px]">
              <img
                src={result.image || imgNoProfilePic}
                alt="profile"
                className="self-center object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
              />
              <div>
                <p className="sm:text-center font-semibold line-clamp-1">
                  {result?.name}
                </p>
                <p className="sm:text-center line-clamp-1">
                  {result?.department?.name}
                </p>
                <p className="sm:text-center line-clamp-1">
                  {result?.institution?.name}
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-4">
                <div>
                  <Highlighted text={result?.publicationTitle} highlight={q} />

                  <p className="text-slate-500 line-clamp-2">
                    {result?.publicationAuthors?.join(", ")}
                  </p>

                  <p className="text-green-700">
                    {`${result?.publicationSource}. ${
                      result?.publicationVolume
                    }(${result?.publicationIssue}):${
                      result.publicationPages
                    }. Published ${dayjs(result.publicationPublishedAt).format(
                      "YYYY MMM"
                    )}`}
                  </p>
                </div>

                {result?.publicationCount - 1 > 0 && (
                  <div className="flex">
                    <Badge
                      variant="small"
                      text={`...and ${result?.publicationCount - 1} more`}
                      onClickBadge={() =>
                        navigate(`/profile/${result?.id}?highlight=${q}`)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleResultPublication;
