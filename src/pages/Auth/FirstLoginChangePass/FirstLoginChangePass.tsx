import FirstLoginChangePassForm from "./FirstLoginChangePassForm/FirstLoginChangePassForm";
import Splash from "../Splash/Splash";

const FirstLoginChangePass = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <FirstLoginChangePassForm />
      <Splash />
    </div>
  );
};

export default FirstLoginChangePass;
