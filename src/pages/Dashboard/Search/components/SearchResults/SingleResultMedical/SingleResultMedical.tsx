import { useNavigate } from "react-router-dom";

import { imgNoProfilePic } from "assets";
import { Badge } from "components";
import { GetSearchMedicalKeywords } from "api/models";

interface SingleResultMedicalProps {
  q: string;
  data: GetSearchMedicalKeywords.Datum[];
}

const SingleResultMedical = ({ q, data }: SingleResultMedicalProps) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map((result) => {
        return (
          <div className="flex flex-col sm:flex-row px-0 sm:px-0 py-6 border-b-[1px] space-y-2 sm:space-y-0 border-b-gray-200 space-x-0 sm:space-x-6">
            <div
              className="flex flex-row sm:flex-col space-y-2 space-x-4 sm:space-x-0 mb-3 sm:mb-0 w-full sm:min-w-[150px] sm:max-w-[150px] cursor-pointer"
              onClick={() => navigate(`/profile/${result.id}`)}
            >
              <img
                src={imgNoProfilePic}
                alt="profile"
                className="self-center object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
              />
              <div>
                <p className="sm:text-center font-semibold line-clamp-1 text-blue-500">
                  {result.name}
                </p>
                <p className="sm:text-center line-clamp-1">Mock department</p>
                <p className="sm:text-center line-clamp-1">
                  {result.institution.name}
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-4">
                <div>
                  <p className="font-semibold text-sm">Sub-Specialties:</p>
                  <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
                    {result?.specialties?.map((specialty) => {
                      return (
                        <>
                          <Badge
                            text={specialty}
                            variant="small"
                            isBolded={
                              specialty?.toLowerCase() === q?.toLowerCase()
                            }
                          />
                        </>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm">Research Interests:</p>
                  <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
                    {result?.researchInterests?.map((interest) => {
                      return (
                        <>
                          <Badge
                            text={interest}
                            variant="small"
                            isBolded={
                              interest?.toLowerCase() === q?.toLowerCase()
                            }
                          />
                        </>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm">Patient Populations:</p>
                  <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
                    {result?.patientPools?.map((pool) => {
                      return (
                        <>
                          <Badge
                            text={pool}
                            variant="small"
                            isBolded={pool?.toLowerCase() === q?.toLowerCase()}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleResultMedical;
