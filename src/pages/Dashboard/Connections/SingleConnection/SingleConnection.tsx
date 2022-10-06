import { useNavigate } from "react-router-dom";

import { imgNoProfilePic } from "assets";
import { Button, Card } from "components";
import { GetConnections } from "api/models";

interface SingleConnectionProps {
  connection: GetConnections.Datum;
}

const SingleConnection = ({ connection }: SingleConnectionProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 sm:items-center max-w-full">
        <div className="flex space-x-4 sm:space-x-8 items-center">
          <img
            src={imgNoProfilePic}
            alt="profile"
            className="object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />

          <div className="flex-1">
            <p className="font-semibold">{connection.name}</p>
            <p className="line-clamp-1">{connection.designation?.name}</p>
            <p className="line-clamp-1">{connection.department?.name}</p>
            <p className="line-clamp-1">{connection?.institution?.name}</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 self-center w-[180px] sm:w-[120px]">
          <Button onClick={() => navigate(`/profile/${connection?.id}`)}>
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SingleConnection;
