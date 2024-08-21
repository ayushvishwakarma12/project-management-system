import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useCookies } from "react-cookie";
import { projectData } from "../project/Project";
import { PieChart } from "@mui/x-charts/PieChart";
import { Link, useNavigate } from "react-router-dom";
import UsersList from "../../components/usersList/UsersList";
import { taskData } from "../task/Task";
import Loader from "../../components/loader/Loader";

const Home = () => {
  // State to store fetched projects
  const [projects, setProjects] = useState<projectData[]>([]);
  const [tasks, setTasks] = useState<taskData[]>([]);
  const [projectLoading, setProjectLoading] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["jwtToken"]);
  const navigate = useNavigate();

  const data = [
    {
      id: 0,
      value: tasks.filter((task) => task.status === "TO_DO").length,
      label: "To Do",
    },
    {
      id: 1,
      value: tasks.filter((task) => task.status === "IN_PROGRESS").length,
      label: "In Progress",
    },
    {
      id: 2,
      value: tasks.filter((task) => task.status === "COMPLETED").length,
      label: "Completed",
    },
  ];

  useEffect(() => {
    // Function to fetch project data from API
    const fetchProjectData = async () => {
      try {
        setProjectLoading(true);
        const response = await fetch(
          "https://project-management-system-api-ocz8.onrender.com/api/projects",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data: projectData[] = await response.json();
        setProjectLoading(false);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjectData();
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      setTaskLoading(true);
      const response = await fetch(
        "https://project-management-system-api-ocz8.onrender.com/api/tasks",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project data");
      }
      const data: taskData[] = await response.json();
      setTaskLoading(false);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (cookies.jwtToken.jwtToken === undefined) {
    navigate("/login");
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-blue-100 w-full px-6 py-4 min-h-screen">
          <h1 className="py-2 font-semibold text-md md:text-xl">Dashboard</h1>
          <div className="flex md:flex-row flex-col w-full gap-5">
            <div className="md:w-1/2 w-full bg-white md:h-[400px] rounded-lg shadow-2xl p-2">
              <h1 className="font-semibold my-2 px-1 md:px-4 text-sm md:text-lg">
                Project
              </h1>
              {projectLoading ? (
                <div className="flex items-center justify-center h-[80%]">
                  <Loader />
                </div>
              ) : (
                <div className=" grid grid-cols-2 gap-2">
                  {projects.slice(0, 4).map((e) => (
                    <Link
                      key={e.id}
                      to={`/projects/${e.id}`}
                      className="mx-auto "
                    >
                      <div className="rounded-xl scale-100 hover:scale-105 ease-in-out duration-500 cursor-pointer bg-white p-2 text-center shadow-xl  md:w-[250px] md:h-[150px] overflowhidden border-slate-300 border">
                        <div className="mx-auto flex h-[20px] md:h-[40px] w-[20px] md:w-[40px] p-1 -translate-y-4 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
                          <svg
                            viewBox="0 0 55 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                          >
                            <path
                              d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
                              fill="white"
                            ></path>
                          </svg>
                        </div>
                        <h1 className="text-darken text-sm font-medium lg:h-8 lg:px-4 truncate w-[100px] md:w-full">
                          {e.projectName}
                        </h1>
                        <p className="px-4 text-gray-500 text-[12px] md:whitespace-normal  truncate w-[100px] md:w-full">
                          {e.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/*Tasks PieChart section */}
            <div className="bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center w-full max-w-4xl mx-auto p-4 md:w-1/2">
              <h1 className="self-start text-lg pt-2 px-4 font-semibold">
                Tasks
              </h1>
              {taskLoading ? (
                <Loader />
              ) : (
                tasks.length > 0 && (
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `${item.value}%`,

                        data,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={280}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <UsersList limit={5} heading="Users" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
