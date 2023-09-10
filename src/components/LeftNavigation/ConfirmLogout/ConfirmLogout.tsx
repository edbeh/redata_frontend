import { imgExitDoor } from "assets";
import { Modal, Button } from "components";
import { signOut } from "utils";

interface ConfirmLogoutProps {
  isVisible: boolean;
  handleDismiss: () => void;
}

const ConfirmLogout = ({ isVisible, handleDismiss }: ConfirmLogoutProps) => {
  return (
    <Modal
      content={
        <div className="flex flex-col my-2">
          <img
            className="self-center"
            src={imgExitDoor}
            alt="confirm-logout"
            width={200}
            height={200}
          />
          <p className="self-center my-4 text-black">
            Are you sure you want to logout?
          </p>
          <div className="w-[220px] self-center">
            <Button onClick={signOut}>Confirm Logout</Button>
          </div>
        </div>
      }
      isVisible={isVisible}
      onDismiss={handleDismiss}
    />
  );
};

export default ConfirmLogout;
