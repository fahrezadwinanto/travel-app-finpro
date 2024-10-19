"use client";
import { getAllUsers } from "@/service/user.service";
import { useEffect, useState } from "react";

const useUserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);
        if (response && response.data) {
          setUserList(response.data);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return userList;
};

export default useUserList;
