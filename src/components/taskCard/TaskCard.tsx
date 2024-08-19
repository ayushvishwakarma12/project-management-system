import { HiOutlineLightBulb } from "react-icons/hi";
import taskUserProfile from "../../assets/taskUserProfile.png";
import { taskData } from "../../page/task/Task";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userData } from "../users/Users";

interface taskCardProps {
  data: taskData;
}

const TaskCard: React.FC<taskCardProps> = ({ data }) => {
  const [assignTo, setAssignTo] = useState<string>("");
  const [cookies] = useCookies(["jwtToken"]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/users/${data.assignTo}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          },
        }
      );
      const responseData: userData = await response.json();
      setAssignTo(responseData.name);
    };
    fetchUserData();
  }, []);
  return (
    <Link to={`/tasks/${data.id}`}>
      <div className="shadow-md rounded-xl grid grid-cols-4 w-full justify-betwee items-center bg-white px-4 py-5">
        <div className="flex items-center gap-5">
          <HiOutlineLightBulb className="h-5 w-5" />
          <div className="w-full">
            <h1 className="font-semibold">{data.title}</h1>
            <span className="flex items-center gap-5 w-full justify-between">
              <p className="max-w-[300px] text-sm">{data.description}</p>
            </span>
          </div>
        </div>
        <p className=" whitespace-nowrap mb-2 font-semibold mx-auto">
          {assignTo}
        </p>
        <div className="flex items-center gap-5 ml-auto">
          <p className="bg-red-200 w-28 text-center text-red-600 px-5 rounded-full py-2 text-sm font-semibold ">
            {data.priority}
          </p>
          <p className=" bg-green-200 w-32 text-center text-green-600 px-5 rounded-full py-2 text-sm font-semibold">
            {data.status}
          </p>
        </div>
        <div className="ml-auto relative w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full  border-2 shadow-2xl border-blue-500">
          <img src={taskUserProfile} className=" object-contain h-5 w-5" />
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
