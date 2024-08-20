import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UsersList from "../../components/usersList/UsersList";

const Users = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-blue-100 w-full px-8 h-screen">
          <UsersList />
        </div>
      </div>
    </>
  );
};

export default Users;
