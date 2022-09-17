import { useNavigate } from "react-router-dom";

import { imgJohnDoe, imgStockProfilePic } from "assets";
import { Badge } from "components";

interface SingleSearchResultProps {
  i: number;
}

const SingleSearchResult = ({ i }: SingleSearchResultProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col sm:flex-row px-0 sm:px-0 py-6 border-b-[1px] space-y-2 sm:space-y-0 border-b-gray-200 space-x-0 sm:space-x-6 cursor-pointer"
      onClick={() => navigate("/profile/12")}
    >
      <div className="flex flex-row sm:flex-col space-y-2 space-x-4 sm:space-x-0 mb-3 sm:mb-0 w-full sm:min-w-[150px] sm:max-w-[150px]">
        <img
          src={i === 0 ? imgStockProfilePic : imgJohnDoe}
          alt="profile"
          className="self-center object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
        />
        <div className="overflow-hidden text-ellipsis whitespace-nowrap">
          <p className="text-left sm:text-center font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {i === 0 ? "Steven" : "John Doe"}
          </p>
          <p className="text-left sm:text-center overflow-hidden text-ellipsis whitespace-nowrap">
            Hematology
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-col space-y-4">
          {/* <div>
            <p className="font-semibold text-sm">Sub-Specialties:</p>
            <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
              <Badge
                text={i === 0 ? "Diabetes" : "Kidney Transplant"}
                variant="small"
                isBolded={i === 0}
              />
              <Badge text="Transplant Immunosuppression" variant="small" />
            </div>
          </div> */}

          <div>
            <p className="font-semibold text-sm">Research Interests:</p>
            <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
              <Badge text="Kidney Transplant" variant="small" />
              <Badge text="Immunosuppression" variant="small" />
              <Badge text="Post-transplant Immunosuppression" variant="small" />
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm">Patient Populations:</p>
            <div className="flex flex-wrap items-start justify-start gap-y-2 gap-x-4">
              <Badge text="Kidney Failure" variant="small" />
              <Badge
                text={i === 0 ? "Dialysis" : "Diabetes"}
                variant="small"
                isBolded={i === 1}
              />
              {i === 1 && <Badge text="Dialysis" variant="small" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSearchResult;
