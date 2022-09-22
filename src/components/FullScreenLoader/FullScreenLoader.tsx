import { ImgCircleLoadingOutline } from "assets";

const FullScreenLoader = () => {
  return (
    <div className="w-[100vw] h-[100vh] opacity-50 top-0 left-0 bg-white fixed z-40 flex justify-center items-center">
      <ImgCircleLoadingOutline
        width={40}
        height={40}
        className="animate-spin text-primary-500"
      />
    </div>
  );
};

export default FullScreenLoader;
