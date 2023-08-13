import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IAdminLeftNavigationItem } from "../AdminLeftNavigation.model";

interface AdminLeftNavigationItemProps {
  item: IAdminLeftNavigationItem;
}

const AdminLeftNavigationItem = ({ item }: AdminLeftNavigationItemProps) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const location = window.location.pathname;
    if (location.includes(item.path)) setIsActive(true);
  }, [item]);

  return (
    <div
      className={`flex items-center rounded-md py-3 px-3 hover:cursor-pointer hover:bg-navblue
                    ${isActive ? "bg-primary-400" : ""}`}
      onClick={() => navigate(item.path)}
    >
      <item.Icon className={`w-8 h-8 stroke-2`} />
      <p className={`ml-4 text-md ${isActive ? "font-medium" : ""}`}>
        {item.text}
      </p>
    </div>
  );
};

export default AdminLeftNavigationItem;
