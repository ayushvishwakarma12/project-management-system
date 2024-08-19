import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UsersList from "../../components/usersList/UsersList";

const Users = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-blue-100 w-full px-8">
          <UsersList />
        </div>
      </div>
    </>
  );
};

export default Users;
