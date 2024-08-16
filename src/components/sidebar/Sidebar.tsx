import { FaHome } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { BsFileBarGraph } from "react-icons/bs";
import { GrDocumentPerformance } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

const Sidebar = () => {
  const path = useLocation();
  const { pathname } = path;

  return (
    <div className="min-h-screen min-w-[220px] max-w-[220px] p-4 right-shadow">
      <ul className="flex flex-col gap-4">
        <Link to={"/"}>
          <li
            className={`${
              pathname == "/" ? "bg-blue-500 text-white rounded-lg" : ""
            } flex  p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
          >
            <span>
              <FaHome className="h-4 w-4" />
            </span>
            <span className=" ">Home</span>
          </li>
        </Link>
        <Link to={"/projects"}>
          <li
            className={`${
              pathname == "/projects" ? "bg-blue-500 text-white rounded-lg" : ""
            } flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer`}
          >
            <span>
              <FaProjectDiagram />
            </span>
            <span>Project</span>
          </li>
        </Link>
        <Link to={"/tasks"}>
          <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
            <span>
              <FaTasks />
            </span>
            <span>Tasks</span>
          </li>
        </Link>

        <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
          <span>
            <BsFileBarGraph />
          </span>
          <span>Work Logs</span>
        </li>
        <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
          <span>
            <GrDocumentPerformance />
          </span>
          <span>Performance</span>
        </li>
        <li className="flex p-2 px-4 items-center gap-2 font-semibold text-slate-500 text-md cursor-pointer">
          <span>
            <IoSettings />
          </span>
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
