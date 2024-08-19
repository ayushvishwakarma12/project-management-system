import { FaHome, FaProjectDiagram, FaTasks } from "react-icons/fa";
import { BsFileBarGraph } from "react-icons/bs";
import { GrDocumentPerformance } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const path = useLocation();
  const { pathname } = path;
  const [sidebar, setSidebar] = useState<boolean>(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`min-h-screen min-w-[220px] max-w-[220px] p-4 right-shadow bg-white fixed ${
          sidebar ? "top-[88px] left-[0px]" : " md:top-[1px] md:left-0 left-5"
        }  z-50 transition-transform duration-300 ease-in-out ${
          sidebar ? "-translate-x-6" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <ul className="flex flex-col gap-4">
          <Link to={"/"}>
            <li
              className={`${
                pathname === "/" ? "bg-blue-500 text-white rounded-lg" : ""
              } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
            >
              <span>
                <FaHome className="h-4 w-4" />
              </span>
              <span>Home</span>
            </li>
          </Link>
          <Link to={"/projects"}>
            <li
              className={`${
                pathname === "/projects"
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
            >
              <span>
                <FaProjectDiagram />
              </span>
              <span>Project</span>
            </li>
          </Link>
          <Link to={"/tasks"}>
            <li
              className={`${
                pathname === "/tasks" ? "bg-blue-500 text-white rounded-lg" : ""
              } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
            >
              <span>
                <FaTasks />
              </span>
              <span>Tasks</span>
            </li>
          </Link>

          {/* <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
            <span>
              <BsFileBarGraph />
            </span>
            <span>Work Logs</span>
          </li> */}
          <Link to={"/users"}>
            <li
              className={`${
                pathname === "/users" ? "bg-blue-500 text-white rounded-lg" : ""
              } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
            >
              <span>
                <GrDocumentPerformance />
              </span>
              <span>Users</span>
            </li>
          </Link>
          {/* <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
            <span>
              <IoSettings />
            </span>
            <span>Settings</span>
          </li> */}
        </ul>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-[80px]  left-0 md:hidden z-50 pl-1 pt-2  rounded-full"
        onClick={() => setSidebar(!sidebar)}
      >
        {sidebar ? <IoClose /> : <GiHamburgerMenu />}
      </button>
    </div>
  );
};

export default Sidebar;
