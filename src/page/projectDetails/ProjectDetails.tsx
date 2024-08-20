import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useCookies } from "react-cookie";
import { projectData, user } from "../project/Project";
import { MdDelete } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdEditOff } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["jwtToken"]);
  const [projectName, setProjectName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("PLANNING");
  const [manager, setManager] = useState<string>("");
  const [teamMembers, setTeamMembers] = useState<user[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [model, setModel] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchProjectDetailsData = async () => {
        const response = await fetch(
          `http://localhost:8080/api/projects/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
            },
          }
        );
        const data: projectData = await response.json();

        setProjectName(data.projectName);
        setDescription(data.description);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setManager(data.manager.id);
        setTeamMembers(data.teamMembers);
        setSelectedUser(data.teamMembers[data.teamMembers.length - 1].id);
      };

      const fetchUserDetailsData = async () => {
        const responseUser = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          },
        });
        if (!responseUser.ok) {
          throw new Error("Failed to fetch project data");
        }
        const dataUser = await responseUser.json();
        setUsers(dataUser);
      };

      fetchProjectDetailsData();
      fetchUserDetailsData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(cookies.jwtToken.jwtToken);

  const transformedTeamMembers = teamMembers.map((member) => ({
    id: member.id,
  }));

  const handleRemoveMember = (id: string) => {
    setTeamMembers((prevMember) =>
      prevMember.filter((member) => member.id !== id)
    );
  };

  const onClickSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("loading...");
    const projectDetails = {
      projectName,
      description,
      startDate,
      endDate,
      status,
      manager,
      teamMembers: transformedTeamMembers,
    };
    // console.log(projectDetails);
    // console.log(id);
    const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectDetails),
      headers: {
        Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (!response.ok) {
      console.log("hey");
      toast.error("Something error...");
      throw new Error("Invalid inputs");
    }

    setTimeout(() => {
      toast.success("Project successfully updated...");
      toast.dismiss(toastId);
      navigate("/projects");
    }, 1000);
  };

  const onClickDeleteButton = async () => {
    const toastId = toast.loading("loading...");
    const response = await fetch(`http://localhost:8080/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
      },
    });
    console.log(response);

    if (response.ok) {
      setTimeout(() => {
        toast.success("Project successfully deleted...");
        toast.dismiss(toastId);
        navigate("/projects");
      }, 1000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-blue-100 w-full">
          <div className="flex items-center justify-end bg-white p-2">
            {edit ? (
              <button onClick={() => setEdit(!edit)}>
                <MdEditOff className="h-6 w-6" />
              </button>
            ) : (
              <button onClick={() => setEdit(!edit)}>
                <MdEdit className="h-6 w-6 " />
              </button>
            )}
            {
              <>
                <button
                  className=" mx-4"
                  type="button"
                  onClick={() => setModel(true)}
                >
                  <MdDelete className="h-6 w-6" />
                </button>
                {model && (
                  <div
                    tabIndex={-1}
                    className=" overflow-y-auto bg-black bg-opacity-50 flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                      <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                          <h3 className="text-xl font-semibold text-gray-900 text-center">
                            Delete Project
                          </h3>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-base leading-relaxed ">
                            Are you sure you want to delete this project
                          </p>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
                          <button
                            type="button"
                            onClick={onClickDeleteButton}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                          >
                            Delete Project
                          </button>
                          <button
                            onClick={() => setModel(false)}
                            type="button"
                            className="py-2.5 border-blue-700 px-5 ms-3 text-sm font-medium text-blue-700 focus:outline-none bg-white rounded-lg border-2 focus:z-10 focus:ring-4 focus:ring-gray-10"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            }
          </div>
          {users.length != 0 && (
            <form
              className="w-full mx-auto bg-white p-6 pt-0 rounded-lg shadow-md"
              onSubmit={onClickSubmitButton}
            >
              <fieldset disabled={!edit}>
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
                        {users.map((e) => (
                          <option value={e.id} key={e.id}>
                            {e.name}
                          </option>
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
                          <option value={e.id} key={e.id}>
                            {e.name}
                          </option>
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
                    type="submit"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Save changes
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
