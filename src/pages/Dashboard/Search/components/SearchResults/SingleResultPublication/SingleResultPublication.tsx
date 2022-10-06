import { useNavigate } from "react-router-dom";

import { imgNoProfilePic } from "assets";
import { Highlighted, Badge } from "components";

const SingleResultPublication = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row px-0 sm:px-0 py-6 border-b-[1px] space-y-2 sm:space-y-0 border-b-gray-200 space-x-0 sm:space-x-6">
      <div className="flex flex-row sm:flex-col space-y-2 space-x-4 sm:space-x-0 mb-3 sm:mb-0 w-full sm:min-w-[150px] sm:max-w-[150px]">
        <img
          src={imgNoProfilePic}
          alt="profile"
          className="self-center object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
        />
        <div>
          <p className="sm:text-center font-semibold line-clamp-1">John Doe</p>
          <p className="sm:text-center line-clamp-1">Hematology</p>
          <p className="sm:text-center line-clamp-1">
            Singapore General Hospital (SGH)
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-4">
          <div>
            <Highlighted
              text="Relationship between local weather, air pollution and hospital
              attendances for asthma in children: Time stratified analysis of
              12,002 cases."
              highlight="asthma"
            />

            <p className="text-slate-500 line-clamp-2">
              Choo KJL, Ho AFW, Gui H, Tay PJM, Lee HY, Koh MS, Earnest A, Pek
              PP, Liu N, Chong SL, Pang J, Ong MEH
            </p>

            <p className="text-green-700">
              Clin Exp Allergy. 52(1):180-182. Published 2022 Jan
            </p>
          </div>

          <div className="flex">
            <Badge
              variant="small"
              text="...and 1 more"
              onClickBadge={() => navigate("/profile/12?highlight=asthma")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResultPublication;
