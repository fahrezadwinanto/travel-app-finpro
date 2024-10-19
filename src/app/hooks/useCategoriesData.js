import { getCategories } from "@/service/category.service";
import { useEffect, useState } from "react";

const useCategoriesData = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return categories;
};

export default useCategoriesData;
