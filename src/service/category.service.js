import { axiosInstance } from "@/lib/axios";
import Cookies from "js-cookie";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/categories");
    return response.data;
  } catch (error) {
    toast.error("Get Category Failed", error);
  }
};

export const updateCategoryById = async (updatedCategory, id) => {
  console.log(updatedCategory);
  try {
    const response = await axiosInstance.post(
      `/api/v1/update-category/${id}`,
      updatedCategory,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post("/api/v1/create-category", category, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/delete-category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
