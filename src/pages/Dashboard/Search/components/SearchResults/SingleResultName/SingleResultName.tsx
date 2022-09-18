import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { imgJohnDoe } from "assets";

const SingleResultName = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 sm:items-center py-6 border-b-[1px] border-b-gray-200 max-w-full"
      onClick={() => navigate("/profile/12")}
    >
      <div className="flex space-x-4 items-center">
        <img
          src={imgJohnDoe}
          alt="profile"
          className="self-center object-cover mx-1 sm:mx-10 min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
        />

        <div className="flex-1">
          <p className="font-semibold">John Doe</p>
          <p>Associate Consultant</p>
          <p>Hematology</p>
          <p>Singapore General Hospital (SGH)</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 self-center w-[180px] sm:w-[120px]">
        <Button>View Profile</Button>
      </div>
    </div>
  );
};

export default SingleResultName;
