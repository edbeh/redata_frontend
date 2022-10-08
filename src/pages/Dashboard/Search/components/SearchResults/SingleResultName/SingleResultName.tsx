import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { imgNoProfilePic } from "assets";
import { GetSearchUsers } from "api/models";

interface SingleSearchResultNameProps {
  data: GetSearchUsers.Datum[];
}

const SingleResultName = ({ data }: SingleSearchResultNameProps) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map((result) => {
        return (
          <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 sm:items-center py-6 border-b-[1px] border-b-gray-200 max-w-full">
            <div className="flex space-x-4 items-center">
              <img
                src={result.image || imgNoProfilePic}
                alt="profile"
                className="self-center object-cover mx-1 sm:mx-10 min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
              />

              <div className="flex-1">
                <p className="font-semibold">{result?.name}</p>
                <p className="line-clamp-1">{result?.designation?.name}</p>
                <p className="line-clamp-1">{result?.department?.name}</p>
                <p className="line-clamp-1">{result?.institution?.name}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 self-center w-[180px] sm:w-[120px]">
              <Button
                variant="secondary"
                onClick={() => navigate(`/profile/${result.id}`)}
              >
                View Profile
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleResultName;
