import { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { userData } from "../../components/users/Users";
import { taskData } from "../task/Task";
import { MdDelete, MdEditOff } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TO_DO");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignTo, setAssignTo] = useState("");
  const [users, setUsers] = useState<userData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [model, setModel] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
        },
      });

      const data = await response.json();
      setUsers(data);
      console.log(data);
    };

    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      const data: taskData = await response.json();
      settitle(data.title);
      setAssignTo(data.assignTo);
      setDescription(data.description);
      setPriority(data.priority);
      setSelectedUser(data.assignTo);
    };
    fetchTaskData();
    fetchUserData();
  }, []);

  const onClickSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("loading...");
    const taskData = {
      title,
      description,
      status,
      priority,
      assignTo,
    };
    console.log(JSON.stringify(taskData));
    const response = await fetch(
      `https://project-management-system-api-ocz8.onrender.com/api/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );
    // console.log(response);

    if (response.ok) {
      setTimeout(() => {
        toast.success("Task updated successfully...");
        navigate("/tasks");
        toast.dismiss(toastId);
      }, 1000);
    }
  };
  console.log(id);

  const onClickDeleteButton = async () => {
    const toastId = toast.loading("loading...");
    const response = await fetch(
      `https://project-management-system-api-ocz8.onrender.com/api/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
        },
      }
    );
    console.log(response);

    if (response.ok) {
      setTimeout(() => {
        toast.success("Task deleted successfully...");

        toast.dismiss(toastId);
        navigate("/tasks");
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
          </div>
          <div className="w-full">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto w-full">
              <div className="p-4 h-screen ">
                <form
                  className=" bg-white h-full "
                  onSubmit={onClickSubmitButton}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      value={title}
                      onChange={(e) => settitle(e.target.value)}
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
                      <option value="TO_DO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="assignTo"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      assign to
                    </label>
                    <select
                      id="assignTo"
                      value={selectedUser}
                      onChange={(e) => {
                        setSelectedUser(e.target.value);
                        setAssignTo(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option key="" value="" disabled>
                        Select the user
                      </option>
                      {users.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
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
      </div>
    </>
  );
};

export default TaskDetails;
