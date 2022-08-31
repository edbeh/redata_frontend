import PulseLoader from "react-spinners/PulseLoader";

const FullScreenLoader = () => {
  return (
    <div className="w-[100vw] h-[100vh] opacity-50 top-0 left-0 bg-white fixed z-50 flex justify-center items-center">
      <PulseLoader size={20} color="black" speedMultiplier={0.7} />
    </div>
  );
};

export default FullScreenLoader;
