import { adminLeftNavigationItems } from "./AdminLeftNavigation.util";
import AdminLeftNavigationItem from "./AdminLeftNavigationItem/AdminLeftNavigationItem";
import { getAppVersion } from "utils";

const LeftNavigation = () => {
  console.log("adminLeftNavigationItems", adminLeftNavigationItems);
  return (
    <div className="flex h-full max-h-[100vh] w-[250px] flex-col justify-between px-[18px] py-5 text-white bg-adminBlue">
      <div>
        <div className="mt-8 flex flex-col space-y-2">
          {adminLeftNavigationItems.map((item) => {
            return <AdminLeftNavigationItem item={item} key={item.name} />;
          })}
        </div>
      </div>

      {process.env.REACT_APP_VERSION && (
        <p className="items-end pl-[10px] text-xs opacity-20">
          {`Version ${getAppVersion()}`}
        </p>
      )}
    </div>
  );
};

export default LeftNavigation;
