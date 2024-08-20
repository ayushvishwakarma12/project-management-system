import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
// import profile from "../../assets/profile.png";
import { useCookies } from "react-cookie";
// import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const [cookies] = useCookies(["user"]);

  return (
    <div className=" relative h-[80px] z-50">
      <nav
        className="bg-white border-gray-200 shadow-[rgba(0,0,15,0.5)_0px_0px_4px_0px]  z-20 fixed top-0 w-full px-4
    "
      >
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-0 pr-2">
          <Link to={"/"}>
            <div className="flex items-end">
              <img
                src={logo}
                className="w-[80px] relative -left-2"
                alt="Flowbite Logo"
              />
              <span className="whitespace-nowrap font-semibold text-[14px] pb-2 relative -left-2">
                Project Management
              </span>
            </div>
          </Link>

          <div className="text-sm pl-2 my-2 border-l-4  font-sans font-bold border-blue-500 hover:tracking-widest duration-500 ease-in-out ">
            Welcome!{" "}
            <span className="font-semibold text-md">{cookies.user}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
