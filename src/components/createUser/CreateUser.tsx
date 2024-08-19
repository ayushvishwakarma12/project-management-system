import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { taskData } from "../../page/task/Task";

const CreateUser = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [task, setTask] = useState<string>("");
  const [cookies] = useCookies(["jwtToken"]);

  //   useEffect(() => {
  //     const fetchTaskData = async () => {
  //       const response = await fetch("http://localhost:8080/api/tasks", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
  //         },
  //       });
  //       const data = await response.json();
  //       setTask(data);
  //       console.log(data);
  //     };
  //     fetchTaskData();
  //   }, []);

  const toggleModel = () => {
    setIsOpen(!isOpen);
  };

  const onClickSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      name,
      username,
      password,
      gender,
      role,
      task,
    };
    console.log(JSON.stringify(taskData));
    const response = await fetch("http://localhost:8080/api/signup", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    const data = await response.json();
    console.log("data", data);
  };

  return (
    <div>
      <button
        onClick={toggleModel}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Create User
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
                    Create User
                  </h3>
                  <button
                    type="button"
                    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={toggleModel}
                  >
                    x
                  </button>
                </div>
                <div className="p-4 overflow-y-auto h-[500px]">
                  <form
                    className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
                    onSubmit={onClickSubmitButton}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="projectName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        gender
                      </label>
                      <select
                        id="status"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="NON_BINARY">Non Binary</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        role
                      </label>
                      <input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
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

export default CreateUser;
