import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface userData {
  id: string;
  name: string;
  password: string;
  role: string;
  username: string;
  gender: string;
}

const Users = ({ limit = 50, heading = "Users" }) => {
  const [data, setData] = useState<userData[]>([]);
  const [cookies] = useCookies(["jwtToken"]);
  useEffect(() => {
    async function getUserData() {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.jwtToken.jwtToken}`,
        },
      });
      const data = await response.json();
      setData(data);
    }
    getUserData();
    //getUserData();
  }, []);

  return (
    <div className="w-full mt-4">
      <h1 className=" font-semibold text-lg md:text-xl border-b border-solid  pb-3">
        {heading}
      </h1>
      {data ? (
        <div className="w-full bg-white rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="w-full text-left">
                <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  Name
                </th>
                <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  username
                </th>
                <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  Gender
                </th>
                <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  role
                </th>
                {/* <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  Birth Date
                </th>
                <th className="border sm:p-1 text-[12px] md:text-base md:p-3">
                  Gender
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, limit).map((eachData, i) => {
                return (
                  <tr key={i} className="">
                    <td
                      key={eachData.name}
                      className="border-b lg:p-3 text-[12px] md:text-base  p-1"
                    >
                      {eachData.name}
                    </td>
                    <td
                      key={eachData.username}
                      className="border-b lg:p-3 text-[12px] md:text-base p-1"
                    >
                      {eachData.username}
                    </td>
                    <td
                      key={eachData.gender}
                      className="border-b lg:p-3 text-[12px] md:text-base p-1"
                    >
                      {eachData.gender}
                    </td>
                    <td
                      key={eachData.role}
                      className="border-b lg:p-3 text-[12px] md:text-base p-1"
                    >
                      {eachData.role}
                    </td>
                    {/* <td
                      key={eachData.birthDate}
                      className="border-b lg:p-3 text-[12px] md:text-base p-1"
                    >
                      {eachData.birthDate}
                    </td>
                    <td
                      key={eachData.gender}
                      className="border-b lg:p-3 text-[12px] md:text-base p-1"
                    >
                      {eachData.gender}
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Users;
