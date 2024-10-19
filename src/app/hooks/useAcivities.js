import { getActivities } from "@/service/activity.service";
import { useEffect, useState } from "react";

const useActivitiyData = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActivities();
        setActivities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return activities;
};

export default useActivitiyData;
