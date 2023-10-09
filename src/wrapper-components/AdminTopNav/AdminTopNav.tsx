import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import { ImgTriangleDown } from "assets";
import {
  getAdminDeptLocalStorage,
  getAdminNameLocalStorage,
  setAdminDeptLocalStorage,
} from "utils";
import { useFetchMe } from "api/hooks";
import { PostAdminSession } from "api/models";

const AdminTopNav = () => {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState<string>("");
  const [adminDept, setAdminDept] =
    useState<PostAdminSession.Institution | null>(null);
  const [departments, setDepartments] = useState<
    PostAdminSession.Institution[]
  >([]);

  // *Queries
  const fetchMe = useFetchMe(true);

  // *Methods
  const handleChangeDept = (dept: PostAdminSession.Institution) => {
    setAdminDept(dept);
    setAdminDeptLocalStorage(dept);
    if (window.location.href.includes("/users")) {
      navigate("/users");
    }
    if (window.location.href.includes("/admins")) {
      navigate("/admins");
    }
    // window.location.reload();
  };

  // *Effects
  useEffect(() => {
    const adminName = getAdminNameLocalStorage();
    setAdminName(adminName || "");

    const adminDept = getAdminDeptLocalStorage();
    setAdminDept(adminDept);
  }, []);

  useEffect(() => {
    if (fetchMe?.data?.data?.data?.departments) {
      const departments = fetchMe.data.data.data.departments.map((dept) => {
        return dept;
      });
      setDepartments(departments);
    }
  }, [fetchMe.data]);

  // *JSX
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex flex-col items-end outline-none">
            <p>{adminName}</p>
            <div className="flex items-center space-x-2 justify-end">
              <p className="text-xs font-normal">{adminDept?.name}</p>
              <motion.div animate={open ? { rotate: 180 } : { rotate: 0 }}>
                <ImgTriangleDown className="h-4 w-4" />
              </motion.div>
            </div>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="absolute right-0 z-50 mt-3 p-4 bg-white shadow-lg rounded-xl focus:outline-none border-[1px] border-gray-200 w-[200px]"
            >
              <div>
                {departments?.map((dept) => {
                  if (dept.id === adminDept?.id) {
                    return (
                      <div
                        className="p-2 cursor-not-allowed text-sm font-light w-full text-disabled"
                        key={dept.name}
                      >
                        {dept.name}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="p-2 cursor-pointer font-light text-sm w-full hover:bg-slate-50 rounded-lg"
                        onClick={() => handleChangeDept(dept)}
                        key={dept.name}
                      >
                        {dept.name}
                      </div>
                    );
                  }
                })}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default AdminTopNav;
