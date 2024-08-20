import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { userData } from "../users/Users";
import toast from "react-hot-toast";

interface CreateTaskProps {
  getTasks: () => Promise<void>;
}

const CreateTask: React.FC<CreateTaskProps> = ({ getTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TO_DO");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignTo, setAssignTo] = useState("");
  const [users, setUsers] = useState<userData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        "https://project-management-system-api-ocz8.onrender.com/api/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
    };
    fetchUserData();
  }, []);

  const toggleModel = () => {
    setIsOpen(!isOpen);
  };

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
      "https://project-management-system-api-ocz8.onrender.com/api/tasks",
      {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response);

    if (response.ok) {
      setTimeout(() => {
        getTasks();
        toast.dismiss(toastId);
        toast.success("Task successfully added...");
        setAssignTo("");
        setDescription("");
        setPriority("");
        setSelectedUser("");
        settitle("");
        setIsOpen(false);
      }, 1000);
    } else {
      toast.dismiss(toastId);
      toast.error("error...");
    }
  };

  return (
    <div>
      <button
        onClick={toggleModel}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Create Task
      </button>
      {isOpen && (
        <>
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
                    Create Task
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
        </>
      )}
    </div>
  );
};

export default CreateTask;
