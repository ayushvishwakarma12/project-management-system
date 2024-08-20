import { FormEvent, useState } from "react";
import signup from "../../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";

interface user {
  name: string;
  username: string;
  password: string;
  role: string;
  gender: string;
}

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const onClickSubmitFormButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};

    if (!name) errors.name = "Name is required";
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "password is required";
    if (password != confirmPassword)
      errors.confirmPassword = "Password do not match";
    if (!role) errors.role = "Role is required";
    if (!gender) errors.gender = "Gender is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const user: user = {
      name,
      username,
      password,
      role,
      gender,
    };

    const response = await fetch(
      "https://project-management-system-api-ocz8.onrender.com/api/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`${errorData.error}`);
    } else {
      navigate("/login");
    }
  };

  const inputClass = (field: string) =>
    fieldErrors[field]
      ? "w-full flex-shrink appearance-none border-2 border-red-500 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
      : "w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none";

  console.log(inputClass("name"));

  return (
    <div>
      <div className="flex w-screen flex-wrap text-slate-800">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-4 md:justify-start md:pl-12">
            <a href="#" className="text-2xl font-bold text-blue-600">
              Project Management
            </a>
          </div>
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-4xl">
              Create Your <span className="text-blue-600">Account</span>
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Already have an account?
              <Link to={"/login"} className=" hover:text-blue-600">
                {" "}
                Sign in
              </Link>
            </p>

            <form
              className="flex flex-col items-stretch pt-3 md:pt-2"
              onSubmit={onClickSubmitFormButton}
            >
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass("name")}
                    placeholder="Name"
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-red-500">{fieldErrors.name}</p>
                )}
              </div>
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClass("username")}
                    placeholder="username"
                  />
                </div>
                {fieldErrors.username && (
                  <p className="text-red-500">{fieldErrors.username}</p>
                )}
              </div>
              <div className="flex flex-col my-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={inputClass("gender")}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NON_BINARY">Non-Binary</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                {fieldErrors.gender && (
                  <p className="text-red-500">{fieldErrors.gender}</p>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass("password")}
                    placeholder="Password"
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-red-500">{fieldErrors.password}</p>
                )}
              </div>

              <div className="mb-4 flex flex-col">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass("confirmPassword")}
                    placeholder="confirm password"
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500">{fieldErrors.confirmPassword}</p>
                )}
              </div>
              <div className="flex flex-col mb-4">
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={inputClass("role")}
                    placeholder="role"
                  />
                </div>
                {fieldErrors.role && (
                  <p className="text-red-500">{fieldErrors.role}</p>
                )}
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
        <div className="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
          <div className="py-8 px-8 text-white xl:w-[40rem]">
            <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
              New Feature
            </span>
            <p className="my-6 text-3xl font-semibold leading-10">
              Track your project details also{" "}
              <span className="abg-white whitespace-nowrap py-2 text-cyan-300">
                Track your task at one place
              </span>
              .
            </p>
            <p className="mb-4">
              Create your account to streamline project planning and enhance
              team collaboration.Sign up now to access powerful tools for task
              management, reporting, and more!
            </p>
            <a
              href="#"
              className="font-semibold tracking-wide text-white underline underline-offset-4"
            >
              Learn More
            </a>
          </div>
          <div className="w-full flex items-center justify-center">
            <img
              className="mx-auto w-[40%] max-w-lg object-cover rounded-full"
              src={signup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
