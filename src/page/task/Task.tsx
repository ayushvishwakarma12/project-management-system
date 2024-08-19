import { useEffect, useState } from "react";
import CreateTask from "../../components/createTask/CreateTask";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TaskCard from "../../components/taskCard/TaskCard";
import { useCookies } from "react-cookie";
import { user } from "../project/Project";

export interface taskData {
  id: string;
  assignTo: string;
  priority: string;
  status: string;
  title: string;
  description: string;
}

const Task = () => {
  const [tasks, setTasks] = useState<taskData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getTasks = async () => {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch task data");
    }
    const data = await response.json();
    setTasks(data.reverse());
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />

        <div className="bg-blue-100 w-full px-8">
          <div className="flex py-4 items-center justify-between ">
            <h1 className="text-xl font-semibold ">Tasks</h1>
            <CreateTask getTasks={getTasks} />
          </div>

          <div className="flex flex-col gap-5">
            {tasks.map((e) => (
              <TaskCard key={e.id} data={e} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
