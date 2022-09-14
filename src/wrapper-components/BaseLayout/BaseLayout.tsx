import { useEffect, useState } from "react";

import { LeftNavigation, MobileLeftNavigation } from "components";
import { ImgBars4Outline } from "assets";
import { useScrollDirection } from "hooks";

interface BaseLayoutProps {
  withLeftNavigation?: boolean;
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  withLeftNavigation,
  children,
}) => {
  const scrollDirection = useScrollDirection();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState<boolean>(false);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      {withLeftNavigation && (
        <>
          <div className="fixed w-full h-[13rem] -z-10 bg-gradient-to-r from-cyan-500 to-primary-600" />
          <div className="fixed w-full h-[calc(100vh-13rem)] bg-slate-50 top-[13rem] -z-10" />
        </>
      )}
      <div
        className={`flex max-w-screen-xl m-auto px-6 pt-6 md:px-8 min-h-[100vh]`}
      >
        {withLeftNavigation && (
          <>
            <div className="min-w-0 hidden md:min-w-[220px] md:block">
              <LeftNavigation />
            </div>

            <div className="z-50 block md:hidden">
              <MobileLeftNavigation
                isMobileNavVisible={isMobileNavVisible}
                setIsMobileNavVisible={setIsMobileNavVisible}
              />
            </div>
          </>
        )}
        {children}

        {withLeftNavigation && (
          <div
            className={`md:hidden fixed p-2 bg-white rounded cursor-pointer top-4 right-4 justify-self-end 
                        transition-all duration-250
                          ${
                            scrollDirection === "down"
                              ? "opacity-0"
                              : "opacity-100"
                          }`}
            onClick={() => setIsMobileNavVisible(true)}
          >
            <ImgBars4Outline width={20} height={20} />
          </div>
        )}
      </div>
    </>
  );
};

export default BaseLayout;
