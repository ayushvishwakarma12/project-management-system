import { FaHome, FaProjectDiagram, FaTasks } from "react-icons/fa";
import { GrDocumentPerformance } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";

const Sidebar = () => {
  const path = useLocation();
  const { pathname } = path;
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [, , removeCookie] = useCookies(["jwtToken"]);

  const onClickProfileButton = () => {
    removeCookie("jwtToken");
    // console.log(cookies);
  };

  return (
    <div className=" fixed w-[250px] md:relative  bg-blue-100 top-[5px] z-10">
      <div className="flex fixed">
        {/* Sidebar */}
        <div
          className={`h-screen min-w-[220px] max-w-[220px] p-4 right-shadow bg-white fixed ${
            sidebar
              ? "top-[88px] left-[0px] duration-500"
              : "top-[0px] md:top-[0px] md:left-0 left-4 duration-500"
          }  z-50 transition-transform duration-300 ease-in-out ${
            sidebar ? "-translate-x-6" : "-translate-x-full"
          } md:relative md:translate-x-0`}
        >
          <ul className="flex flex-col gap-4 pt-5 md:pt-0">
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
                  pathname === "/tasks"
                    ? "bg-blue-500 text-white rounded-lg"
                    : ""
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
                  pathname === "/users"
                    ? "bg-blue-500 text-white rounded-lg"
                    : ""
                } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
              >
                <span>
                  <GrDocumentPerformance />
                </span>
                <span>Users</span>
              </li>
            </Link>

            <button
              className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer"
              onClick={onClickProfileButton}
            >
              <BiLogOut className=" h-5 w-5" />
              <span>Log out</span>
            </button>
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
          className={`fixed top-[85px]  md:hidden z-50 pl-1 pt-2  rounded-full ${
            sidebar ? "left-[160px] duration-500" : " -left-1 duration-500"
          }`}
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
