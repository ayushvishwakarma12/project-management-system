import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { user } from "../../page/project/Project";
import toast from "react-hot-toast";
import { FaDeleteLeft } from "react-icons/fa6";

interface CreateProjectInterface {
  fetchProjectData: () => Promise<void>;
}

const CreateProject: React.FC<CreateProjectInterface> = ({
  fetchProjectData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("PLANNING");
  const [manager, setManager] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<user[]>([]);
  //const [tasks, setTasks] = useState<taskData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);
  const [users, setUsers] = useState<user[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const toggleModel = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prevMember) =>
      prevMember.filter((member) => member.id !== id)
    );
    setSelectedUser("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://project-management-system-api-ocz8.onrender.com/api/users",
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
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const transformedTeamMembers = teamMembers.map((member) => ({
    id: member.id,
  }));

  const onClickSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("loading...");
    const projectData = {
      projectName,
      description,
      startDate,
      endDate,
      status,
      manager,
      teamMembers: transformedTeamMembers,
    };

    const response = await fetch(
      "https://project-management-system-api-ocz8.onrender.com/api/projects",
      {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      toast.error("Something error...");
      toast.dismiss(toastId);
      throw new Error("Invalid inputs");
    }
    setTimeout(() => {
      setIsOpen(false);
      setDescription("");
      setEndDate("");
      setStartDate("");
      setManager("");
      setProjectName("");
      setStatus("");
      setTeamMembers([]);
      toast.success("Project Successfully Added...");
      toast.dismiss(toastId);
      fetchProjectData();
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={toggleModel}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Create Project
      </button>
      {isOpen && (
        <div
          id="hs-basic-modal"
          className="fixed inset-0 z-[80] opacity-100 transition-opacity overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          tabIndex={-1}
          aria-labelledby="hs-basic-modal-label"
        >
          <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
              <div className="flex justify-between items-center py-3 px-4 border-b">
                <h3
                  id="hs-basic-modal-label"
                  className="font-bold text-gray-800"
                >
                  Create Project
                </h3>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={toggleModel}
                >
                  x
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[600px]">
                <form
                  className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
                  onSubmit={onClickSubmitButton}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="endDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="PLANNING">Planning</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  {users.length > 1 && (
                    <>
                      <div className="mb-4">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Manager
                        </label>
                        <select
                          id="manager"
                          value={manager}
                          onChange={(e) => setManager(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        >
                          <option value={""} disabled>
                            Please select manager
                          </option>
                          {users.map((e) => (
                            <option value={e.id}>{e.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="team-member"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Team Members
                        </label>
                        <select
                          id="team-member"
                          value={selectedUser}
                          onChange={(e) => {
                            setSelectedUser(e.target.value);
                            const selectedTeamMember = users.find(
                              (user) => user.id === e.target.value
                            );
                            if (
                              selectedTeamMember &&
                              !teamMembers.includes(selectedTeamMember)
                            ) {
                              setTeamMembers((prevTeamMembers) => [
                                ...prevTeamMembers,
                                selectedTeamMember,
                              ]);
                            }
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        >
                          <option value="" disabled>
                            Select team members
                          </option>
                          {users.map((e) => (
                            <option value={e.id}>{e.name}</option>
                          ))}
                        </select>

                        {teamMembers.length > 0 ? (
                          <div className="flex flex-wrap gap-2 my-2">
                            {teamMembers.map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center text-smtext-gray-700 bg-cyan-600 text-white rounded-md px-4 text-sm py-1"
                              >
                                <span>{member.name}</span>
                                <button
                                  className="pt-1 pl-2"
                                  onClick={() => handleRemoveMember(member.id)}
                                >
                                  <FaDeleteLeft />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 pl-2 py-2">
                            No team members selected
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={toggleModel}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProject;
