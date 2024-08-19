import React from "react";
import { projectData } from "../../page/project/Project";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ProjectCardProps {
  data: projectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <Link to={`/projects/${data.id}`}>
      <div className="relative flex md:min-w-[350px] min-h-[280px] max-h-[280px] max-w-[350px] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between  border-b-[1px] border-black pb-4">
            <h4 className="block font-sans text-md antialiased w-[120px] md:w-full font-semibold leading-snug tracking-normal text-blue-gray-900 truncate">
              {data.projectName}
            </h4>
            <span
              className={`px-4 md:px-6 rounded-md py-1 font-semibold text-sm ${
                data.status === "IN_PROGRESS"
                  ? "bg-blue-500 text-white"
                  : data.status === "COMPLETED"
                  ? "bg-green-500 text-white "
                  : " bg-yellow-500 text-white"
              } `}
            >
              {data.status}
            </span>
          </div>
          <p className="block mt-3 font-sans text-md antialiased text-ellipsis max-h-14 overflow-hidden font-normal leading-relaxed text-gray-700">
            {data.description}
          </p>
        </div>
        <div className="mt-auto">
          <p className=" text-red-500 font-semibold px-6 text-sm">
            Deadline : {format(new Date(data.endDate), "dd-MMMM-yyyy")}
          </p>
        </div>
        <div className="flex items-center justify-between p-6 mt-auto">
          <div className="flex items-center -space-x-3">
            {data.teamMembers.map((e) => {
              if (e.gender === "FEMALE") {
                return (
                  <img
                    alt="natali craig"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                    className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
                  />
                );
              } else {
                return (
                  <img
                    alt="Tania Andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
                  />
                );
              }
            })}
          </div>
          <p className="block font-sans text-sm font-semibold antialiased  leading-relaxed text-inherit">
            {format(new Date(data.startDate), "dd-MMMM-yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
