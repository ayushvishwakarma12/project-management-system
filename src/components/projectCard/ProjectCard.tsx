import React from "react";
import { projectData } from "../../page/project/Project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  data: projectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <Link to={`/projects/${data.id}`}>
      <div className="relative flex min-w-[24rem] min-h-[300px] max-h-[300px] max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between border-b-[1px] border-black pb-2">
            <h4 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {data.projectName}
            </h4>
            <span className=" bg-green-200 text-green-800 px-6 rounded-md py-1 font-semibold text-sm">
              {data.status}
            </span>
          </div>
          <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
            {data.description}
          </p>
        </div>
        <div>
          <p className=" text-red-500 font-semibold px-6">
            Deadline : {data.endDate}
          </p>
        </div>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center -space-x-3">
            <img
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
              className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
            />
            <img
              alt="Tania Andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
              className="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
            />
          </div>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
            {data.startDate}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
