import { getPromotions } from "@/service/activity.service";
import { useEffect, useState } from "react";

const usePromoData = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPromotions();
        setPromos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return promos;
};

export default usePromoData;
