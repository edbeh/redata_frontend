import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getNavigationItems } from "./LeftNavigation.util";

const LeftNavigation = () => {
  const navigate = useNavigate();
  const navItems = getNavigationItems();
  const [currentPathName, setCurrentPathName] = useState<string>("");

  useEffect(() => {
    const route = window.location.pathname;
    setCurrentPathName(route);
  }, []);

  return (
    <div className="fixed top-[50px] py-6 px-4 bg-white shadow-lg w-[190px] flex flex-col items-center rounded-xl h-fit z-50">
      <h1 className="text-xl font-bold">ReData</h1>

      <ul className="mt-6">
        {navItems.map((item) => {
          return (
            <li
              className={`flex items-center w-full mb-4 space-x-2 cursor-pointer hover:text-primary-400
                          ${
                            currentPathName.includes(item.route)
                              ? "text-primary-400 font-semibold"
                              : ""
                          }`}
              key={item.key}
              onClick={() => navigate(item.route)}
            >
              <item.Icon className={`w-5 h-5 stroke-2`} /> <p>{item.label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftNavigation;
