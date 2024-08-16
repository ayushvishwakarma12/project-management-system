import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useCookies } from "react-cookie";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { projectData } from "../project/Project";

const Home = () => {
  const [projects, setProjects] = useState<projectData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await response.json();
        setProjects(data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjectData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-blue-100 w-full px-6 py-4">
          <h1 className="py-2 font-semibold text-xl">Dashboard</h1>
          <div className="flex w-full gap-5">
            <div className=" w-[500px] bg-white h-[500px] rounded-lg shadow-2xl p-2">
              <h1 className="font-semibold my-2 px-4">Project</h1>
              <div className="flex flex-wrap gap-5">
                {projects.map((e) => (
                  <div className="mx-auto rounded-xl bg-white p-2 text-center shadow-xl w-[200px] border-slate-300 border">
                    <div className="mx-auto flex h-[40px] w-[40px] -translate-y-4 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40">
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
                    <h1 className="text-darken mb-3 pt-3 text-md font-medium lg:h-14 lg:px-4">
                      {e.projectName}
                    </h1>
                    <p className="px-4 text-gray-500 text-sm">
                      {e.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grow-[2] bg-white h-[400px] rounded-lg shadow-2xl">
              card 1
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
