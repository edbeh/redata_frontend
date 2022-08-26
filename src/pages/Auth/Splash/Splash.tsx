const Splash = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-b from-[#05195c] to-[#0f80dd] p-[80px]">
      <div className="flex flex-col justify-center max-w-[500px] space-y-12">
        <h1 className="text-5xl font-bold leading-tight tracking-wide text-white">
          CONNECTING <br />
          THE CURIOUS
        </h1>

        <p className="text-xl leading-[2rem] text-white">
          A platform for reseachers to showcase their research portfolio and
          connect with like-minded peers
        </p>
      </div>
    </div>
  );
};

export default Splash;
