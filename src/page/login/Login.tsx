import { FormEvent, useState } from "react";
import login from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [cookies, setCookie] = useCookies(["jwtToken"]);
  const navigate = useNavigate();

  const onClickSubmitButton = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!username) {
      setErrorMsg("Please Enter username");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter password");
      return;
    }
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      setIsError(true);
      setErrorMsg(data.error);
    } else {
      const data = await response.json();
      setCookie("jwtToken", data);
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" shadow-2xl p-12 flex border-2items-center border">
        <div className="">
          <img src={login} className="w-[400px]" />
        </div>
        <div>
          <h1 className=" text-2xl font-bold text-center">Welcom back</h1>
          <p className="text-center text-sm">
            Please enter your details to sign in
          </p>
          <div className="flex flex-col items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow">
              <div className="p-6 space-y-4 md:space-y-6">
                <form
                  className=" flex-grow w-[350px]"
                  onSubmit={onClickSubmitButton}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-slate-600"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div className="my-5">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-slate-600 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    />
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                     <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a> 
                  </div> */}
                  <button
                    type="submit"
                    className="w-full mt-5 mb-2 bg-cyan-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  {isError && (
                    <p className="text-red-500 text-sm my-2">{errorMsg}</p>
                  )}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      to={"/signup"}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
