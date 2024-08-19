import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
// import profile from "../../assets/profile.png";
import { useCookies } from "react-cookie";
// import { CiLogout } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);

  const onClickProfileButton = () => {
    removeCookie("jwtToken");
    // console.log(cookies);
  };

  return (
    <nav className="bg-white border-gray-200 shadow-[rgba(0,0,15,0.5)_0px_0px_4px_0px] relative z-20">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-0 pr-2">
        <Link to={"/"}>
          <div className="flex items-end">
            <img src={logo} className="w-[80px]" alt="Flowbite Logo" />
            <span className="whitespace-nowrap font-semibold text-[14px] pb-2">
              Project Management
            </span>
          </div>
        </Link>

        <button
          className="relative rounded-full w-12 h-12 flex items-center mx-2 pb-1 "
          onClick={onClickProfileButton}
        >
          {/* <img src={profile} /> */}
          <BiLogOut className=" h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
