import { getBanner } from "@/service/banner.service";
import { useEffect, useState } from "react";

const useBannersData = () => {
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBanner();
        setBannersData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return bannersData;
};

export default useBannersData;
