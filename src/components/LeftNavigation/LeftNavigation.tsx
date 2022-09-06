import { getNavigationItems } from "./LeftNavigation.util";

const LeftNavigation = () => {
  const navItems = getNavigationItems();

  return (
    <div className="fixed top-[50px] py-6 px-4 bg-white shadow-lg w-[190px] flex flex-col items-center rounded-xl h-fit z-50">
      <h1 className="text-xl font-bold">ReData</h1>

      <ul className="mt-6">
        {navItems.map((item) => {
          return (
            <li
              className="flex items-center w-full mb-4 space-x-2 cursor-pointer hover:text-cyan-500"
              key={item.key}
            >
              <item.Icon className="w-5 h-5" /> <p className="">{item.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftNavigation;
