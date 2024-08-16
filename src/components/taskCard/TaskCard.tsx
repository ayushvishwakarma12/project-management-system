import { HiOutlineLightBulb } from "react-icons/hi";
import taskUserProfile from "../../assets/taskUserProfile.png";
import { taskData } from "../../page/task/Task";

interface taskCardProps {
  data: taskData;
}

const TaskCard: React.FC<taskCardProps> = ({ data }) => {
  console.log(data);
  return (
    <div className="shadow-md rounded-xl flex items-center justify-between bg-white px-4 py-5">
      <div className="flex items-center gap-5">
        <HiOutlineLightBulb className="h-5 w-5" />
        <div className="">
          <h1 className="font-semibold">{data.title}</h1>
          <span className="flex items-center gap-5">
            <p>{data.description}</p>
            <p>{data.assignTo.name}</p>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <p className="bg-red-200 text-red-600 px-5 rounded-full py-2 text-sm font-semibold">
          {data.priority}
        </p>
        <p className=" bg-green-200 text-green-600 px-5 rounded-full py-2 text-sm font-semibold">
          {data.status}
        </p>
      </div>
      <div className="relative w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full  border-2 shadow-2xl border-blue-500">
        <img src={taskUserProfile} className=" object-contain h-5 w-5" />
      </div>
    </div>
  );
};

export default TaskCard;
