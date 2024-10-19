import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

export const getActivities = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/activities");
    return response.data;
  } catch (error) {
    toast.error("Get Activity Failed", error);
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/activity/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPromotions = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/promos");
    return response.data;
  } catch (error) {
    toast.error("Get Promotion Failed", error);
  }
};
