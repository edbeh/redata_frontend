import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImgArrowUturnLeftOutline, ImgBars4Outline } from "assets";
import { AdminLeftNavigation, AdminLeftNavigationMobile } from "components";
import { getAdminNameLocalStorage } from "utils";

interface AdminBaseLayoutProps {
  title: string;
  children: React.ReactNode;
  withBackNavigation?: boolean;
  backNavigationCallback?: () => void;
}

const AdminBaseLayout: React.FC<AdminBaseLayoutProps> = ({
  title,
  children,
  withBackNavigation,
  backNavigationCallback,
}) => {
  const navigate = useNavigate();
  const [isMobileNavVisible, setIsMobileNavVisible] = useState<boolean>(false);
  const [adminName, setAdminName] = useState<string>("");

  //* Effects
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    const adminName = getAdminNameLocalStorage();
    setAdminName(adminName || "");
  }, []);

  //* JSX
  return (
    <div className="flex min-h-[100vh] w-full">
      <div className="z-50 block lg:hidden">
        <AdminLeftNavigationMobile
          isMobileNavVisible={isMobileNavVisible}
          setIsMobileNavVisible={setIsMobileNavVisible}
        />
      </div>
      <div className="fixed hidden h-[100vh] lg:block">
        <AdminLeftNavigation />
      </div>

      <div className="flex w-full flex-col lg:ml-[250px] bg-backgroundGray">
        <div
          className="sticky top-0 flex w-full 
                        justify-between border-b-[1px] border-b-bordergray bg-white py-5 pl-8 pr-4 font-bold lg:px-8"
        >
          <div
            className={`flex items-center ${
              withBackNavigation ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (
                withBackNavigation &&
                typeof backNavigationCallback === "function"
              ) {
                return backNavigationCallback();
              }
              if (withBackNavigation) navigate(-1);
            }}
          >
            {withBackNavigation && (
              <ImgArrowUturnLeftOutline className="mr-2 h-5 w-5" />
            )}
            {!withBackNavigation && (
              <ImgBars4Outline
                width={20}
                height={20}
                className="mr-2 hover:cursor-pointer lg:hidden"
                onClick={() => setIsMobileNavVisible(true)}
              />
            )}
            <p className="hidden sm:block">{title}</p>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-5">
            <div>
              <p className="text-xs font-light">Logged in as</p>
              <p>{adminName}</p>
            </div>
          </div>
        </div>
        <div className="min-h-[calc(100vh-72px)] w-full bg-backgroundgray p-8 lg:max-w-[calc(100vw-250px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminBaseLayout;
