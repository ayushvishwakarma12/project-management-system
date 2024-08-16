import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./page/login/Login";
import SignUp from "./page/signup/SignUp";
import Home from "./page/home/Home";
import Project from "./page/project/Project";
import Task from "./page/task/Task";
import { useCookies } from "react-cookie";
import ProjectDetails from "./page/projectDetails/ProjectDetails";

function App() {
  const [cookies] = useCookies(["jwtToken"]);
  const jwtToken = cookies.jwtToken;
  const isAuthenticated = jwtToken ? true : false;
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
