import { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard/ProjectCard";
import CreateProject from "../../components/createProject/CreateProject";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useCookies } from "react-cookie";
import Loader from "../../components/loader/Loader";

export interface user {
  id: string;
  name: string;
  username: string;
  role: string;
  gender: string;
}

export interface projectData {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  projectName: string;
  status: string;
  teamMembers: user[];
  manager: user;
}

const Project = () => {
  const [projects, setProjects] = useState<projectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["jwtToken"]);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
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
      const data = await response.json();
      setLoading(false);
      setProjects(data.reverse());
    } catch (error) {
      throw new Error("error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        {}
        <div className="bg-blue-100 w-full px-8">
          {loading ? (
            <div className=" h-screen flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="flex py-4 items-center justify-between ">
                <h1 className="text-md md:text-xl font-semibold">Projects</h1>
                <CreateProject fetchProjectData={fetchProjectData} />
              </div>

              <div className="flex flex-wrap gap-4">
                {projects.map((e: projectData) => (
                  <ProjectCard key={e.id} data={e} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
