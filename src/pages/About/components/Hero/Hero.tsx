import { useEffect, useState } from "react";

import { Button } from "components";
import { navigateToSubdomain } from "utils";

const Hero = () => {
  const [activeSpan, setActiveSpan] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpan((current) => {
        return current >= 2 ? 0 : current + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center pt-[70px] lg:pt-[15vh]">
      <div className="flex flex-col md:flex-row items-center w-full justify-center ">
        <span
          className={`relative -mt-6 text-[3.8rem] lg:text-[5.0rem] font-extrabold bg-clip-text 
          tracking-tight transition-all duration-1000 ${
            activeSpan === 0 ? "text-white" : "text-black"
          }`}
        >
          Consolidate.
          <span
            className={`absolute left-0 top-0 text-[3.8rem] lg:text-[5.0rem] font-extrabold text-transparent bg-clip-text 
          tracking-tight from-gradientBlueStart to-gradientBlueEnd bg-gradient-to-r transition-all duration-1000 ${
            activeSpan === 0 ? "opacity-100" : "opacity-0"
          }`}
          >
            Consolidate.
          </span>
        </span>

        <span
          className={`relative -mt-6 text-[3.8rem] lg:text-[5.0rem] font-extrabold bg-clip-text 
           tracking-tight transition-all duration-1000 ${
             activeSpan === 1 ? "text-white" : "text-black"
           }`}
        >
          Connect.
          <span
            className={`absolute left-0 top-0 text-[3.8rem] lg:text-[5.0rem] font-extrabold text-transparent bg-clip-text 
          tracking-tight from-gradientPinkStart to-gradientPinkEnd bg-gradient-to-r transition-all duration-1000 ${
            activeSpan === 1 ? "opacity-100" : "opacity-0"
          }`}
          >
            Connect.
          </span>
        </span>

        <span
          className={`relative -mt-6 text-[3.8rem] lg:text-[5.0rem] font-extrabold bg-clip-text 
          tracking-tight transition-all duration-1000 ${
            activeSpan === 2 ? "text-white" : "text-black"
          }`}
        >
          Collab.
          <span
            className={`absolute left-0 top-0 text-[3.8rem] lg:text-[5.0rem] font-extrabold text-transparent bg-clip-text 
          tracking-tight from-gradientOrangeStart to-gradientOrangeEnd bg-gradient-to-r transition-all duration-1000 ${
            activeSpan === 2 ? "opacity-100" : "opacity-0"
          }`}
          >
            Collab.
          </span>
        </span>
      </div>

      <p className="text-xl leading-relaxed lg:text-2xl lg:leading-relaxed mt-6 max-w-[800px] text-center w-full m-auto ">
        ReData is a platform for clinical investigators to consolidate their
        research portfolio and connect with like-minded peers
      </p>

      <div className="mt-[30px] lg:mt-[50px] w-[200px]">
        <a
          href={navigateToSubdomain("app", "/sample")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary">View Sample Profile</Button>
        </a>
      </div>

      <p className="mt-[80px] lg:mt-[120px] text-sm font-bold text-gray-500 tracking-wider">
        HERE'S A QUICK TOUR
      </p>
    </div>
  );
};

export default Hero;
