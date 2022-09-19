import { useNavigate } from "react-router-dom";

import { imgJohnDoe } from "assets";
import { Button, Card } from "components";

const SingleConnection = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 sm:items-center max-w-full">
        <div className="flex space-x-8 items-center">
          <img
            src={imgJohnDoe}
            alt="profile"
            className="object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />

          <div className="flex-1">
            <p className="font-semibold">John Doe</p>
            <p className="line-clamp-1">Associate Consultant</p>
            <p className="line-clamp-1">Hematology</p>
            <p className="line-clamp-1">Singapore General Hospital (SGH)</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 self-center w-[180px] sm:w-[120px]">
          <Button onClick={() => navigate("/profile/12")}>View Profile</Button>
        </div>
      </div>
    </Card>
  );
};

export default SingleConnection;
