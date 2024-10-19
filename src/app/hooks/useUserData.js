import { getLoggedInUser } from "@/service/user.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useUserData = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLoggedInUser();
      if (!response) {
        toast.info("Please login first...");
        return;
      }
      setLoggedInUser(response.data);
    };

    fetchData();
  }, []);

  return loggedInUser;
};

export default useUserData;
